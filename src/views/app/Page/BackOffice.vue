<template>
  <b-row>
    <ticket-card color="rgba(0, 196, 177, .1)" textColor="#00C4B1" number="26" percents="-12" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
    <ticket-card color="rgba(255, 122, 0, .1)" textColor="#FF7A00" number="08" percents="45" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
    <ticket-card color="rgba(213, 17, 48, .1)" textColor="#D51130" number="03" percents="30" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
    <ticket-card color="#fff" textColor="#000" number="05" percents="09" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
  </b-row>
</template>

<script>
import TicketCard from '@/views/app/CustomComponents/TicketCard'
import { BRow, BCard, BCol, BIcon, BDropdown, BDropdownItem } from 'bootstrap-vue'
export default {
  name: 'BackOffice',
  components: {
    TicketCard,
    BRow
  },
}
</script>

<style scoped>

</style>
