<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :on-new-element="definition.create ===false ? null : onNewElement" :total-rows="totalRows"
                        :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                        :actions="definition.actions" @action="(a)=>$refs.table.onAction(a)"
                        @filter="$refs.filter.openModal()">
        <b-button size="sm" variant="primary" class="mr-1 btn-icon" @click="$refs.filter.openModal()">
          <feather-icon icon="FilterIcon" :badge="filtersApplied" />
        </b-button>
        <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions" class="mr-2"/>
      </table-pagination>
      <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData"
                      @filter="allFilter" @reset="reset" />
    </b-card>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey" :ids="ids" :entity-endpoint="definition.entityEndpoint"/>
    </b-card>
    <generic-modal ref="modal" :fetch-data="false" :cache-key="table+'-'" :table="table"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="$refs.table.reload()"/>
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

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    GenericFilter,
    GenericModal,
    TablePagination,
    Datatable,
    BCard,
  },
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    console.log('initial payload', payload)
    return {
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: payload?.filter,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      table: this.$route.params.table,
      ids: this.$route.params.ids,
      filterOptions: [
        { text: this.$t('header~board~status~all'), value: '' },
        {
          text: this.$t('header~board~status~open'), value: 'opened',
        },
        { text: this.$t('header~board~status~my'), value: 'my_tickets' },
        { text: this.$t('header~board~status~closed'), value: 'closed' },
        {
          text: this.$t('header~board~status~notassigned'),
          value: 'not_assigned',
        },
      ],
      filterValue: 'opened',
      ticket_deadline_status: '',
      user: getUserData(),
      date: { start_date: '', end_date: '' },
      filtersApplied: 0,
      team_id: null,
      user_id: null,
    }
  },
  computed: {
    definition() {
      return Table
    },
    useModalToCreate() {
      return this.definition.createModal !== false
    },
  },
  watch: {
    filterValue: {
      handler() {
        this.allFilter()
      },
      immediate: true,
    },
  },
  mounted() {
    this.setInitData()
  },
  beforeDestroy() {
    this.$store.commit('table/setTableData', {
      table: this.table,
      payload: {
        search: this.search,
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalRows: this.totalRows,
        filter: { ...this.$refs.filter.data },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    allFilter() {
      this.$nextTick(() => {
        this.filter({ ...this.$refs.filter.getFinalData(), status: this.filterValue })
      })
    },
    filter(obj) {
      this.filtersApplied = Object.keys(obj).length
      this.currentPage = 1
      this.$refs.table.filter(obj)
    },
    reset(data) {
      this.initialFilterData = {}
      this.date = { start_date: '', end_date: '' }
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
    setInitData() {
      const getParam = paramName => this.$route.params[paramName] || null

      this.ticket_deadline_status = getParam('ticket_deadline_status')
      this.date.start_date = getParam('start_date')
      this.date.end_date = getParam('end_date')
      this.team_id = getParam('team_id')
      this.user_id = getParam('user_id')
      this.tickets = getParam('tickets')

      const getFilterData = () => ({
        start_date: this.date.start_date,
        end_date: this.date.end_date,
        ticket_deadline_status: this.ticket_deadline_status,
        team_id: this.team_id,
        user_id: this.user_id,
        tickets: this.tickets,
      })

      this.initialFilterData = {
        ...this.initialFilterData,
        ...getFilterData(),
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
