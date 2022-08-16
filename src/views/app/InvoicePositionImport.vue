<template>
  <div>
    <h3>
      Main Heading </h3>
    <b-card>
      <h3>Take over partial billing items from previous year</h3>
    </b-card>
    <b-row>

    </b-row>
    <div class="d-flex justify-content-end">
      <b-button class="mr-1" size="sm" variant="primary">
        <span>Show Invoice Positions</span>
      </b-button>
      <b-button class="mr-1" size="sm" variant="primary">
        <span>Submit and transfert to invoice</span>
      </b-button>
    </div>

    <h3>Please select the partial billing items and data you want to transfer:</h3>
    <b-card>
      Table Here
    </b-card>
  </div>
</template>

<script>
import { BButton, BCard, BTable } from "bootstrap-vue";

export default {
  name: "InvoicePositionImport",
  components: { BButton, BCard, BTable },
}
</script>

<style scoped>

</style>
