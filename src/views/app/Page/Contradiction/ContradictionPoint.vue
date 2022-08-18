<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage"
                        :on-new-element="onNewElement" :total-rows="totalRows"
                        :on-delete-elements="()=> $refs.table.deleteSelected()" @filter="$refs.filter.openModal()"/>
    </b-card>
    <b-card>
      <DataTables ref="table" :search="search" entity="contradictionpoint" :entity-list="definition.entity"
                  :default-sort-desc="initialSortDesc" :per-page="perPage" :current-page="currentPage"
                  :total-rows.sync="totalRows" :fields="definition.fields" :primary-key-column="definition.primaryKey"/>
      <div class="text-center">
        <b-button variant="primary">Generate contradiction points automatically</b-button>
        <b-button variant="primary" class="ml-1">Edit reduction amounts</b-button>
        <b-button variant="primary" class="ml-1">Add contradiction points</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import DataTables from "@/layouts/components/DataTables";
import TablePagination from "@/layouts/components/TablePagination";
import Table from '@/table'
import {BCard, BButton} from "bootstrap-vue";

export default {
  name: 'ContradictionPoint',
  components: { TablePagination, DataTables, BCard, BButton },
  data() {
    return {
      search: '',
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      initialFilterData: {},
      initialSortBy: '',
      initialSortDesc: false,
      definition: Table.contradictionpoint,
    }
  },
  methods: {
    onNewElement() {
    }
  }
}
</script>

<style scoped>

</style>
