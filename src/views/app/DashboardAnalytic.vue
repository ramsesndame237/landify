<template>
  <div class="">
    <div class="d-sm-flex justify-content-between align-items-center ">
      <div class="font-weight-bolder">
        <h3 class="text-uppercase">
          {{ title }} </h3>
      </div>
      <div style="width: 70%;">
        <div class="d-flex align-items-center flex-wrap flex-sm-nowrap w-100 dashboard_style">
          <date-picker v-model="date" v-bind="datePickerOptions" style="margin-bottom: -0.5rem;" class=" w-100"
                       @change="datePickerHandler"/>
          <field class="ml-sm-1 w-100"
                 :field="{
                    key: 'customergroup_id',
                    type: 'list',
                    required: true,
                    list: 'customergroup',
                    listLabel: 'customergroup_name',
                  }"
                 :entity="entity"/>
          <field class="ml-sm-1 w-100"
                 :field="{
                    key: 'company_id',
                    filter_key: 'customergroup_id',
                    type: 'list',
                    required: false,
                    list: 'company',
                    listLabel: 'company_name',
                  }"
                 :entity="entity"/>
          <field class=" mx-sm-1 w-100"
                 :field="{ key: 'team_id', type: 'custom-select', required: false, items: filteredTeams, noAutoFill: !team_is_customer, disabled: teamFieldDisabled }"
                 :entity="entity" />
          <field class="w-100"
                 :field="{ key: 'user_id', type: 'custom-select', items: usersData, required: false }"
                 :entity="entity" :disabled="entity.company_id === -1"/>
        </div>
      </div>
    </div>
    <b-row>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#008000"
                    :percent="(before_deadline*100/total_open_tickets).toFixed(0)" :number="before_deadline"
                    variant="dark" cols="4" @click.native="show(dashboard_filter.BEFORE_DEADLINE)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')"
                    color="#d1bf00" :percent="(critical_yellow*100/total_open_tickets).toFixed(0)"
                    :number="critical_yellow" variant="warning" cols="4"
                    @click.native="show( dashboard_filter.CRITICAL_YELLOW)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#d70000"
                    :percent="(over_due_red*100/total_open_tickets).toFixed(0)" :number="over_due_red" variant="danger"
                    cols="4" @click.native="show(dashboard_filter.OVERDUE_RED)"/>
      <summary-card :loading="loading" :hide-percentage="true"
                    :title="$t('headline~dashboard~subframe~update~tickets~numbers')" color="#1183D5"
                    :number="total_update_ticket"
                    variant="dark" cols="4" @click.native="show('Update_ticket')"/>
    </b-row>
  </div>
