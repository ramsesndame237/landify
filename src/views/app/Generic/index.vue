<template>
  <div>
    <b-card v-if="definition.inline_filter && definition.filters && definition.filters.length > 0" title="Filter">
      <InlineFilter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                    @filter="filter"/>
    </b-card>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :on-new-element="definition.create ===false ? null : onNewElement" :total-rows.sync="totalRows"
                        :with-filter="definition.filters && definition.filters.length > 0"
                        :inline-filter="!definition.inline_filter"
                        :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                        :actions="definition.actions" @action="(a)=>$refs.table.onAction(a)"
                        @filter="$refs.filter.openModal()" :filter-badge="getFilterCount()"/>
      <generic-filter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                      @filter="filter"/>
    </b-card>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey" :ids="ids" :entity-endpoint="definition.entityEndpoint"/>
    </b-card>
    <generic-modal :fetch-data="false" :cache-key="table+'-'" :table="table" ref="modal"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="$refs.table.reload()"/>
    <SidebarModalComponent
      :title="`headline~${table}~new`"
      ref="sidebarComponent"
      :options="definition.options || null"
    />
  </div>
</template>

<script>

import {
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Tables from '../../../table'
import GenericFilter from './Filter.vue'
import InlineFilter from './InlineFilter.vue'
import SidebarModalComponent from "@/components/SidebarModalComponent.vue";

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    SidebarModalComponent,
    GenericFilter,
    GenericModal,
    TablePagination,
    Datatable,
    BCard,
    InlineFilter,
  },
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    const table = this.$route.params.table
    const definition = Tables[table]
    let defaultPage = null
    if (this.$isUserExternClient) {
      defaultPage = definition.perPage
    }
    return {
      search: payload?.search || '',
      perPage: payload?.perPage || defaultPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: payload?.filter,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      table,
      definition,
      ids: this.$route.params.ids,
    }
  },
  computed: {
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
        filter: {...this.$refs.filter.data},
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    getFilterCount() {
      const obj = this.$refs.filter ? this.$refs.filter.getFinalData() : this.initialFilterData
      if (obj == null) return null
      const count = Object.keys(obj).length
      if (count === 0) return null
      return count
    },
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    reset() {
      this.filter({})
    },
    editElement(entity) {
      this.$refs.modal.openModal(false, entity, `headline~${this.definition.entityForm || this.definition.entity}~detail`)
    },
    onNewElement() {
      if (this.useModalToCreate) this.$refs.modal.openModal(true, {})
      if (this.definition.createSideBar) return this.$refs.sidebarComponent.openSidebarComponent()
      else {
        this.$router.push({
          name: 'table-form',
          params: {table: this.table},
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
