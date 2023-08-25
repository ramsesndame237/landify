<template>
  <div class="">
    <h5 class="mb-1 mt-2 font-weight-bolder">
      Yesterday, May 2
    </h5>
    <b-card>
      <b-card-body class="d-flex justify-content-between align-items-center">
        <div class="">
          <h4 class="font-weight-bolder" style="color: black">
            Widerspruchsfrist
          </h4>
          <h5 style="color: #ccc">
            Some descriptions about this
          </h5>
          <div class="">
            11:00 PM — 4:00 AM
          </div>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <div class="d-flex justify-content-center align-items-center" style="height: 30px; width: 30px; background-color: #D51130; border-radius: 100%">
            <b-icon-bag-fill color="#fff"/>
          </div>
          <b-icon-caret-down/>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BCardBody, BIconBagFill, BIconCaretDown,
} from 'bootstrap-vue'

export default {
  name: 'OperationRecapCard',
  components: {
    BRow,
    BCard,
    BCardBody,
    BCol,
    BIconBagFill,
    BIconCaretDown,
  },
}
</script>

<style scoped>

</style>
