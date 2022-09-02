<template>
  <b-row>
    <b-col lg="9">
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
    <b-col lg="3"></b-col>
  </b-row>
</template>

<script>
import { BButton, BCol, BRow, BCard, BCardBody, BIconAlarm } from 'bootstrap-vue'
import AdditionalCostsCard from '@/views/app/CustomComponents/WP6/AdditionalCostsCard'
import ValidationCard from '@/views/app/CustomComponents/WP6/ValidationCard'

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
  },
}
</script>

<style scoped>

</style>
