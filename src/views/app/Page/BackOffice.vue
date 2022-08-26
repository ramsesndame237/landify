<template>
  <div class="">
    <b-row>
      <ticket-card color="rgba(0, 196, 177, .1)" textColor="#00C4B1" number="26" percents="-12" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="rgba(255, 122, 0, .1)" textColor="#FF7A00" number="08" percents="45" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="rgba(213, 17, 48, .1)" textColor="#D51130" number="03" percents="30" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="#fff" textColor="#000" number="05" percents="09" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
    </b-row>
    <b-row class="mt-3" align-v="stretch">
      <open-ticket-card cols="3" number="26" hours="200" title="Offene Tickets bearbeitbar" bgColor="rgba(0, 196, 177, .1)" color="#00C4B1" withBtn=1></open-ticket-card>
      <open-ticket-card cols="3" number="08" hours="650" title="Offene Tickets noch nicht bearbeitbar" bgColor="rgba(0, 196, 177, .1)" color="#00C4B1" withBtn=1></open-ticket-card>
      <b-card class="col-lg-6"
        title="Ticket analysis"
      >
        <b-card-sub-title>Hover over the Circular Graph and Get Information.</b-card-sub-title>
        <b-card-body>
          <b-row>
            <b-col lg="6">
              <vue-apex-charts
                  type="donut"
                  height="300"
                  :series="donutChart.series"
                  :options="donutChart.chartOptions"
              />
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-row>
    <b-row>
      <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="3" bgColor="rgba(255, 122, 0, .1)" color="#FF7A00" withBtn=1></open-ticket-card>
      <b-card class="col-lg-9"
        title="Offene Tickets noch nicht bearbeitbar: "
      >
        <b-card-body>
          <b-row>
            <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="4" bgColor="rgba(213, 17, 48, .1)" color="#D51130"></open-ticket-card>
            <open-ticket-card title="Offene Tickets bearbeitbar" number="26" hours="200" cols="4" bgColor="rgba(213, 17, 48, .1)" color="#D51130"></open-ticket-card>
            <b-col lg="4">
              <b-row>
                <custom-horizontal-progress :cols="12" color="rgba(0, 196, 177, .3)" bgColor="rgba(0, 196, 177, .1)" :value="70" :max="100" title=" Erstprüfungen" class="mb-2"></custom-horizontal-progress>
                <custom-horizontal-progress :cols="12" color="rgba(255, 122, 0, .3)" bgColor="rgba(255, 122, 0, .1)" :value="100" :max="100" title=" Erstprüfungen mit Einsparungen" class="mb-2"></custom-horizontal-progress>
                <custom-horizontal-progress :cols="12" color="rgba(213, 17, 48, .3)" bgColor="rgba(213, 17, 48, .1)" :value="95" :max="100" title=" Prozentual" class="mb-2" is-percentage></custom-horizontal-progress>
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

import { BRow, BCard, BCol, BIcon, BDropdown, BDropdownItem, BCardBody, BCardSubTitle, BProgress } from 'bootstrap-vue'
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
    CustomHorizontalProgress
  },
  data() {
    return {
      donutChart: {
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
                    show: true,
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
    }
  },
}
</script>

<style scoped>
  .progress { border-radius: unset!important }
  .progress .progress-bar:last-child { border-top-right-radius: unset; border-bottom-right-radius: unset!important; }
</style>
