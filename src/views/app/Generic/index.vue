<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :on-new-element="definition.create ===false ? null : onNewElement" :total-rows="totalRows"
                        :with-filter="definition.filters && definition.filters.length > 0"
                        :on-delete-elements="()=> $refs.table.deleteSelected()" @filter="$refs.filter.openModal()"/>
      <generic-filter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                      @filter="filter"/>
    </b-card>

    <p v-if="currentReview" class="text-danger h4 mb-1 text-center" v-html="currentReview"></p>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :fields="definition.fields" :primary-key-column="definition.primaryKey"/>
    </b-card>
    <generic-modal @reload-table="$refs.table.reload()" :table="table" :definition="definition" with-continue
                   :table-definition-key="table" :title="'create '+table" ref="modal"/>
  </div>
</template>

<script>

import {
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Tables from '../../../table'
import Reviews from '../../../table/review'
import GenericFilter from './Filter.vue'

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
    }
  },
  computed: {
    definition() {
      return Tables[this.table]
    },
    currentReview() {
      return Reviews[this.table]
    },
    useModalToCreate() {
      return this.definition.createModal !== false
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
        filter: { ...this.$refs.filter.data },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    reset() {
      this.filter({})
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
