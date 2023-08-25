<template>
  <b-col :lg="cols">
    <div class="loader" style="height: 250px; position: relative; border-radius: 3px"
         :style="{'background-color': bgColor}">
      <strong class="backoverlay w-100"
              style="bottom: 0; display: block; position: absolute; border-bottom-right-radius: 3px;  border-bottom-left-radius: 3px"
              :style="{'background-color': color, height: percentage}"/>
      <div class="overlay w-100 d-flex flex-column justify-content-center align-content-center"
           style="position: absolute; height: 100%;">
        <div class="font-weight-bolder" style="margin: auto; font-size: 60px;">
          {{ value }}<span v-if="isPercentage">%</span>
        </div>
        <div class="font-weight-bolder"
             style="text-transform: uppercase; text-align: center; padding: 10px; color: black">
          widerspruchsfrist
        </div>
      </div>
    </div>
    <div class="title font-weight-bolder p-2" style="color: black; text-align: center">
      {{ title }}
    </div>
  </b-col>
</template>

<script>
import { BCol } from 'bootstrap-vue'

export default {
  name: 'CustomVerticalProgress',
  components: { BCol },
  props: {
    color: String, bgColor: String, value: Number, max: Number, title: String, cols: Number, isPercentage: Boolean,
  },
  data() {
    return {}
  },
  computed: {
    percentage() {
      return `${Math.min((this.value / this.max) * 100, this.max)}%`
    },
  },
}
</script>

<style scoped>

</style>
