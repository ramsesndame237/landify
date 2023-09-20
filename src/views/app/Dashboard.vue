<template>
  <div>
    <div class="">
      <DashboardAnalytic title="SeyBold tickets" :team_is_customer="false" />
    </div>
    <div class="mt-2">
      <DashboardAnalytic title="Clients tickets" :team_is_customer="true" />
    </div>
  </div>
</template>

<script>
import DashboardAnalytic from '@/views/app/DashboardAnalytic.vue'

export default {
  name: 'Dashboard',
  components: {
    DashboardAnalytic,
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
