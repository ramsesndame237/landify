<template>
  <div class="w-100">
    <b-badge pill :variant="data.ticket_closed === 1 ? 'dark' : data.ticket_closed === 0 ? 'success' :  variant" class="text-truncate mr-50" style="font-size: 8px; padding: 4px;">
      {{ $t(status) }} - {{ $t(data.ticket_closed ? 'header~board~status~closed' : 'header~board~status~open') }}
    </b-badge>
    <div class="d-flex align-items-center justify-content">
      <strong class="text-truncate">
        #{{ data.ticket_id }} - {{ data.ticket_name }}
      </strong>
    </div>
    <div class="d-flex align-items-start mt-50">
      <b-button v-if="data.priority_name" size="sm" pill :variant="data.priority_name === 'Normal' ? 'info' : data.priority_name === 'Critical' ? 'warning': data.priority_name === 'Urgent' ? 'danger' : 'default'"
        class="d-block mr-50 rounded-pill"
        :style="{color: data.priority_color, border: '1px solid', borderColor: data.priority_color}"
      >{{ data.priority_emoji }} {{ data.priority_name }}</b-button>
      <span class="d-block text-truncate">{{ moment(data.ticket_creation_time).format("llll") }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TicketNameCol',
  props: {
    col: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    value() {
      let finalValue = '';
      (this.col?.key?.split('.') || []).forEach(key => {
        finalValue = this.data?.[key]
      })
      return finalValue
    },
    variant() {
      const TICKETS_DEADLINE_VARIANT = {
        before_deadline: 'success',
        critical_yellow: 'warning',
        over_due_red: 'danger',
      }

      return TICKETS_DEADLINE_VARIANT[this.data?.ticket_deadline_status]
    },
    status() {
      const TICKETS_DEADLINE_STATUS = {
        before_deadline: 'headline~dashboard~subframe~open_tickets_intime',
        critical_yellow: 'headline~dashboard~subframe~open_tickets_afteryellow',
        over_due_red: 'headline~dashboard~subframe~open_tickets_afterred',
      }

      return TICKETS_DEADLINE_STATUS[this.data?.ticket_deadline_status]
    },
  },
  methods: {
    moment,
  },
}
</script>
