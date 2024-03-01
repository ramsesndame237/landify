<template>
  <div class="p-1 ticket cursor-pointer position-relative " :class="'ticket-'+deadlineColor" @click="$emit('moredetails')"
       @mouseenter="(event) => onmouseAction(event,ticket)" @mouseleave="(event)=> onmouseAction(event,null)">
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
        {{ ticket.ticket_name }}</h4><b-spinner class="position-absolute position-right-0" type="grow" small variant="primary" v-if="ticket.read === 'NOT_READ'"></b-spinner>
    </div>
    <p class="text-truncate" :title="ticket.ticket_description">
      {{ ticket.ticket_description }}
    </p>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.priority_name') | title }}:</strong>
      <span v-if="ticket.priority_name">{{ ticket.priority_name }}</span>
      <span v-else>{{ $t('not-defined') }}</span>
    </div>
    <div v-if="advanced" class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_id') | title }}:</strong>
      <span>{{ ticket.ticket_id }}</span>
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
    <div class="d-flex">
      <strong class="mr-1">{{ $t('ticket~deadline~status') | title }}:</strong>
      <span :class="deadlineColor ? ('text-' + deadlineColor) : ''">{{ deadlineStatus }}</span>
    </div>
    <div class="d-flex justify-content-between mt-2 align-items-center" >
      <template v-if="false">
        <b-avatar-group v-if="filteredUsers.length > 1" size="20px" variant="warning" overlap="0.2">
          <template v-for="user in filteredUsers.slice(0, 4)">
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
      <b-link v-if="isTicket" v-b-toggle="`subticket-sidebar-${ticket.ticket_id}`" class="d-flex align-items-center mb-0" @click.stop="fetchSubTickets">
        <icon icon="tdesign:task" width="16px" height="16px" />
        <span class="ml"> {{ ` ${ticket.ticket_subticket_closed_count}/${ticket.ticket_subticket_count}` }}</span>
      </b-link>
      <b-sidebar :id="`subticket-sidebar-${ticket.ticket_id}`" lazy width="55%" right no-header shadow backdrop @hidden="updateBoard">
        <template #default="{ hide }" >
          <div class="px-1 py-2">
            <p class="text-right">
              <b-button class="btn-icon" variant="primary" @click.stop="hide">
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
                  <b-link class="btn-icon" @click.stop="fetchSubTickets">
                    <icon icon="jam:refresh" width="18" class="mr-1"/>
                  </b-link>
                  <icon icon="ph:bell-thin" width="18"/>
                </div>
              </div>
            </b-card>
            <b-tabs card lazy>
              <b-tab :title="$t('headline~ticket~subtasks')" active >
                <div class="d-flex justify-content-between align-items-center">
                  <b-button variant="primary" @click.stop="createSubTicket">
                    {{ $t('button~newsubtask') }}
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
                      <b-tbody>
                        <subticket-tr
                          v-for="(subticket, index) in subTickets"
                          :key="index"
                          :team-users="teamUsers"
                          :subticket="subticket"
                        />
                      </b-tbody>
                      <b-tfoot>
                        <b-tr variant="secondary">
                          <b-td >
                            Summary : {{ subTickets.length }}
                          </b-td>
                          <b-td />
                          <b-td />
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

    <FloatingActionButton v-if="itemOver" :key="itemOver.ticket_id" class="position-absolute" :style="{top:topFloatElement,left:leftFloatElement}">
      <b-row slot="action">
        <b-col>
          <b-button v-b-tooltip.hover :title="$t('button~assignto')" size="sm" class="mr-1" @click.stop="$emit('assign')">
            <feather-icon icon="UserCheckIcon" size="15" class="text-white"/>
          </b-button>
          <b-button v-b-tooltip.hover size="sm" class="mr-1" :title="$t(ticket.ticket_closed ? 'button~ticket~reopen' : 'button~ticket~close') "
                    @click.stop="(e)=>toggleTicket(e,ticket)">
            <feather-icon icon="KeyIcon" size="15" class="text-white"/>
          </b-button>
          <b-button v-if="isTicket" v-b-toggle="`subticket-sidebar-${ticket.ticket_id}`" v-b-tooltip.hover size="sm" :title="$t('button~ticket~see-subtickets')"
                    @click.stop="fetchSubTickets">
            <icon icon="mdi:subtasks" width="16" />
          </b-button>
        </b-col>
      </b-row>
    </FloatingActionButton>
  </div>
</template>

<script>
import {
  BAvatarGroup,
  BAvatar,
  BButton,
  BIconCalendarDate,
} from 'bootstrap-vue'
import moment from 'moment'
import { mapGetters } from 'vuex'
import TicketMixin from '@/views/app/Kanban/TicketMixin'
import { formatDate, title } from '@core/utils/filter'
import FloatingActionButton from '@/components/FloatingActionButton.vue'
import SubTicketMixin from '@/views/app/Ticket/Subticket/SubTicketMixin'
import SubticketTr from '@/views/app/Ticket/Subticket/SubticketTr.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import bussinessMoment from 'moment-business-time'

export default {
  name: 'InvoiceTicketCard',
  components: {
    GenericModal,
    SubticketTr,
    FloatingActionButton,
    BAvatar,
    BAvatarGroup,
    BButton,
    BIconCalendarDate,
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
      itemOver: null,
      topFloatElement: 0,
      leftFloatElement: 0,
      deadlineColor: '',
      subticketsForm: [],
      entity: {
      },
      isDataUpdated: false,
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
      const column = this.ticket.columns[0]
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
    deadlineForHuman() {
      return formatDate(this.deadline_yellow)
    },
    deadlineStatus() {
      const ticketState = this.getDeadlineStatus(this.ticket)
      this.computeDeadlineColor(ticketState)
      if (ticketState <= 45) {
        return 'On Time'
      }
      if (ticketState > 45 && ticketState <= 85) {
        return 'Due Soon'
      }
      return 'Overdue'
    },
    isTicket() {
      return this.ticket.ticket_id_group === null
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
  },
  methods: {
    computeDeadlineColor(ticketState) {
      if (ticketState <= 45) {
        this.deadlineColor = 'success'
      } else if (ticketState > 45 && ticketState <= 85) {
        this.deadlineColor = 'warning'
      } else { this.deadlineColor = 'danger' }
    },
    getDeadlineStatus(ticket) {
      const { ticket_creation_time, priority_deadline_value } = ticket
      const elapseHourFromTicketCreationDate = bussinessMoment()
        .workingDiff(moment(ticket_creation_time), 'hours', true)

      const defaultDeadlineValue = priority_deadline_value || 48

      return (elapseHourFromTicketCreationDate * 100) / defaultDeadlineValue
    },
    formatDate,
    onmouseAction(event, value) {
      this.leftFloatElement = event.clientX
      this.topFloatElement = event.clientY
      this.itemOver = value
    },
    generateUserAvatar(user) {
      return user?.user_firstname.charAt(0).toUpperCase()
        + user?.user_lastname.charAt(0).toUpperCase()
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
.border-style{
  border-inline-start: 5px solid red;
}
</style>
