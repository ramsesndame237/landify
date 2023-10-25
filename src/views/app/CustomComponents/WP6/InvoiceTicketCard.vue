<template>
  <div class="p-1 ticket" :class="'ticket-'+deadlineColor">
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
    <div v-if="advanced" hidden class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_deadline_offset') | title }}:</strong>
      <span :class="columnDeadlineColor?('text-'+columnDeadlineColor):''">{{ columnDeadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (columnDeadlineColor?('text-'+columnDeadlineColor):'')"/>
    </div>
    <div v-if="advanced" class="d-flex">
      <strong class="mr-1">{{ $t('ticket~deadline~status') | title }}:</strong>
      <span :class="deadlineColor?('text-'+deadlineColor):''">{{ deadlineStatus }}</span>
    </div>
    <div class="d-flex justify-content-between mt-2 align-items-center">
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
      <p class="d-flex align-items-center mb-0">
        <icon icon="tdesign:task" width="16px" height="16px" />
        <span class="ml"> {{ ` ${ticket.ticket_subticket_closed_count}/${ticket.ticket_subticket_count}` }}</span>
      </p>
      <span>{{ formatDate(ticket.ticket_creation_time) }}</span>
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
import { find } from 'lodash'

export default {
  name: 'InvoiceTicketCard',
  components: {
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
  mixins: [TicketMixin],
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
      deadlineColor: '',
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
        this.deadlineColor = 'success'
        return 'On Time'
      }

      if (ticketState > 45 && ticketState <= 85) {
        this.deadlineColor = 'warning'
        return 'Due Soon'
      }
      this.deadlineColor = 'danger'

      return 'Overdue'
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
</style>
