<template>
  <b-overlay variant="white" :show="loading" spinner-variant="primary" blur="0" opacity=".75" rounded="sm">
    <b-card>
      <div class="d-flex justify-content-between align-items-center">
        <div class="">
          <h3 class="font-weight-bolder" style="color: black">
            {{ ticket.ticket_name }}
          </h3>
          <h6 style="color: #ccc">
            {{ ticket.ticket_description }}
          </h6>
          <div class="d-flex justify-content-between align-items-center" style="font-size: 16px">
            <div class="date d-flex align-items-center">
              <b-icon-calendar-week style="margin-right: 4px;"/>
              <span class="text-warning">{{ formatYellow }} - </span>
              <span class="text-danger">{{ formatRed }}</span>
            </div>
          </div>
        </div>
        <b-form-checkbox v-model="checked" @change="updateProgress"/>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BRow, BCol, BCard, BCardBody, BFormCheckbox, BIconCalendarWeek, BIconClockFill, BOverlay,
} from 'bootstrap-vue'
import moment from 'moment'

export default {
  name: 'SubTicketCard',
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BFormCheckbox,
    BIconCalendarWeek,
    BIconClockFill,
    BOverlay,
  },
  props: {
    ticket: Object,
  },
  data() {
    return {
      checked: this.ticket.ticket_progress === 100,
      loading: false,
    }
  },
  computed: {
    formatYellow() {
      return moment(this.ticket.ticket_deadline_yellow).format('lll')
    },
    formatRed() {
      return moment(this.ticket.ticket_deadline_offset_yellow).isSame(moment(this.ticket.ticket_deadline_offset_red), 'date')
        ? moment(this.ticket.ticket_deadline_red).format('HH:mm')
        : moment(this.ticket.ticket_deadline_red).format('lll')
    },
  },
  watch: {
    // 'ticket.ticket_progress': function() {
    //   // this.checked = this.ticket.ticket_progress === 100
    // },
  },
  methods: {
    async updateProgress() {
      const percent = this.checked ? 100 : 0
      this.loading = true
      try {
        const result = (await this.$api({
          entity: 'ticket',
          action: 'update',
          data: [{ ...this.ticket, ticket_progress: percent }],
        })).data.data.data[0][0]
        this.ticket.ticket_progress = result.ticket_progress
        this.$successToast('Ticket progress updated')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
