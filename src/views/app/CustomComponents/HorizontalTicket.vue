<template>
  <b-col lg="cols">
    <div class="py-5 px-3" style="background-color: "/>
  </b-col>
</template>

<script>
import {  BCol } from 'bootstrap-vue'

export default {
  name: 'HorizontalTicket',
  components: {
    BCol,
  },
  props: ['cols', 'number', 'color', 'bgColor', 'progressColor'],
}
</script>

<style scoped>

</style>
