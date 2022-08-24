<template>
  <div class="">
    <b-row>
      <ticket-card color="rgba(0, 196, 177, .1)" textColor="#00C4B1" number="26" percents="-12" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="rgba(255, 122, 0, .1)" textColor="#FF7A00" number="08" percents="45" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="rgba(213, 17, 48, .1)" textColor="#D51130" number="03" percents="30" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
      <ticket-card color="#fff" textColor="#000" number="05" percents="09" headerText="Tickets mit Zuordnung" footerText="Lorem ipsum dolor ame lorem wiudh wk." cols="3"></ticket-card>
    </b-row>
    <b-row class="mt-3">
      <open-ticket-card cols="3" number="26" hours="200" title="Offene Tickets bearbeitbar"></open-ticket-card>
      <open-ticket-card cols="3" number="08" hours="650" title="Offene Tickets noch nicht bearbeitbar"></open-ticket-card>
      <b-card class="col-lg-6"
        title="Ticket analysis"
      >
        <b-card-subtitle>Hover over the Circular Graph and Get Information.</b-card-subtitle>
        <b-card-body>
          <vue-apex-charts
            type="donut"
            height="350"
            :series="donutChart.series"
            :options="donutChart.chartOptions"
          />
        </b-card-body>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import TicketCard from '@/views/app/CustomComponents/TicketCard'
import OpenTicketCard from '@/views/app/CustomComponents/OpenTicketCard'
import VueApexCharts from 'vue-apexcharts'

import { BRow, BCard, BCol, BIcon, BDropdown, BDropdownItem, BCardBody, BCardSubTitle } from 'bootstrap-vue'
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
                    fontSize: '1.5rem',
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

</style>
