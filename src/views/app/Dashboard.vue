<template>
  <div>
    <div class="d-sm-flex justify-content-between align-items-center ">
      <div class="font-weight-bolder">
        <h3>{{ $t('headline~dashboard~subframe~open_tickets') }}</h3>
      </div>
      <div class="">
        <div class="d-flex align-items-center">
          <date-picker v-model="date" v-bind="datePickerOptions" class="mb-1" @clear="resetDatePicker" @change="datePickerHandler" />

          <field class="mx-1 w-50" :field="{ key: 'team_id', type: 'list', list: 'team', listLabel: 'team_name', noLabel: true, required: false }" :entity="entity" />
          <b-button title="Advanced filter" size="sm" variant="primary" class="btn-icon mb-1" @click="openFilterModal">
            <feather-icon icon="FilterIcon"/>
          </b-button>
        </div>
      </div>
    </div>
    <b-row>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#343a40"
                    :percent="(before_deadline*100/total_open_tickets).toFixed(0)" :number="before_deadline"
                    variant="dark" cols="4" @click.native="show(dashboard_filter.before_deadline)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')"
                    color="#FF7A00" :percent="(critical_yellow*100/total_open_tickets).toFixed(0)" :number="critical_yellow"
                    variant="warning" cols="4" @click.native="show( dashboard_filter.critical_yellow)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#D51130"
                    :percent="(over_due_red*100/total_open_tickets).toFixed(0)" :number="over_due_red" variant="danger"
                    cols="4" @click.native="show(dashboard_filter.over_due_red)"/>
    </b-row>
    <generic-filter ref="filter" table="ticket" :definition="definition" :initial-data="{team_id: entity.team_id}" vertical @reset="resetModal" @filter="modalHandler" />
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'
import moment from 'moment'
import SummaryCard from '@/views/app/Dashboard/Components/SummaryCard.vue'
import Field from '@/views/app/Generic/Field.vue'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import GenericFilter from '@/views/app/Generic/Filter.vue'

export default {
  name: 'Dashboard',
  components: {
    BRow, SummaryCard, Field, DatePicker, GenericFilter,
  },
  data() {
    return {
      total_open_tickets: 1,
      over_due_red: [],
      before_deadline: [],
      critical_yellow: [],
      loading: false,
      date: '',
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
      definition: {
        filters: [
          {
            key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name', required: false,
          },
          {
            key: 'partnercompany_id', type: 'list', list: 'partnercompany', listLabel: 'partnercompany_name', required: false,
          },
        ],
      },
      entity: {},
      dashboard_filter: {
        before_deadline: 5,
        critical_yellow: 6,
        over_due_red: 7,
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
        this.fetchDashboardStatistics()
      },
      deep: true,
    },
  },
  mounted() {
    this.resetDatePicker()
  },
  methods: {
    show(status) {
      this.$router.push({ name: 'table', params: { table: 'ticket', filterValue: status } })
    },
    openFilterModal() {
      this.$refs.filter.openModal()
    },
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
    modalHandler(data) {
      this.entity = { ...this.entity, ...data }
    },
    resetModal(data) {
      const team_id = this.entity?.team_id
      this.entity = { ...data, team_id }
    },
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
