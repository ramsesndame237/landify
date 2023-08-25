<template>
  <div>
    <h3>{{ $t('headline~dashboard~subframe~open_tickets') }}</h3>
    <b-row>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#343a40"
                    :percent="(nearDeadlineIds.length*100/total).toFixed(0)" :number="nearDeadlineIds.length"
                    variant="dark" cols="4" @click.native="show(nearDeadlineIds)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')"
                    color="#FF7A00" :percent="(criticalIds.length*100/total).toFixed(0)" :number="criticalIds.length"
                    variant="warning" cols="4" @click.native="show(criticalIds)"/>
      <summary-card :loading="loading" :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#D51130"
                    :percent="(overdueIds.length*100/total).toFixed(0)" :number="overdueIds.length" variant="danger"
                    cols="4" @click.native="show(overdueIds)"/>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'
import moment from 'moment'
import SummaryCard from './Components/SummaryCard'

export default {
  components: {
    BRow,
    SummaryCard,
  },
  data() {
    return {
      total: 1,
      overdueIds: [],
      nearDeadlineIds: [],
      criticalIds: [],
      loading: false,
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
    show(ids) {
      this.$router.push({ name: 'table', params: { table: 'ticket', ids } })
    },
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
