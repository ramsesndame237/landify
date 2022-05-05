<template>
  <div>
    <h3>{{ $t('app.content.deadlines.sub_title') }}</h3>
    <b-card :title="` ${$t('app.sidebar.deadlines')} 🚀`">
      <b-card-text>{{ $t('app.content.deadlines.card_text') }} </b-card-text>
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
