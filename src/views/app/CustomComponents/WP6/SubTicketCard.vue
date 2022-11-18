<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="">
            <h3 class="font-weight-bolder" style="color: black">{{ ticket.ticket_name }}</h3>
            <h6 style="color: #ccc">{{ ticket.ticket_description }}</h6>
            <div class="d-flex justify-content-between align-items-center" style="font-size: 16px">
              <div class="date d-flex align-items-center">
                <b-icon-calendar-week style="margin-right: 4px;"/>
                <span>{{ticket.ticket_creation_time}}</span>
              </div>
              <div class="hour d-flex align-items-center">
                <b-icon-clock-fill style="margin-right: 4px;"/>
                <span>13:30 - 15:00</span>
              </div>
            </div>
          </div>
          <b-form-checkbox/>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard, BCardBody, BFormCheckbox, BIconCalendarWeek, BIconClockFill } from 'bootstrap-vue'
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
  },
  props: {
    ticket: Object,
  },
}
</script>

<style scoped>

</style>
