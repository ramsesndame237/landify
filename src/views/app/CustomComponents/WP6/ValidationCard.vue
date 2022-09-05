<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <b-card-body class="d-flex justify-content-between align-items-center">
          <div class="">
            <h3 class="font-weight-bolder" style="color: black">{{ title }}</h3>
            <h6 style="color: #ccc">{{ subtitle }}</h6>
            <div class="d-flex justify-content-between align-items-center" style="font-size: 16px">
              <div class="date d-flex align-items-center">
                <b-icon-calendar-week style="margin-right: 4px;"/>
                <span>Aug 23, 2021</span>
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
  name: 'ValidationCard',
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
    title: String,
    subtitle: String,
  },
}
</script>

<style scoped>

</style>
