<template>
  <div class="p-1">
    <div class="w-100 mb-1" style="height: 150px; background-color: #333941; border-radius: 4px" v-if="withAttach">
    </div>
    <h4 class="font-weight-bolder" style="color: #ccc; font-size: 15px">{{ title }}</h4>
    <h5>{{ sub_title }}</h5>
    <div class="stats d-flex justify-content-between align-items-center mb-1">
      <div class="d-flex">
        <div class="d-flex justify-content-center align-items-center" style="background-color: black; border-radius: 100%; padding: 2px; height: 20px; width: 20px; color: #fff; margin-right: 2px">
          <b-icon-paperclip></b-icon-paperclip>
        </div>
        <span>{{ documents_nb }}</span>
      </div>
      <div class="d-flex">
        <div class="d-flex justify-content-center align-items-center" style="background-color: #00F1DA; border-radius: 100%; padding: 2px; height: 20px; width: 20px; color: #fff; margin-right: 2px">
          <b-icon-check></b-icon-check>
        </div>
        <span>4/5</span>
      </div>
      <div class="" style="color: #00F1DA; background-color: rgba(0, 241, 218, .1); padding: 3px 7px; border-radius: 3px">
        <b-icon-clock-fill></b-icon-clock-fill>
        <span class="ml-1">{{ left_days }} Tage übrig</span>
      </div>
    </div>
    <div class="">
      <b-progress
          max="100"
          :value="percents"
          style="margin-bottom: 2px;"
      ></b-progress>
    </div>
    <div class="values d-flex justify-content-between align-items-center font-weight-light mb-2" style="color: #ccc; font-size: 17px">
      <div class="hours">{{ hours }} Stunden</div>
      <div class="percents">{{ percents }}%</div>
    </div>
    <b-avatar-group size="32px">
      <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-5.jpg')"/>
      <b-avatar class="pull-up" variant="primary"
                :src="require('@/assets/images/portrait/small/avatar-s-7.jpg')"/>
      <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-10.jpg')"/>
      <div class="d-flex justify-content-center align-items-center font-weight-bolder" style="background-color: #ccc; height: 33px; width: 33px; border-radius: 100%; margin-left: 5px" v-if="participants_nb - 3 > 0">{{ `+${participants_nb - 3}` }}</div>
    </b-avatar-group>
  </div>
</template>

<script>
import { BAvatarGroup, BAvatar, BButton, BIconPaperclip, BProgress, BIconCheck, BIconClockFill } from 'bootstrap-vue'
import CustomHorizontalProgress from '@/views/app/CustomComponents/CustomHorizontalProgress'
export default {
  name: 'SummaryBlock',
  components: {
    BIconPaperclip,
    BAvatar,
    BAvatarGroup,
    BButton,
    BProgress,
    BIconCheck,
    BIconClockFill,
    CustomHorizontalProgress,
  },
  props: {
    title: String,
    sub_title: String,
    hours: String,
    percents: String,
    left_days: String,
    documents_nb: String,
    participants_nb: String,
    withAttach: { type: Boolean, default: false },
  },
}
</script>

<style scoped>

</style>
