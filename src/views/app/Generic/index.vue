<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage"
                        :on-new-element="onNewElement" :total-rows="totalRows"
                        :with-filter="definition.filters && definition.filters.length > 0"
                        :on-delete-elements="()=> $refs.table.deleteSelected()" @filter="$refs.filter.openModal()"/>
      <generic-filter ref="filter" :table="table" :definition="definition" @filter="filter"/>
    </b-card>

    <p v-if="currentReview" class="text-danger h4 mb-1 text-center" v-html="currentReview"></p>

    <b-card>
      <Datatable :key="table" ref="table" link="table-user-edit" :search="search" :entity="table"
                 :entity-list="definition.entity" :default-sort-field="definition.defaultSortField" :per-page="perPage"
                 :current-page="currentPage" :total-rows.sync="totalRows" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey"/>
    </b-card>
    <generic-modal @reload-table="$refs.table.reload()" :table="table" :definition="definition"
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
    return {
      search: '',
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
    }
  },
  computed: {
    table() {
      return this.$route.params.table
    },
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
  watch: {
    table() {
      this.search = ''
      // this.perPage = 10
      this.currentPage = 1
      this.totalRows = 0
    },
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
      else this.$router.push({ name: 'table-form', params: { table: this.table } })
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
