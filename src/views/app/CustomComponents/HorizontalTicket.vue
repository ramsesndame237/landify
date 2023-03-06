<template>
  <b-col lg="cols">
    <div class="py-5 px-3" style="background-color: "></div>
  </b-col>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
export default {
  name: 'HorizontalTicket',
  props: ['cols', 'number', 'color', 'bgColor', 'progressColor'],
  components: {
    BRow,
    BCol
  },
}
</script>

<style scoped>

</style>
