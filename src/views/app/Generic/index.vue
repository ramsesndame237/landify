<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage"
                        :on-new-element="()=> $refs.modal.openModal(true, {})" :total-rows="totalRows"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
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
import Reviews from '../../../table/review.js'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
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
  },
  watch: {
    table() {
      this.search = ''
      // this.perPage = 10
      this.currentPage = 1
      this.totalRows = 0
    },
  },
  methods: {},
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
