<template>
  <div>
    <template v-if="!$isUserExternPartner">
      <div v-for="(card, index) in dashboardCardOrdered" :key="index" :class="{'mt-2': index !== 0}">
        <DashboardAnalytic :title="card.title" :init-data="card.initData" :team_is_customer="card.team_is_customer" />
      </div>
    </template>
    <template v-else>
      <b-card class="text-center">
        <b-card-text>
          Nothing to show
        </b-card-text>
      </b-card>
    </template>
  </div>
</template>

<script>
import DashboardAnalytic from '@/views/app/DashboardAnalytic.vue'
import { getUserData } from '@/auth/utils'

export default {
  name: 'Dashboard',
  components: {
    DashboardAnalytic,
  },
  data() {
    return {
      user: getUserData(),
    }
  },
  computed: {
    dashboardCardOrdered() {
      return !this.$isUserExternPartner && !this.$isUserAdminOrIntern ? this.dashboardCard.reverse() : this.dashboardCard
    },
    dashboardCard() {
      return [
        {
          title: 'SeyBold tickets',
          team_is_customer: false,
          initData: {
            team_id: null,
          },
        },
        {
          title: 'tickets',
          team_is_customer: true,
          ...((!this.$isUserExternDirector || this.$isUserInternAndNotAdmin) && {
            initData: {
              team_id: this.user?.team_id[0],
              user_id: this.user?.user_id,
            },
          }),
        },
      ]
    },
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
