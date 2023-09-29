<template>
  <div>
    <template v-if="!isUserExternPartner">
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
import { mapGetters } from 'vuex'

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
      return !this.isUserExternPartner && !this.isUserAdminOrIntern ? this.dashboardCard.reverse() : this.dashboardCard
    },
    dashboardCard() {
      return [
        {
          title: 'SeyBold tickets',
          team_is_customer: false,
          initData: {
            team_id: -1,
            company_id: -1,
          },
        },
        {
          title: 'tickets',
          team_is_customer: true,
          ...((this.isUserExternClientNotDirector || this.isUserInternAndNotAdmin) && {
            initData: {
              team_id: -1,
              user_id: this.user?.user_id,
              company_id: this.user?.company?.company_id,
            },
          }),
        },
      ]
    },
    ...mapGetters('user',
      ['isUserExternPartner', 'isUserExternClientNotDirector', 'isUserExternClient', 'isUserExternPartner', 'isUserAdminOrIntern', 'isUserInternAndNotAdmin']),
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
