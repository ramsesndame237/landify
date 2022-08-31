<template>
  <div class="">
    <div class="top px-1 pt-1">
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
      <div class="flex items-center justify-between">
        <div>
          <strong>Area:</strong>
          <span class="ml-2">Stock space</span>
        </div>
      </div>
    </div>
    <hr>
    <div class="bottom px-1 pb-1">
      <div class="list" style="font-size: 10px">
        <dl class="d-flex justify-content-between">
          <dt>Partner company name</dt>
          <dd>Test</dd>
        </dl>
        <dl class="d-flex justify-content-between">
          <dt>Company name</dt>
          <dd>Test</dd>
        </dl>
        <dl class="d-flex justify-content-between">
          <dt>Responsible receivables manager</dt>
          <dd>Test</dd>
        </dl>
        <b-avatar-group size="32px">
          <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-5.jpg')"/>
          <b-avatar class="pull-up" variant="primary"
                    :src="require('@/assets/images/portrait/small/avatar-s-7.jpg')"/>
          <b-avatar class="pull-up" :src="require('@/assets/images/portrait/small/avatar-s-10.jpg')"/>
        </b-avatar-group>
      </div>
    </div>
  </div>
</template>

<script>

import { BAvatarGroup, BAvatar, BButton } from 'bootstrap-vue'

export default {
  name: 'SimpleBlock',
  components: {
    BAvatar,
    BAvatarGroup,
    BButton
  },
  props: {
    title: String,
    description: String,
  },
}
</script>

<style scoped>

</style>
