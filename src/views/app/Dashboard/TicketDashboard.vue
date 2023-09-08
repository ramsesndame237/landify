<template>
  <div class="">
    <b-row>
      <b-col v-for="(ticket,index) in ticketsData" :key="index" :md="ticket.cols.md" :xl="ticket.cols.xl">
        <b-overlay :show="loading">
          <ticket-card :key="index" :style="{backgroundColor: ticket.color}" :loading="loading" v-bind="ticket"/>
        </b-overlay>
      </b-col>
    </b-row>
    <b-row class="mt-1" align-v="stretch">
      <open-ticket-card cols="3" number="26" hours="200" title="Offene Tickets bearbeitbar" bg-color="rgba(0, 196, 177, .1)" color="#00C4B1" with-btn="1"/>
      <open-ticket-card cols="3" number="08" hours="650" title="Offene Tickets noch nicht bearbeitbar" bg-color="rgba(0, 196, 177, .1)" color="#00C4B1" with-btn="1"/>
      <b-card class="col-lg-6"
              title="Ticket analysis"
      >
        <b-card-sub-title>Hover over the Circular Graph and Get Information.</b-card-sub-title>
        <b-card-body>
          <b-row>
            <b-col lg="6">
              <vue-apex-charts
                type="pie"
                height="300"
                :series="pieChart.series"
                :options="pieChart.chartOptions"
              />
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-row>
    <b-row>
      <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="3" bg-color="rgba(255, 122, 0, .1)" color="#FF7A00" with-btn="1"/>
      <b-card class="col-lg-9"
              title="Offene Tickets noch nicht bearbeitbar: "
      >
        <b-card-body>
          <b-row>
            <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="4" bg-color="rgba(213, 17, 48, .1)" color="#D51130"/>
            <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="4" bg-color="rgba(213, 17, 48, .1)" color="#D51130"/>
            <b-col lg="4">
              <b-row>
                <custom-horizontal-progress :cols="12" color="rgba(0, 196, 177, .3)" bg-color="rgba(0, 196, 177, .1)" :value="70" :max="100" title=" Erstprüfungen" class="mb-2"/>
                <custom-horizontal-progress :cols="12" color="rgba(255, 122, 0, .3)" bg-color="rgba(255, 122, 0, .1)" :value="100" :max="100" title=" Erstprüfungen mit Einsparungen" class="mb-2"/>
                <custom-horizontal-progress :cols="12" color="rgba(213, 17, 48, .3)" bg-color="rgba(213, 17, 48, .1)" :value="95" :max="100" title=" Prozentual" class="mb-2" is-percentage/>
              </b-row>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import TicketCard from '@/views/app/CustomComponents/TicketCard'
import OpenTicketCard from '@/views/app/CustomComponents/OpenTicketCard'
import VueApexCharts from 'vue-apexcharts'
import CustomHorizontalProgress from '@/views/app/CustomComponents/CustomHorizontalProgress'

import {
  BRow, BCard, BCol, BCardBody, BCardSubTitle,
} from 'bootstrap-vue'

export default {
  name: 'BackOffice',
  components: {
    TicketCard,
    OpenTicketCard,
    BRow,
    BCol,
    BCard,
    BCardSubTitle,
    VueApexCharts,
    BCardBody,
    CustomHorizontalProgress,
  },
  data() {
    return {
      pieChart: {
        series: [14, 12, 16, 24],
        chartOptions: {
          legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Montserrat',
          },
          colors: ['#01C3B1', '#F94C96', '#4DAEFF', '#FF902A'],
          dataLabels: {
            enabled: true,
            formatter(val) {
              // eslint-disable-next-line radix
              return `${parseInt(val)}%`
            },
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '2rem',
                    fontFamily: 'Montserrat',
                  },
                  value: {
                    fontSize: '1rem',
                    fontFamily: 'Montserrat',
                    formatter(val) {
                      // eslint-disable-next-line radix
                      return `${parseInt(val)}%`
                    },
                  },
                  total: {
                    show: false,
                    fontSize: '1rem',
                    label: 'Summary',
                    formatter() {
                      return '31%'
                    },
                  },
                },
              },
            },
          },
          labels: ['Tickets Done', 'Open Tickets', 'Faulty Tickets', 'N/A'],
          responsive: [
            {
              breakpoint: 992,
              options: {
                chart: {
                  height: 380,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
            {
              breakpoint: 576,
              options: {
                chart: {
                  height: 320,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        name: {
                          fontSize: '1.5rem',
                        },
                        value: {
                          fontSize: '1rem',
                        },
                        total: {
                          fontSize: '1.5rem',
                        },
                      },
                    },
                  },
                },
                legend: {
                  show: true,
                },
              },
            },
          ],
        },
      },
      ticket_total_assigned: 0,
      ticket_total_closed: 0,
      ticket_total_number: 1,
      ticket_total_opened: 0,
      ticket_total_unassigned: 0,
      loading: false,
    }
  },
  computed: {
    ticketsData() {
      return [{
        color: '#00c4b11a',
        textColor: '#00C4B1',
        number: this.ticket_total_number,
        percents: 0,
        headerText: 'Number of Ticket',
        footerText: 'The we have total number of ticket',
        cols: {
          md: 6,
          xl: 3,
        },
      },
      {
        color: '#ff7a001a',
        textColor: '#FF7A00',
        number: this.ticket_total_opened,
        percents: this.calculPercentage(this.ticket_total_opened),
        headerText: 'Open Ticket',
        footerText: 'Number of open ticket',
        cols: {
          md: 6,
          xl: 3,
        },
      },
      {
        color: '#d511301a',
        textColor: '#D51130',
        number: this.ticket_total_unassigned,
        percents: this.calculPercentage(this.ticket_total_unassigned),
        headerText: 'Unassigned Tickets',
        footerText: 'Number of unassigned ticket',
        cols: {
          md: 6,
          xl: 3,
        },
      },
      {
        color: '#fff',
        textColor: '#000',
        number: this.ticket_total_closed,
        percents: this.calculPercentage(this.ticket_total_closed),
        headerText: 'Closed Tickets',
        footerText: 'Number of closed ticket',
        cols: {
          md: 6,
          xl: 3,
        },
      },
      ]
    },
  },
  mounted() {
    this.getDashboardTicketStatistics()
  },
  methods: {
    async getDashboardTicketStatistics() {
      this.loading = true
      const payload = {
      }
      try {
        const response = await this.$http.get('/statistics/dashboard', {
          params: payload,
        })

        const { data } = response

        this.ticket_total_unassigned = data.ticket_total_unassigned
        this.ticket_total_assigned = data.ticket_total_assigned
        this.ticket_total_number = data.ticket_total_number === 0 ? 1 : data.ticket_total_number
        this.ticket_total_closed = data.ticket_total_closed
        this.ticket_total_opened = data.ticket_total_opened
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    calculPercentage(value) {
      return (value / this.ticket_total_number).toFixed(2)
    },
  },
}
</script>

<style scoped>
.progress { border-radius: unset!important }
.progress .progress-bar:last-child { border-top-right-radius: unset; border-bottom-right-radius: unset!important; }
</style>