</template>
<script>
import { getUserData } from '@/auth/utils'
import { USER_ROLES } from '@/config/config-access/config-roles'
import CompanyMixin from '@/views/app/Company/CompanyMixin'
import SummaryCard from '@/views/app/Dashboard/Components/SummaryCard.vue'
import Field from '@/views/app/Generic/Field.vue'
import TeamMixin from '@/views/app/Team/TeamMixin'
import { filter, pickBy } from 'lodash'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardAnalytic',
  components: {SummaryCard, DatePicker, Field},
  mixins: [TeamMixin, CompanyMixin],
  props: {
    title: String,
    team_is_customer: {type: Boolean, default: false},
    initData: {type: Object, default: () => ({})},
  },
  data() {
    return {
      entity: {
        tickets: this.team_is_customer ? 'customers' : 'seybolds',
        team_id: this.$isAdminOr(USER_ROLES.expansion_manager) && this.team_is_customer ? 6 : -1, // MVM_KUNDE
        user_id: -1,
        company_id: -1,
      },
      total_open_tickets: 1,
      datePickerOptions: {
        // type: 'week',
        range: true,
        format: 'D MMM YYYY',
        valueType: 'YYYY-MM-DD',
        placeholder: 'Filter by date',
        confirm: true,
        // inline: true,
        // showWeekNumber: true
        shortcuts: [
          {text: 'Today', onClick: () => [moment().toDate(), moment().toDate()]},
          {
            text: 'Yesterday',
            onClick: () => {
              const date = moment().subtract(1, 'day')

              return [date.toDate(), moment().toDate()]
            },
          },
          {
            text: '7 day ago',
            onClick: () => {
              const date = moment().subtract(1, 'week').format('YYYY-MM-DD')
              return [moment(date).toDate(), moment().toDate()]
            },
          },
          {
            text: 'This Month',
            onClick: () => {
              const date = moment().startOf('month').toDate()
              return [date, moment().toDate()]
            },
          },
        ],
      },
      date: '',
      loading: false,
      over_due_red: [],
      before_deadline: [],
      critical_yellow: [],
      total_update_ticket: [],
      dashboard_filter: {
        BEFORE_DEADLINE: 'before_deadline',
        CRITICAL_YELLOW: 'critical_yellow',
        OVERDUE_RED: 'over_due_red',
      },
      user: getUserData(),
      usersData: [{label: 'All', value: -1}],
    }
  },
  computed: {
    teamFieldDisabled() {
      return this.$isAdminOr(
        USER_ROLES.area_manager,
        USER_ROLES.store_manager,
      )
    },
    initDate() {
      return [moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    },
    ...mapGetters('user', ['isUserExternClientNotDirector', 'isUserInternAndNotAdmin']),
  },
  watch: {
    entity: {
      handler() {
        this.fetchDashboardStatistics()
      },
      deep: true,
    },
    'entity.team_id': function () {
      this.getUsers()
    },
    'entity.company_id': function (newValue) {
      if (newValue === -1) {
        this.entity.team_id = -1
        if (!this.isUserExternClientNotDirector) {
          this.entity.user_id = -1
        }
      } else {
        this.getUsers()
      }
    },
  },
  mounted() {
    this.resetDatePicker()
    setTimeout(() => {
      if (Object.keys(this.initData).length > 0 && this.initData.company_id !== undefined && this.entity?.company_id) {
        this.entity.company_id = this.initData?.company_id
        if (this.isTeamExistInList(this.initData?.team_id)) {
          this.entity.team_id = this.initData?.team_id

          if (this.initData?.user_id) {
            this.entity.user_id = this.initData?.user_id
          }
        }
      }
    }, 500)
  },
  methods: {
    async getUsers() {
      try {
        const {user_id} = this.user
        console.log("User ", this.user)
        const filteredEntity = pickBy(this.entity, val => ![-1, null, undefined].includes(val))

        const response = await this.$http.get('users', {
          params: filteredEntity,
        })
        const data = response.data.data.data
        let transformedData = data.map(user => {
          if (user.user_id === user_id) {
            return {label: 'My Tickets', value: user.user_id, ...user}
          }
          return {label: user.user_email, value: user.user_id, ...user}
        })

        if (((this.isUserExternClientNotDirector) && this.team_is_customer) && this.user?.role?.[0]?.role_code === USER_ROLES.lead) {
          transformedData = filter(data, {user_id}).map(user => ({label: 'My Tickets', value: user.user_id, ...user}))
          this.entity.user_id = data.some(user => user.user_id === user_id) ? user_id : -1
        }

        this.usersData = [{label: 'All', value: -1}, ...transformedData]
      } catch (error) {
        console.log({error})
      }
    },
    async fetchDashboardStatistics() {
      this.loading = true
      const filteredEntity = Object.fromEntries(Object.entries(this.entity).filter(([, val]) => ![-1, null, undefined].includes(val)))
      const payload = {
        start_date: this.date[0],
        end_date: this.date[1],
        ...filteredEntity,
      }
      try {
        const response = await this.$http.get('/statistics/dashboard/ticket/new', {
          params: payload,
        })

        const {data} = response
        console.log("this is the return data", data)
        this.before_deadline = data.before_deadline
        this.critical_yellow = data.critical_yellow
        this.total_update_ticket = data.total_update_ticket
        this.over_due_red = data.over_due_red
        this.total_open_tickets = data.total_open_tickets === 0 ? 1 : data.total_open_tickets
      } catch (error) {
        console.log({error})
      } finally {
        this.loading = false
      }
    },
    datePickerHandler() {
      this.fetchDashboardStatistics()
    },
    async resetDatePicker() {
      this.date = this.initDate
      await this.fetchDashboardStatistics()
    },
    show(status) {
      // if (status === 'Update_ticket') {
      //   return this.$router.push({
      //     name: 'updateTicket',
      //     params: {
      //       dashboardData: {
      //         ...( status === 'Update_ticket'? {} :{ticket_deadline_status: status}),
      //         start_date: this.date[0],
      //         end_date: this.date[1],
      //         team_id: this.entity.team_id,
      //         user_id: this.entity.user_id,
      //         tickets: this.entity.tickets,
      //         company_id: this.entity.company_id,
      //         customergroup_id: this.getCustomerGroupId(this.entity.company_id),
      //         ticket_update_type: ''
      //       },
      //     },
      //   })
      // }
      this.$router.push({
        name: 'table',
        params: {
          table: 'ticket',
          dashboardData: {
            ...( status === 'Update_ticket'? {
              type_of_ticket: 'update_ticket'
            } :{ticket_deadline_status: status}),
            // ticket_deadline_status: status,
            start_date: this.date[0],
            end_date: this.date[1],
            team_id: this.entity.team_id,
            user_id: this.entity.user_id,
            tickets: this.entity.tickets,
            company_id: this.entity.company_id,
            customergroup_id: this.getCustomerGroupId(this.entity.company_id),
          },
        },
      })
    },
  },
}
</script>
<style>
.dashboard_style .vs__selected-options span.vs__selected {
  max-width: 6rem !important;
}
</style>
