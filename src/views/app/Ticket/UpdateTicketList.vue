<template>
  <div>
    <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData"
                    @filter="allFilter" @reset="reset"/>

    <data-table
      ref="dataTable"
      url="/tickets/slims?status=update_ticket"
      :columns="cols"
      :on-row-click="(row) => row.ticket_id && $router.push(`/app/table/ticket/view/${row.ticket_id}`)"
      :bar-actions="[
        {
          icon: 'FilterIcon',
          onClick: () => $refs.filter.openModal(),
        }
      ]"
    />
<!--    <generic-modal ref="modal" :fetch-data="false" :cache-key="table+'-'" :table="table" :definition="definition"-->
<!--                   with-continue :table-definition-key="table" :title="`headline~${table}~new`"-->
<!--                   @reload-table="$refs.dataTable.fetchFn()"/>-->
  </div>
</template>

<script>

import {
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Table from '@/table/tables/ticket'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import { getUserData } from '@/auth/utils'
import _ from 'lodash'
import DataTable from '../CustomComponents/DataTable/DataTable.vue'
import TicketNameCol from './widgets/TicketNameCol.vue'

const Datatables = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    GenericFilter,
    GenericModal,
    TablePagination,
    Datatables,
    DataTable,
    BCard,
  },
  data() {
    let payload = this.$store.getters['table/tableData'](this.$route.params.table)
    const params = this.$route.params
    // we come from dashboard
    const currFilters = {}
    if (params.dashboardData) {
      const data = params.dashboardData
      payload = {
        filter: {
          start_date: data.start_date,
          end_date: data.end_date,
          ticket_deadline_status: data.ticket_deadline_status,
          team_id: data.team_id,
          user_id: data.user_id,
          status: 'update_ticket',
          tickets: data.tickets,
          company_id: data.company_id,
          customergroup_id: data.customergroup_id,
          ticket_update_type:data.ticket_update_type
        },
      }
      payload.filter = _.omitBy(payload.filter, _.isNil)
      if (typeof payload.filter === 'object') {
        Object.keys(payload.filter).forEach(key => {
          if (payload.filter[key] && payload.filter[key] !== -1) {
            currFilters[key] = payload.filter[key]
          }
        })
      }
    }

    console.log('initial payload', payload)
    return {
      cols: [
        {
          key: 'ticket_name',
          header: {
            name: 'ticket_name',
          },
          props: {
            style: 'min-width: 320px;',
          },
          component: TicketNameCol,
        },
        {
          key: 'ticket_description',
          header: {
            name: 'ticket_description',
          },
        },
        {
          key: 'board_name',
          header: {
            name: 'board_name',
          },
        },
        {
          key: 'column_name',
          header: {
            name: 'column_name',
          },
        },
        {
          key: 'team_name',
          header: {
            name: 'team_name',
          },
        },
      ],
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: payload?.filter,
      currentFilterData: currFilters,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      table: this.$route.params.table,
      filterOptions: [
        { text: this.$t('header~board~status~all'), value: null },
        {
          text: this.$t('header~board~status~open'), value: 'opened',
        },
        { text: this.$t('header~board~status~my'), value: 'my_tickets' },
        { text: this.$t('header~board~status~closed'), value: 'closed' },
        {
          text: this.$t('header~board~status~notassigned'),
          value: 'not_assigned',
        },
        {
          text: this.$t('header~board~status~update~ticket'),
          value: 'update_ticket',
        },
      ],
      filterValue: payload?.filter?.status || null,
      user: getUserData(),
    }
  },
  computed: {
    definition() {
      return Table
    },
    useModalToCreate() {
      return this.definition.createModal === 'modal'
    },
  },
  watch: {
    filterValue: {
      handler() {
        this.allFilter()
      },
    },
  },
  mounted() {
  },
  beforeDestroy() {
    this.$store.commit('table/setTableData', {
      table: this.table,
      payload: {
        search: this.search,
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalRows: this.totalRows,
        filter: { ...this.$refs.filter.getFinalData(), status: this.filterValue },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    getFilterCount() {
      const obj = this.$refs.filter ? this.$refs.filter.getFinalData() : this.initialFilterData
      if (obj == null) return null
      let count = Object.keys(obj).length
      if (obj.start_date) count--
      if (obj.status) count--
      if (count === 0) return null
      return count
    },
    allFilter() {
      const _payload = { ...this.$refs.filter.getFinalData(), status: this.filterValue }
      const payload = {}
      Object.keys(_payload).forEach(key => {
        if (_payload[key] && _payload[key] !== -1) {
          payload[key] = _payload[key]
        }
      })
      this.$refs.dataTable.getData(payload)
      this.currentFilterData = payload
    },
    filter(obj) {
      console.log(obj, 'filter')
      this.currentPage = 1
      // setTimeout(() => {
      //   console.log("this is the refs", this.$refs)
      // }, 500)
    },
    reset() {
      this.initialFilterData = {}
      this.filter({})
    },
    editElement(entity) {
      this.$refs.modal.openModal(false, entity, `headline~${this.definition.entityForm || this.definition.entity}~detail`)
    },
    onNewElement() {
      if (this.useModalToCreate) this.$refs.modal.openModal(true, {})
      else {
        this.$router.push({
          name: 'table-form',
          params: { table: this.table },
        })
      }
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
