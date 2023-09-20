<template>
  <div class="">
    <div class="d-sm-flex justify-content-between align-items-center ">
      <div class="font-weight-bolder">
        <h3 class="text-uppercase">
          {{ title }}
        </h3>
      </div>
      <div class="">
        <div class="d-flex align-items-center">
          <date-picker v-model="date" v-bind="datePickerOptions" class="mb-1"
                       @change="datePickerHandler"/>
          <field class="mx-1 w-75"
                 :field="{ key: 'team_id', type: 'custom-select', noLabel: true, required: false, items: filteredTeams }"
                 :entity="entity"/>
          <template v-if="entity.team_id">
            <field class="w-75"
                   :field="{ key: 'user_id', type: 'list', list: 'user_team_grp', listLabel: 'user_email',filter_key: 'team_id', noLabel: true, required: false }"
                   :entity="entity"/>
          </template>
        </div>
      </div>
    </div>
    <b-row>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#343a40"
                    :percent="(before_deadline*100/total_open_tickets).toFixed(0)" :number="before_deadline"
                    variant="dark" cols="4" @click.native="show(dashboard_filter.BEFORE_DEADLINE)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')"
                    color="#FF7A00" :percent="(critical_yellow*100/total_open_tickets).toFixed(0)" :number="critical_yellow"
                    variant="warning" cols="4" @click.native="show( dashboard_filter.CRITICAL_YELLOW)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#D51130"
                    :percent="(over_due_red*100/total_open_tickets).toFixed(0)" :number="over_due_red" variant="danger"
                    cols="4" @click.native="show(dashboard_filter.OVERDUE_RED)"/>
    </b-row>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import Field from '@/views/app/Generic/Field.vue'
import moment from 'moment'
import SummaryCard from '@/views/app/Dashboard/Components/SummaryCard.vue'
import TeamMixin from '@/views/app/Team/TeamMixin'

export default {
  name: 'DashboardAnalytic',
  components: { SummaryCard, DatePicker, Field },
  mixins: [TeamMixin],
  props: {
    title: String,
    team_is_customer: { type: Boolean, default: false },
  },
  data() {
    return {
      entity: {
        tickets: this.team_is_customer ? 'customers' : 'seybolds',
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
          { text: 'Today', onClick: () => [moment().toDate(), moment().toDate()] },
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
      dashboard_filter: {
        BEFORE_DEADLINE: 'before_deadline',
        CRITICAL_YELLOW: 'critical_yellow',
        OVERDUE_RED: 'over_due_red',
      },
    }
  },
  computed: {
    initDate() {
      return [moment().startOf('week').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
    },
  },
  watch: {
    entity: {
      handler() {
        console.log('change')
        this.fetchDashboardStatistics()
      },
      deep: true,
    },
  },
  mounted() {
    this.resetDatePicker()
  },
  methods: {
    async fetchDashboardStatistics() {
      this.loading = true
      const payload = {
        start_date: this.date[0],
        end_date: this.date[1],
        ...this.entity,
      }
      try {
        const response = await this.$http.get('/statistics/dashboard/ticket', {
          params: payload,
        })

        const { data } = response

        this.before_deadline = data.before_deadline
        this.critical_yellow = data.critical_yellow
        this.over_due_red = data.over_due_red
        this.total_open_tickets = data.total_open_tickets === 0 ? 1 : data.total_open_tickets
      } catch (error) {
        console.log({ error })
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
      this.$router.push({
        name: 'table',
        params: {
          table: 'ticket', ticket_deadline_status: status, start_date: this.date[0], end_date: this.date[1], team_id: this.entity.team_id, user_id: this.entity.user_id, tickets: this.entity.tickets,
        },
      })
    },
  },
}
</script>
