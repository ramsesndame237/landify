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
    <p class="text-truncate" :title="ticket.ticket_description">{{ ticket.ticket_description }}</p>
    <div v-if="advanced" class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_id') }}:</strong>
      <span>{{ ticket.ticket_id }}</span>
    </div>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.assigned_to') }}:</strong>
      <span class="text-truncate" :title="assignedUser">{{ assignedUser }}</span>
    </div>
    <div class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_deadline') }}:</strong>
      <span :class="deadlineColor?('text-'+deadlineColor):''">{{ deadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (deadlineColor?('text-'+deadlineColor):'')"/>
    </div>
    <div v-if="advanced" class="d-flex">
      <strong class="mr-1">{{ $t('attribute.ticket_deadline_offset') }}:</strong>
      <span :class="columnDeadlineColor?('text-'+columnDeadlineColor):''">{{ columnDeadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (columnDeadlineColor?('text-'+columnDeadlineColor):'')"/>
    </div>
    <div v-if="advanced" class="d-flex">
      <strong class="mr-1">{{ $t('attribute.priority_name') }}:</strong>
      <span>{{ ticket.priority_name }}</span>
    </div>
  </div>
</template>

<script>
import {
  BAvatarGroup,
  BAvatar,
  BButton,
  BIconPaperclip,
  BProgress,
  BIconCheck,
  BIconClockFill,
  BIconCalendarDate,
  BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import CustomHorizontalProgress from '@/views/app/CustomComponents/CustomHorizontalProgress'
import moment from 'moment'
import { mapGetters } from 'vuex'
import TicketMixin from '@/views/app/Kanban/TicketMixin'

export default {
  name: 'InvoiceTicketCard',
  components: {
    BIconPaperclip,
    BAvatar,
    BAvatarGroup,
    BButton,
    BProgress,
    BIconCheck,
    BIconClockFill,
    BIconCalendarDate,
    BDropdown,
    BDropdownItem,
    CustomHorizontalProgress,
  },
  filters: {
    format(val) {
      return moment(val).format('DD.MM.YYYY (HH:mm)')
    },
  },
  mixins: [TicketMixin],
  props: {
    ticket: Object,
    advanced: Boolean,
  },
  data() {
    return {
      deadline_red: moment(this.ticket.ticket_deadline_red),
      deadline_yellow: moment(this.ticket.ticket_deadline_yellow),
      column_deadline_red: moment(this.ticket.columns[0].ticket_deadline_offset_red),
      column_deadline_yellow: moment(this.ticket.columns[0].ticket_deadline_offset_yellow),
    }
  },
  computed: {
    ...mapGetters({
      now: 'app/now',
    }),
    assignedUser() {
      const column = this.ticket.columns[0]
      if (column.user_id_assigned) {
        if (column.user_firstname_assigned) {
          return `${column.user_firstname_assigned} ${column.user_lastname_assigned}`
        }
        return column.user_email_assigned
      }
      return 'None'
    },
    deadlineColor() {
      if (this.now.isAfter(this.deadline_red)) return 'danger'
      if (this.now.isAfter(this.deadline_yellow)) return 'warning'
      return 'success'
    },
    columnDeadlineColor() {
      if (this.now.isAfter(this.column_deadline_red)) return 'danger'
      if (this.now.isAfter(this.column_deadline_yellow)) return 'warning'
      return 'success'
    },
    deadlineForHuman() {
      return this.deadline_yellow.from(this.now)
    },
    columnDeadlineForHuman() {
      return this.column_deadline_yellow.from(this.now)
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
