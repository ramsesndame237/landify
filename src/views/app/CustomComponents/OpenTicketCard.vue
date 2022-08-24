<template>
    <b-col :lg="cols">
      <div class="d-flex flex-column justify-content-center p-5" style="background-color: rgba(0, 196, 177, .1); text-align: center">
        <div>{{ title }}</div>
        <div style="font-size: 48px; font-weight: 700; color: #00C4B1">{{ number }}</div>
        <div style="margin: 24px 0; height: 1px; background-color: black"></div>
        <div style="font-size: 14px; color: #101010; font-weight: 700">Prognose in Std.</div>
        <div style="font-size: 48px; font-weight: 700; color: #000">{{ hours }}</div>
      </div>
      <div class="mt-2">
        <button class="w-100 btn" style="padding: 18px; background-color: #00C4B1; color: #fff">Zu den Ticketboards</button>
      </div>
    </b-col>
</template>

<script>
import { BCard, BCardText, BLink, BCol, BRow, BProgress, BCardTitle, BButton } from 'bootstrap-vue'

export default {
  name: 'OpenTicketCard',
  props: ['cols', 'number', 'hours', 'title'],
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
