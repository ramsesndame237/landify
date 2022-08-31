<template>
  <div class="">
    <h1>Widerspruchsfrist</h1>
    <h4>Filiale 1</h4>
    <div class="stats d-flex justify-content-around align-items-center mb-1">
      <div class="">
        <b-icon-paperclip></b-icon-paperclip>
        <span>14</span>
      </div>
      <div class="">
        <b-icon-paperclip></b-icon-paperclip>
        <span>14</span>
      </div>
      <div class="">
        <b-icon-paperclip></b-icon-paperclip>
        <span>14</span>
      </div>
    </div>
    <div class="">
      <b-progress
      ></b-progress>
    </div>
    <b-avatar-group size="32px">
      <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-5.jpg')"/>
      <b-avatar class="pull-up" variant="primary"
                :src="require('@/assets/images/portrait/small/avatar-s-7.jpg')"/>
      <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-10.jpg')"/>
    </b-avatar-group>
  </div>
</template>

<script>
import { BAvatarGroup, BAvatar, BButton, BIconPaperclip, BProgress } from 'bootstrap-vue'
export default {
  name: 'SummaryBlock',
  components: {
    BIconPaperclip,
    BAvatar,
    BAvatarGroup,
    BButton,
    BProgress,
  },
}
</script>

<style scoped>

</style>
