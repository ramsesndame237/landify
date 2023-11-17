<template>
  <div class="">
    <b-card-text class="font-medium-4">
      List of comments
    </b-card-text>
    <b-card v-for="(item,index) in items" :key="index">
      <b-card-text>{{ item.contractnegotiation_comment }}</b-card-text>
      <b-card-text class="d-flex justify-content-between align-items-center">
        <span class="text-muted">{{ item.contractnegotiation_notice_date }}</span>
        <span class="font-italic">by {{ item.user_firstname +' '+ item.user_lastname }}</span>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'DeadlineComments',
  props: ['item'],
  computed: {
    items() {
      return this.item.contractdeadline_negotiations
    },
  },
}
</script>
<style scoped>

</style>
