<template>
  <div>
    <h3>OPEN TICKETS</h3>
    <b-row>
      <summary-card title="CRITICAL" value="24.055.432 €" color="orange" percent="93" number="28" variant="warning" cols="4"></summary-card>
      <summary-card title="NEAR DEADLINE" value="56.916.314 €" color="#343a40" percent="93" number="34" variant="dark" cols="4"></summary-card>
      <summary-card title="OVER DUE" value="19.215.612 €" color="#D51130" percent="60" number="14" variant="danger" cols="4"></summary-card>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card title="TICKET READY FOR REVIEW">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-sm-6" v-for="_ in 4">
                <div class="card" style="background-color: rgba(0, 196, 177, .1); padding: 19px">
                  <div class="c-header d-flex justify-content-between align-content-center">
                    <div class="title text-black-500" style="text-transform: uppercase">widerspruchsfrist</div>
                    <div class="dots"></div>
                  </div>
                  <div class="schedule d-flex align-content-center font-weight-bolder" style="color: #00C4B1">
                    <h1 class="mr-2" style="color: #00C4B1">23.11</h1>
                    <span class="my-auto">10:00 - 10:45</span>
                  </div>
                  <div class="c-footer">
                    Widerspruch lauft hier ab.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="6">
        <b-card>
          <h4 style="margin-bottom: 20px;">KLEINERE ODER SCHWERWIEGENDE FEHLER</h4>
          <b-row>
            <custom-vertical-progress :cols="6" color="rgba(213, 17, 48, .3)" bgColor="rgba(213, 17, 48, .1)" :value="70" :max="100" title="Anzahl Tickets/Vorgänge"></custom-vertical-progress>
            <custom-vertical-progress :cols="6" color="rgba(0, 196, 177, .3)" bgColor="rgba(0, 196, 177, .1)" :value="45.5" :max="100" title="Anteil an Gesamt-tickets/Vorgängen" :is-percentage=true></custom-vertical-progress>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCard, BCol } from 'bootstrap-vue'
import SummaryCard from '@/views/app/CustomComponents/SummaryCard'
import CustomVerticalProgress from '@/views/app/CustomComponents/CustomVerticalProgress'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    SummaryCard,
    CustomVerticalProgress,
  },
}
</script>

<style scoped>
  .center-col { margin-top: 15px }
  /*.dots:after {*/
  /*  cursor: pointer;*/
  /*  color: black;*/
  /*  content: '\2026';*/
  /*  font-size: 25px;*/
  /*  padding: 0 5px;*/
  /*  font-weight: 700;*/
  /*  display: flex;*/
  /*  align-content: center;*/
  /*}*/
</style>
