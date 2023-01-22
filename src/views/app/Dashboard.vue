<template>
  <div>
    <h3>{{$t('headline~dashboard~subframe~open_tickets')}}</h3>
    <b-row>
      <summary-card :title="$t('headline~dashboard~subframe~open_tickets_intime')" color="#343a40"
                    :percent="(nearDeadlineIds.length*100/total).toFixed(0)" :number="nearDeadlineIds.length" variant="dark"
                    cols="4" @click.native="show(nearDeadlineIds)"/>
      <summary-card :title="$t('headline~dashboard~subframe~open_tickets_afteryellow')" color="#FF7A00"
                    :percent="(criticalIds.length*100/total).toFixed(0)" :number="criticalIds.length" variant="warning"
                    cols="4" @click.native="show(criticalIds)"/>
      <summary-card :title="$t('headline~dashboard~subframe~open_tickets_afterred')" color="#D51130"
                    :percent="(overdueIds.length*100/total).toFixed(0)" :number="overdueIds.length" variant="danger"
                    cols="4" @click.native="show(overdueIds)"/>
    </b-row>
    <!--    <b-row>-->
    <!--      <b-col lg="12">-->
    <!--        <b-card title="TICKET READY FOR REVIEW">-->
    <!--          <div class="container">-->
    <!--            <div class="row">-->
    <!--              <div class="col-lg-3 col-sm-6" v-for="_ in 4">-->
    <!--                <period-card></period-card>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
    <!--    <b-row>-->
    <!--      <b-col lg="6">-->
    <!--        <b-card>-->
    <!--          <h4 style="margin-bottom: 20px;">KLEINERE ODER SCHWERWIEGENDE FEHLER</h4>-->
    <!--          <b-row>-->
    <!--            <custom-vertical-progress :cols="6" color="rgba(213, 17, 48, .3)" bgColor="rgba(213, 17, 48, .1)" :value="150" :max="100" title="Anzahl Tickets/Vorgänge"></custom-vertical-progress>-->
    <!--            <custom-vertical-progress :cols="6" color="rgba(0, 196, 177, .3)" bgColor="rgba(0, 196, 177, .1)" :value="45.5" :max="100" title="Anteil an Gesamt-tickets/Vorgängen" :is-percentage=true></custom-vertical-progress>-->
    <!--          </b-row>-->
    <!--        </b-card>-->
    <!--      </b-col>-->
    <!--    </b-row>-->
  </div>
</template>

<script>
import {
  BRow, BCard, BCol, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import SummaryCard from '@/views/app/CustomComponents/SummaryCard'
import CustomVerticalProgress from '@/views/app/CustomComponents/CustomVerticalProgress'
import PeriodCard from '@/views/app/CustomComponents/PeriodCard'
import moment from 'moment'

export default {
  components: {
    BRow,
    SummaryCard,
  },
  data() {
    return {
      options: ['opt 1', 'opt 2', 'opt 3', 'opt 4'],
      total: 1,
      overdueIds: [],
      nearDeadlineIds: [],
      criticalIds: [],
    }
  },
  methods: {
    show(ids) {
      this.$router.push({ name: 'table', params: { table: 'ticket', ids } })
    },
  },
  async mounted() {
    const { data } = (await this.$api({
      action: 'read-rich',
      entity: 'frontend_6_1_6_overview',
      per_page: 10000000,
    })).data.data

    const today = moment()
    this.total = data.length
    this.overdueIds = data.filter(t => today.isAfter(t.ticket_deadline_red)).map(t => t.ticket_id)
    this.nearDeadlineIds = data.filter(t => today.isBefore(t.ticket_deadline_yellow)).map(t => t.ticket_id)
    this.criticalIds = data.filter(t => today.isBetween(t.ticket_deadline_yellow, t.ticket_deadline_red)).map(t => t.ticket_id)
  },
}
</script>

<style scoped>
.center-col {
  margin-top: 15px
}
</style>
