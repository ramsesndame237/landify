<template>
  <b-col :lg="cols">
    <div class="loader" style="height: 80px; position: relative; border-radius: 3px" :style="{'background-color': bgColor}">
      <strong class="backoverlay h-100" style="left: 0; display: block; position: absolute; border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px" :style="{'background-color': color, width: percentage}"></strong>
      <div class="overlay w-100 d-flex justify-content-between align-content-center" style="position: absolute; height: 100%;">
        <div class="title font-weight-bolder px-1 my-auto" style="font-size: 10px;">{{ title }}</div>
        <div class="font-weight-bolder px-1 my-auto" style="font-size: 30px;">{{ value }}<span v-if="isPercentage">%</span></div>
      </div>
    </div>
  </b-col>
</template>

<script>
import { BCol, BRow } from 'bootstrap-vue'

export default {
  name: 'CustomHorizontalProgress',
  components: {BRow, BCol},
  props: {color: String, bgColor: String, value: Number, max: Number, title: String, cols: Number, isPercentage: Boolean},
  data() {
    return {}
  },
  computed: {
    percentage() {
      return `${(this.value / this.max) * 100}%`
    },
  },
}
</script>

<style scoped>

</style>
