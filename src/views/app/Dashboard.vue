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
              <div class="col-lg-3 col-sm-6">
                <div class="card" style="background-color: #00C4B1">
                  <div class="card-body">widerspruchsfrist</div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="card" style="background-color: #00C4B1">
                  <div class="card-body">widerspruchsfrist</div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="card" style="background-color: #00C4B1">
                  <div class="card-body">widerspruchsfrist</div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="card" style="background-color: #00C4B1">
                  <div class="card-body">widerspruchsfrist</div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCard, BCol } from 'bootstrap-vue'
import SummaryCard from '@/views/app/Generic/SummaryCard'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    SummaryCard
  },
}
</script>

<style scoped>
  .center-col { margin-top: 15px }
</style>
