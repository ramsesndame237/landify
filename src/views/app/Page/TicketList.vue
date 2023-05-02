<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :on-new-element="definition.create ===false ? null : onNewElement" :total-rows="totalRows"
                        :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                        :actions="definition.actions" @action="(a)=>$refs.table.onAction(a)"
                        @filter="$refs.filter.openModal()">
        <b-button @click="$refs.filter.openModal()" size="sm" variant="primary" class="mr-1 btn-icon">
          <feather-icon icon="FilterIcon"/>
        </b-button>
        <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions" class="mr-2"/>
      </table-pagination>
      <generic-filter ref="filter" vertical :table="table" :definition="definition" :initial-data="initialFilterData"
                      @filter="allFilter"/>
    </b-card>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey" :ids="ids"/>
    </b-card>
    <generic-modal :fetch-data="false" :cache-key="table+'-'" @reload-table="$refs.table.reload()" :table="table"
                   :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   ref="modal"/>
  </div>
</template>

<script>

import {
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import Tables from '@/table'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import { getUserData } from "@/auth/utils";

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
          text: this.$t('header~board~status~open'), value: 1,
        },
        { text: this.$t('header~board~status~my'), value: 2 },
        { text: this.$t('header~board~status~closed'), value: 3 }, {
          text: this.$t('header~board~status~notassigned'),
          value: 4,
        },
      ],
      filterValue: '',
      user: getUserData(),
    }
  },
  computed: {
    definition() {
      return Tables[this.table]
    },
    useModalToCreate() {
      return this.definition.createModal !== false
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
        filter: { ...this.$refs.filter.data },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    allFilter() {
      let data = {}
      switch (this.filterValue) {
        case 1:
          data = { ticket_closed: 0 }
          break
        case 2:
          data = { user_id: this.user.user_id }
          break
        case 3:
          data = { ticket_closed: 1 }
          break
        case 4:
          data = { user_id: null }
          break
      }
      this.filter({ ...this.$refs.filter.getFinalData(), ...data })
    },
    filter(obj) {
      console.log('on filter', obj)
      this.currentPage = 1
      this.$refs.table.filter(obj)
    },
    reset() {
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
