<template>
  <div>
<!--    <h3>{{ $t('app.content.dashboard.sub_title') }}</h3>-->
<!--    <b-card :title="` ${$t('app.sidebar.dashboard')} 🚀`">-->
<!--      <b-card-text>{{ $t('app.content.dashboard.card_text') }} </b-card-text>-->
<!--    </b-card>-->
    <h3>OPEN TICKETS</h3>
    <b-row>
      <b-col cols="4">
        <b-card :title="'CRITICAL'">
          <b-card-text>Value: 24.055.432 $</b-card-text>
          <b-row>
            <b-col cols="9">
              <b-progress
                  value="94"
                  max="100"
                  height="6px"
                  variant="warning"
              ></b-progress>
              <div style="display: flex; justify-content: space-between; margin-top: 3px">
                <h6 style="font-size: 12px; font-weight: 200">% from overall</h6>
                <h6 style="font-size: 12px; font-weight: 200">94%</h6>
              </div>
            </b-col>
            <b-col cols="3">
              <h1 class="font-weight-bolder">28</h1>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card :title="'NEAR DEADLINE'">
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card :title="'OVER DUE'">
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BCardText, BLink, BCol, BRow, BProgress } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BCol,
    BRow,
    BProgress
  },
}
</script>

<style scoped>

</style>
