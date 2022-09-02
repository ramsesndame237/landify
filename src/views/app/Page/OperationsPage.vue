<template>
  <b-row>
    <b-col lg="8">
      <b-card>
        <b-card-body>
          <div class="d-flex justify-content-between align-items-center">
            <div class="left">
              <h3 style="color: black" class="font-weight-bolder">Reminder Setzen</h3>
              <h6 style="font-weight: 400; color: #ccc">Emeut an diese Aufgabe erinnert werden</h6>
            </div>
            <div class="right">
              <b-button variant="danger" class="d-flex justify-content-between align-items-center">
                <b-icon-alarm class="mr-1"/>
                <span>Reminder Setzen</span>
              </b-button>
            </div>
          </div>
        </b-card-body>
      </b-card>
      <b-row>
        <additional-costs-card
            title="NEBENKOSTENABRECHNUNGEN"
            color="#ccc"
            cols="6"
            hours="54"
            percent="75"
        />
        <additional-costs-card
            title="NEBENKOSTENABRECHNUNGEN"
            color="#ccc"
            cols="6"
            hours="54"
            percent="75"
        />
      </b-row>
      <div class="d-flex justify-content-between align-items-center">
        <h2>Subaufgaben</h2>
        <span>Alle anzeigen</span>
      </div>
      <validation-card title="Kunde XY" subtitle="Emeut an diese Aufgabe erinnert werden"/>
      <validation-card title="Fililalleiter V" subtitle="Emeut an diese Aufgabe erinnert werden"/>
      <validation-card title="Fililalleiter V" subtitle="Emeut an diese Aufgabe erinnert werden"/>
    </b-col>
    <b-col lg="4">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="font-weight-bolder">Upcoming Events</h4>
        <b-dropdown
            variant="outline-danger"
        >
          <template #button-content>
            <b-icon-calendar-week class="mr-1"/>
            <span>Calendar</span>
<!--            <b-icon-caret-down/>-->
          </template>
          <b-dropdown-item>option 1</b-dropdown-item>
          <b-dropdown-item>option 2</b-dropdown-item>
          <b-dropdown-item>option 3</b-dropdown-item>
        </b-dropdown>
      </div>
      <operation-recap-card/>
      <operation-recap-card/>
      <operation-recap-card/>
      <b-row>
        <b-col lg="6">
          <b-card>
            <b-card-body>
              <h6 style="color: #ccc">abcbcaoasjsijs</h6>
              <h4 class="font-weight-bolder mb-2" style="color: black">Title</h4>
              <b-button class="m-auto" variant="danger">Open</b-button>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col lg="6">
          <b-card>
            <b-card-body>
              <h6 style="color: #ccc">abcbcaoasjsijs</h6>
              <h4 class="font-weight-bolder mb-2" style="color: black">Title</h4>
              <b-button class="m-auto" variant="danger">Open</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BButton, BCol, BRow, BCard, BCardBody, BIconAlarm, BDropdown, BDropdownItem, BIconCalendarWeek, BIconCaretDown } from 'bootstrap-vue'
import AdditionalCostsCard from '@/views/app/CustomComponents/WP6/AdditionalCostsCard'
import ValidationCard from '@/views/app/CustomComponents/WP6/ValidationCard'
import OperationRecapCard from '@/views/app/CustomComponents/WP6/OperationRecapCard'

export default {
  name: 'OperationsPage',
  components: {
    BButton,
    BCol,
    BRow,
    BCard,
    BCardBody,
    BIconAlarm,
    AdditionalCostsCard,
    ValidationCard,
    BDropdown,
    BDropdownItem,
    BIconCalendarWeek,
    BIconCaretDown,
    OperationRecapCard,
  },
}
</script>

<style scoped>

</style>
