<template>
  <div class="p-1 ticket" :class="'ticket-'+deadlineColor">
    <div class="d-flex align-items-center mb-1">
      <b-avatar variant="light-secondary" text="I"/>
      <h4 class="font-weight-bolder mb-0 ml-1" style="color: #ccc; font-size: 15px">{{ ticket.ticket_name }}</h4>
      <b-dropdown variant="link-" toggle-class="p-0" right no-caret class="ml-auto">
        <template v-slot:button-content>
          <feather-icon icon="MoreHorizontalIcon"/>
        </template>
        <b-dropdown-item :to="{name: 'table-view', params: {table: 'ticket', id: ticket.ticket_id}}">
          More details
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <p>{{ ticket.ticket_description }}</p>
    <div class="d-flex">
      <strong class="mr-1">Created At:</strong>
      <span>{{ ticket.ticket_creation_time | format }}</span>
      <b-icon-clock-fill class="ml-auto"/>
    </div>
    <div class="d-flex">
      <strong class="mr-1">Last change:</strong>
      <span>{{ ticket.ticket_last_change_time | format }}</span>
    </div>
    <div class="d-flex">
      <strong class="mr-1">Deadline:</strong>
      <span :class="deadlineColor?('text-'+deadlineColor):''">{{ deadlineForHuman }}</span>
      <b-icon-calendar-date :class="'ml-auto '+ (deadlineColor?('text-'+deadlineColor):'')"/>
    </div>
    <div class="d-flex">
      <strong class="mr-1">Planned treatment week:</strong>
      <span>{{ ticket.ticket_planned_treatment_week }}</span>
    </div>

    <div class="mt-1">
      <b-progress max="100" :value="ticket.ticket_progress" style="margin-bottom: 2px;"></b-progress>
    </div>
    <div class="values d-flex justify-content-between align-items-center font-weight-light">
      <div class="hours">Team A</div>
      <div class="percents">{{ ticket.ticket_progress + '%' }}</div>
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
import moment from "moment";
import { mapGetters } from "vuex";

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
  data() {
    return {
      deadline_red: moment(this.ticket.ticket_deadline_red),
      deadline_yellow: moment(this.ticket.ticket_deadline_yellow),
      deadline: moment(this.ticket.ticket_deadline),
    }
  },
  filters: {
    format(val) {
      return moment(val).format('DD.MM.YYYY (HH:mm)')
    },
  },
  props: {
    ticket: Object,
  },
  computed: {
    ...mapGetters({
      now: 'app/now',
    }),
    deadlineColor() {
      if (this.now.isAfter(this.deadline_red)) return 'danger'
      if (this.now.isAfter(this.deadline_yellow)) return 'secondary'
      return 'success'
    },
    deadlineForHuman() {
      return this.deadline.from(this.now)
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
