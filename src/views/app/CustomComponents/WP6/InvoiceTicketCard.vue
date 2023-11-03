<template>
  <div class="p-1 ticket" :class="'ticket-'+deadlineColor">
    <b-card v-if="!isTicket" class="mb-1" body-class="body-padding" bg-variant="secondary" text-variant="white">
      <b-card-text class="d-flex align-items-center text-truncate justify-content-between">
        <p v-b-tooltip class="w-80 text-truncate mb-0" :title="ticket.ticket_name_group">
          {{ ticket.ticket_name_group }}
        </p>
        <icon icon="mdi:subtasks" width="16" />
      </b-card-text>
    </b-card>
    <div class="d-flex align-items-center mb-1">
      <b-avatar variant="light-warning" text="I"/>
      <h4 class="font-weight-bolder text-truncate mb-0 ml-1" style="color: #ccc; font-size: 15px"
          :title="ticket.ticket_name">
        {{ ticket.ticket_name }}</h4>
      <b-dropdown variant="link-" toggle-class="p-0" right no-caret class="ml-auto">
        <template v-slot:button-content>
          <feather-icon icon="MoreHorizontalIcon"/>
        </template>
        <b-dropdown-item @click="$emit('moredetails')">
          {{ $t('button~moredetails') }}
        </b-dropdown-item>
        <b-dropdown-item @click="$emit('assign')">
          {{ $t('button~assignto') }}
        </b-dropdown-item>
        <b-dropdown-item @click="toggleTicket(ticket)">
          {{ $t(ticket.ticket_closed ? 'button~ticket~reopen' : 'button~ticket~close') }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <p class="text-truncate" :title="ticket.ticket_description">
      {{ ticket.ticket_description }}
    </p>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.priority_name') | title }}:</strong>
      <span v-if="ticket.priority_name">{{ ticket.priority_name }}</span>
      <span v-else>{{ $t('not-defined') }}</span>
    </div>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.assigned_to') | title }}:</strong>
      <span class="text-truncate" :title="assignedUser">{{ assignedUser }}</span>
    </div>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_deadline') | title }}:</strong>
      <span :class="deadlineColor?('text-'+deadlineColor):''">{{ deadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (deadlineColor?('text-'+deadlineColor):'')"/>
    </div>
    <div v-if="false" class="d-flex ">
      <strong class="mr-1">{{ $t('attribute.ticket_deadline_offset') | title }}:</strong>
      <span :class="columnDeadlineColor?('text-'+columnDeadlineColor):''">{{ columnDeadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (columnDeadlineColor?('text-'+columnDeadlineColor):'')"/>
    </div>
    <div v-if="false" class="d-flex">
      <strong class="mr-1">{{ $t('ticket~deadline~status') | title }}:</strong>
      <span :class="deadlineColor?('text-'+deadlineColor):''">{{ deadlineStatus }}</span>
    </div>
    <div class="d-flex justify-content-between mt-2 align-items-center" >
      <template v-if="false">
        <b-avatar-group v-if="filteredUsers.length > 1" size="20px" variant="warning" overlap="0.2">
          <template v-for="user in filteredUsers.slice(0,4)">
            <b-avatar :key="user.user_id" :text="generateUserAvatar(user)" />
          </template>
          <b-avatar v-if="filteredUsers.length > 4">
            <feather-icon
              icon="PlusIcon"
              size="12"
            />
            {{ filteredUsers.length - 4 }}
          </b-avatar>
        </b-avatar-group>
        <b-avatar v-else variant="warning" size="20px" :text="generateUserAvatar(filteredUsers[0])" />
      </template>
      <b-link v-if="isTicket" v-b-toggle="`subticket-sidebar-${ticket.ticket_id}`" class="d-flex align-items-center mb-0" @click="fetchSubTickets">
        <icon icon="tdesign:task" width="16px" height="16px" />
        <span class="ml"> {{ ` ${ticket.ticket_subticket_closed_count}/${ticket.ticket_subticket_count}` }}</span>
      </b-link>
      <b-sidebar :id="`subticket-sidebar-${ticket.ticket_id}`" lazy width="55%" right no-header shadow backdrop @hidden="updateBoard">
        <template #default="{hide}" >
          <div class="px-1 py-2">
            <p class="text-right">
              <b-button class="btn-icon" variant="primary" @click="hide">
                <icon icon="ph:x-bold" width="15" />
              </b-button>
            </p>
            <b-card class="border-style">
              <b-card-text text-tag="h4">
                {{ ticket.ticket_name }}
              </b-card-text>
            </b-card>
            <b-card hidden>
              <div class="d-flex justify-content-between">
                <div class=""/>
                <div class="d-flex justify-content-between" >
                  <icon icon="fad:copy" width="18" class="mr-1"/>
                  <icon icon="streamline:interface-time-reset-time-clock-reset-stopwatch-circle-measure-loading" width="18" class="mr-1"/>
                  <b-link class="btn-icon" @click="fetchSubTickets">
                    <icon icon="jam:refresh" width="18" class="mr-1"/>
                  </b-link>
                  <icon icon="ph:bell-thin" width="18"/>
                </div>
              </div>
            </b-card>
            <b-tabs card lazy>
              <b-tab :title="$t('headline~ticket~subtasks')" active >
                <div class="d-flex justify-content-between align-items-center">
                  <b-button v-if="$can('create', table)" variant="primary" @click="createSubTicket">
                    {{ $t('headline~ticket~newsubtask') }}
                  </b-button>
                  <!--                  <field :field="{key:'subticket', noLabel :true, required: false}" :entity="entity"/>-->
                </div>
                <div class="mt-1">
                  <b-overlay :show="loading">
                    <b-table-simple fixed hover small :filter="entity.search">
                      <b-thead>
                        <b-tr>
                          <b-th>Name</b-th>
                          <b-th>Board</b-th>
                          <b-th >
                            Status
                          </b-th>
                          <b-th>Start Date</b-th>
                          <b-th>Assigned To</b-th>
                        </b-tr>
                      </b-thead>
                      <b-tbody >
                        <subticket-tr
                          v-for="(subticket, index) in subTickets"
                          :key="index"
                          :team-users="teamUsers"
                          :subticket="subticket"
                          @entity-updated="updateData"
                          @subticket-assigned="fetchSubTickets"
                        />
                      </b-tbody>
                      <b-tfoot>
                        <b-tr variant="secondary">
                          <b-td >
                            Summary : {{ subTickets.length }}
                          </b-td>
                          <b-td />
                          <b-td/>
                          <b-td/>
                          <b-td />

                        </b-tr>
                      </b-tfoot>
                    </b-table-simple>
                  </b-overlay>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </template>
      </b-sidebar>
      <span class="ml-auto">{{ formatDate(ticket.ticket_creation_time) }}</span>
      <generic-modal ref="modal" table="ticket" :definition="subTicketDef" table-definition-key="ticket"
                     :title="$t('headline~ticket~newsubtask')" @reload-table="isDataUpdated = true" />
    </div>
  </div>
</template>

<script>
import {
  BAvatar, BDropdown, BDropdownItem, BIconCalendarDate,
} from 'bootstrap-vue'
import moment from 'moment'
import bussinessMoment from 'moment-business-time'
import { mapGetters } from 'vuex'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import { title } from '@core/utils/filter'
import { formatDate } from '@/libs/utils'
import { find, findIndex } from 'lodash'
import Field from '@/views/app/Generic/Field.vue'
import SubticketTr from '@/views/app/Ticket/Subticket/SubticketTr.vue'
import SubTicketMixin from '@/views/app/Ticket/Subticket/SubTicketMixin.js'
import GenericModal from '@/views/app/Generic/modal.vue'

export default {
  name: 'InvoiceTicketCard',
  components: {
    GenericModal,
    SubticketTr,
    Field,
    BAvatar,
    BIconCalendarDate,
    BDropdown,
    BDropdownItem,
  },
  filters: {
    format(val) {
      return moment(val).format('DD.MM.YYYY (HH:mm)')
    },
    title,
  },
  mixins: [TicketMixin, SubTicketMixin],
  props: {
    ticket: Object,
    advanced: Boolean,
    teamUsers: Array,
  },
  data() {
    return {
      deadline_red: moment(this.ticket.ticket_deadline_red),
      deadline_yellow: moment(this.ticket.ticket_deadline_yellow),
      column_deadline_red: moment(this.ticket.columns[0].ticket_deadline_offset_red),
      column_deadline_yellow: moment(this.ticket.columns[0].ticket_deadline_offset_yellow),
      subticketsForm: [],
      entity: {
      },
      isDataUpdated: false,
      table: 'ticket',
    }
  },
  computed: {
    ...mapGetters({
      now: 'app/now',
    }),
    firstColumn() {
      return this.ticket.columns[0]
    },
    assignedUser() {
      const column = this.firstColumn
      if (column.user_id_assigned) {
        if (column.user_firstname_assigned) {
          return `${column.user_firstname_assigned} ${column.user_lastname_assigned}`
        }
        return column.user_email_assigned
      }

      if (column.team_name) {
        return column.team_name
      }
      return 'None'
    },
    filteredUsers() {
      const column = this.firstColumn
      if (column.user_id_assigned) {
        return this.teamUsers.filter(user => user.user_id === column.user_id_assigned)
      }
      if (column.team_name) {
        return this.teamUsers
      }
      return []
    },
    columnDeadlineColor() {
      if (this.now.isAfter(this.column_deadline_red)) return 'danger'
      if (this.now.isAfter(this.column_deadline_yellow)) return 'warning'
      return 'success'
    },
    deadlineForHuman() {
      return formatDate(this.deadline_yellow)
    },
    columnDeadlineForHuman() {
      return this.column_deadline_yellow.from(this.now)
    },
    deadlineStatus() {
      const ticketState = this.getDeadlineStatus(this.ticket)

      if (ticketState <= 45) {
        // this.deadlineColor = 'success'
        return 'On Time'
      }

      if (ticketState > 45 && ticketState <= 85) {
        // this.deadlineColor = 'warning'
        return 'Due Soon'
      }
      // this.deadlineColor = 'danger'

      return 'Overdue'
    },
    isTicket() {
      return this.ticket.ticket_id_group === null
    },
    deadlineColor() {
      if (this.now.isAfter(this.deadline_red)) return 'danger'
      if (this.now.isAfter(this.deadline_yellow)) return 'warning'
      return 'success'
    },
  },
  methods: {
    formatDate,
    getDeadlineStatus(ticket) {
      const { priority_name, ticket_creation_time } = { ...ticket, priority_name: 'Normal' }
      const elapseHourFromTicketCreationDate = bussinessMoment()
        .workingDiff(moment(ticket_creation_time), 'hours', true)
      const ticketPriorityData = find(this.TICKET_PRIORITY, ['label', priority_name])

      return (
        (elapseHourFromTicketCreationDate * 100) / ticketPriorityData.priorityMaxExecuteTime
      )
    },
    generateUserAvatar(user) {
      return user?.user_firstname.charAt(0).toUpperCase()
          + user?.user_lastname.charAt(0).toUpperCase()
    },
    updateData(data) {
      const index = findIndex(this.subticketsForm, { ticket_id: data.ticket_id })

      if (index !== -1) {
        this.subticketsForm[index] = data
        return
      }

      this.subticketsForm.push(data)
    },
    updateBoard() {
      if (this.isDataUpdated) {
        this.$emit('subticket-updated')
        this.isDataUpdated = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";

.border-style{
  border-inline-start: 5px solid red;
}
.ticket {
  border-left: 4px solid;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  &-success {
    border-left-color: $success;
  }

  &-danger {
    border-left-color: $danger;
  }

  &-warning {
    border-left-color: $warning;
  }
}
.body-padding {
  padding: .4rem;
}
.w-80{
  width: 80% !important;
}
</style>
