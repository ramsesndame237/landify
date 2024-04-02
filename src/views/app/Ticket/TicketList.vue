<template>
  <div>
    <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData"
                    :remove-status="true" @filter="allFilter" @reset="reset"/>
    <!--
      `include-in-query` is used here to include filter data
      when changing the state of the dataTable
      eg: when the page change
    -->
    <data-table
      ref="dataTable"
      :url="`/tickets/slims`"
      :columns="cols"
      :default-params="{status:filterValue}"
      :include-in-query="currentFilterData"
      :on-row-click="canOpenTicket ? (row) => row.ticket_id && $router.push(`/app/table/ticket/view/${row.ticket_id}`) : undefined"
      :no-initial-fetch="true"
      :bar-actions="[
        {
          icon: 'FilterIcon',
          onClick: () => $refs.filter.openModal(),
        }
      ]"
    >
      <template #customTabFilter >
        <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
      </template>
    </data-table>
    <generic-modal ref="modal" :fetch-data="false" :cache-key="table+'-'" :table="table" :definition="definition"
                   with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="$refs.table.reload()"/>
  </div>
</template>

<script>

import { getUserData } from '@/auth/utils'
// eslint-disable-next-line import/no-cycle
import Table from '@/table/tables/ticket'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import _ from 'lodash'
import DataTable from '../CustomComponents/DataTable/DataTable.vue'
import TicketNameCol from './widgets/TicketNameCol.vue'

export default {
  components: {
    GenericFilter,
    GenericModal,
    DataTable,
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
          ...data,
          status: 'opened',
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
      currentFilterData: {
        ...(currFilters || {}),
        status: this.filterValue ?? 'opened',
      },
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      table: this.$route.params.table,
      filterOptions: [
        { text: this.$t('header~board~status~all'), value: 'all' },
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
          text: this.$t('Done'),
          value: 'done',
        },
      ],
      filterValue: payload?.filter?.status || 'opened',
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
    canOpenTicket() {
      return this.$isAbleTo('read', this.definition.permissions)
    },
  },
  watch: {
    filterValue() {
      this.allFilter()
    },
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
        sortBy: this.$refs.table?.sortBy,
        sortDesc: this.$refs.table?.sortDesc,
      },
    })
  },
  mounted() {
    this.allFilter()
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
      const _payload = { ...(this.$refs.filter.data || {}), status: this.filterValue, page: 1 }
      const payload = {}
      Object.keys(_payload).forEach(key => {
        if (_payload[key]) {
          payload[key] = _payload[key] === -1 ? undefined : _payload[key]
        }
      })
      const { page, ...rest } = payload
      this.currentFilterData = rest
      this.$refs.dataTable.getData(payload, { ignoreIncludeQuery: true })
    },
    reset() {
      this.initialFilterData = {}
      this.currentFilterData = {}
      this.filterValue = 'opened'
      this.allFilter()
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
