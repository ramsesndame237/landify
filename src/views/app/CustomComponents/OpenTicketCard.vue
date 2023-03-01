<template>
    <b-col :lg="cols">
      <div class="d-flex flex-column justify-content-center py-5" style="text-align: center" :style="{'background-color': bgColor}">
        <div style="font-size: 1rem; line-height: 2rem">{{ title }}</div>
        <div style="font-size: 48px; font-weight: 700;" :style="{color: color}">{{ number }}</div>
        <div style="margin: 24px 0; height: 1px; background-color: #ccc;" class="w-50 mx-auto"></div>
        <div style="font-size: 14px; color: #101010; font-weight: 700">Prognose in Std.</div>
        <div style="font-size: 48px; font-weight: 700; color: #000">{{ hours }}</div>
      </div>
      <div class="mt-2" v-if="withBtn">
        <button class="w-100 btn" style="padding: 18px; background-color: #00C4B1; color: #fff">Zu den Ticketboards</button>
      </div>
    </b-col>
</template>

<script>
import { BCard, BCardText, BLink, BCol, BRow, BProgress, BCardTitle, BButton } from 'bootstrap-vue'

export default {
  name: 'OpenTicketCard',
  props: ['cols', 'number', 'hours', 'title', 'bgColor', 'color', 'withBtn'],
  components: {
    BCol,
    BCard,
    BRow,
    BButton,
  },
}
</script>

<style scoped>

</style>
