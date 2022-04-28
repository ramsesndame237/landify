<template>
  <div>
    <h3>{{ $t('app.content.dashboard.sub_title') }}</h3>
    <b-card :title="` ${$t('app.sidebar.dashboard')} 🚀`">
      <b-card-text>{{ $t('app.content.dashboard.card_text') }} </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
}
</script>

<style>

</style>
