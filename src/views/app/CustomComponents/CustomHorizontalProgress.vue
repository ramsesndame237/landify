<template>
  <b-col :lg="cols">
    <div class="loader" style="position: relative; border-radius: 3px" :style="{'background-color': bgColor, height: height }">
      <strong class="backoverlay h-100" style="left: 0; display: block; position: absolute; border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px" :style="{'background-color': color, width: percentage}"/>
      <div class="overlay w-100 d-flex justify-content-between align-content-center" style="position: absolute; height: 100%;">
        <div class="title font-weight-bolder px-1 my-auto" style="font-size: 10px;">
          {{ title }}
        </div>
        <div v-if="showValue" class="font-weight-bolder px-1 my-auto" style="font-size: 30px;">
          {{ value }}<span v-if="isPercentage">%</span>
        </div>
      </div>
    </div>
  </b-col>
</template>

<script>
import { BCol, BRow } from 'bootstrap-vue'

export default {
  name: 'CustomHorizontalProgress',
  components: { BRow, BCol },
  props: {
    color: String,
    bgColor: String,
    value: Number,
    max: Number,
    title: String,
    cols: Number,
    isPercentage: Boolean,
    showValue: { type: Boolean, default: true },
    height: { type: String, default: '80px' },
  },
  data() {
    return {
    }
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
