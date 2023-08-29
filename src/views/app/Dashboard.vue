<template>
  <div>
    <div class="d-sm-flex justify-content-between align-items-center ">
      <div class="font-weight-bolder">
        <h3>{{ $t('headline~dashboard~subframe~open_tickets') }}</h3>
      </div>
      <div class="">
        <div class="d-flex align-items-center">
          <date-picker v-bind="datePickerOptions" class="mb-1" v-model="date1" />

          <field class="mx-1 w-50" :field="{ key: 'team_id', type: 'list', list: 'team', listLabel: 'team_name', noLabel: true, required: false }" :entity="{}" />
          <b-button title="Advanced filter" @click="openFilterModal" size="sm" variant="primary" class="btn-icon mb-1">
            <feather-icon icon="FilterIcon"/>
          </b-button>
        </div>
      </div>
    </div>
    <b-row>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#343a40"
                    :percent="(nearDeadlineIds.length*100/total).toFixed(0)" :number="nearDeadlineIds.length"
                    variant="dark" cols="4" @click.native="show(nearDeadlineIds, 5)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')"
                    color="#FF7A00" :percent="(criticalIds.length*100/total).toFixed(0)" :number="criticalIds.length"
                    variant="warning" cols="4" @click.native="show(criticalIds, 6 )"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#D51130"
                    :percent="(overdueIds.length*100/total).toFixed(0)" :number="overdueIds.length" variant="danger"
                    cols="4" @click.native="show(overdueIds, 7)"/>
    </b-row>
    <generic-filter ref="filter" definition="" table="ticket" :definition="definition" vertical />
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'
import moment from 'moment'
import SummaryCard from "@/views/app/Dashboard/Components/SummaryCard.vue";
import Field from "@/views/app/Generic/Field.vue";

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import GenericFilter from "@/views/app/Generic/Filter.vue";

export default {
  name: 'Dashboard',
  components: {
    BRow,SummaryCard,Field, DatePicker, GenericFilter
  },
  data() {
    return {
      total: 1,
      overdueIds: [],
      nearDeadlineIds: [],
      criticalIds: [],
      loading: false,
      date1: '',
      datePickerOptions: {
        type: 'week',
        range: true,
        format: "dddd DD MMMM YYYY",
        valueType: 'YYYY-MM-DD',
        placeholder: 'Filter by date',
        confirm: true,
        confirmText: 'Ok',
        // inline: true,
        // showWeekNumber: true
        shortcuts: [
          { text: 'Today', onClick: () => [moment().toDate(),moment().toDate()] },
          {
            text: 'Yesterday',
            onClick: () => {
              const date = moment().subtract(1, 'day')

              return [date.toDate(), moment().toDate()];
            },
          },
          {
            text: 'This Week',
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
        defaulPanel: 'month'
      },
      definition: {
        filters: [
          { key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name' },
          { key: 'partnercompany_id', type: 'list', list: 'partnercompany', listLabel: 'partnercompany_name' },
        ]
      }
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = (await this.$api({
        action: 'read-rich',
        entity: 'frontend_6_1_6_overview',
        data: [{ ticket_closed: 0 }],
        per_page: 10000000,
      })).data.data

      const today = moment()
      this.total = data.length
      this.overdueIds = data.filter(t => today.isAfter(t.ticket_deadline_red)).map(t => t.ticket_id)
      this.nearDeadlineIds = data.filter(t => today.isBefore(t.ticket_deadline_yellow)).map(t => t.ticket_id)
      this.criticalIds = data.filter(t => today.isBetween(t.ticket_deadline_yellow, t.ticket_deadline_red)).map(t => t.ticket_id)
    } finally {
      this.loading = false
    }
  },
  methods: {
    show(ids, status) {
      this.$router.push({ name: 'table', params: { table: 'ticket', ids, filterValue: status } })
    },
    openFilterModal() {
      this.$refs.filter.openModal()
    }
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
