<template>
  <div>
    <generic-modal cache-key="contradictionpoint-" is-relation @reload-table="$refs.table.reload()" :table="table"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   ref="modal"/>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage"
                        :on-new-element="onNewElement" :total-rows="totalRows"
                        :on-delete-elements="()=> $refs.table.deleteSelected()" @filter="$refs.filter.openModal()"/>
    </b-card>
    <b-card>
      <DataTables ref="table" :search="search" entity="contradictionpoint"
                  entity-list="contradiction_contradictionpoint_grp" second-key="contradiction_id"
                  :second-key-value="$route.params.id" :default-sort-desc="initialSortDesc" :per-page="perPage"
                  :current-page="currentPage" :total-rows.sync="totalRows" :fields="contradictionpointDefinition.fields"
                  :primary-key-column="contradictionpointDefinition.primaryKey"/>
      <div class="text-center">
        <b-button variant="primary" @click="generatePoints">
          <b-spinner small v-if="loading"/>
          Generate contradiction points automatically
        </b-button>
        <b-button variant="primary" class="ml-1" @click="$emit('go-to-reductions')">Edit reduction amounts</b-button>
        <b-button variant="primary" class="ml-1"
                  @click="$refs.modal.openModal(true, { contradiction_id: $route.params.id })">Add contradiction points
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import DataTables from "@/layouts/components/DataTables";
import TablePagination from "@/layouts/components/TablePagination";
import Table from '@/table'
import { BCard, BButton } from "bootstrap-vue";
import GenericModal from "@/views/app/Generic/modal";

export default {
  name: 'ContradictionPoint',
  components: { GenericModal, TablePagination, DataTables, BCard, BButton },
  data() {
    return {
      search: '',
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      initialFilterData: {},
      initialSortBy: '',
      initialSortDesc: false,
      definition: {
        primaryKey: 'contradictionpoint_id',
        fields: [
          { key: 'contradictionpoint_id', type: 'list', list: 'contradictionpoint', alwaysNew: true, onlyForm: true },
        ],
      },
      contradictionpointDefinition: Table.contradictionpoint,
      table: 'contradiction_contradictionpoint_rel',
      loading: false,
    }
  },
  methods: {
    onNewElement() {
      this.$refs.modal.openModal(true)
    },
    generatePoints() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
  },
}
</script>

<style scoped>

</style>
