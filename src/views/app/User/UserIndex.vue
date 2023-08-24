<template>
<div class="">
  <div class="row">
    <div class="col-12 col-sm-6 col-lg-4">
      <b-card>
        <div class="d-flex justify-content-between">
          <div class="">
            <b-card-text class="h5">Users</b-card-text>
            <b-card-text class="d-flex h2 mt-1 align-items-center justify-content-between">
              <span class="mr-1">19 860</span>
            </b-card-text>
            <b-card-text class="h4">
              Total Users
            </b-card-text>
          </div>
          <div class="">
            <b-avatar variant="info">
              <feather-icon icon="UsersIcon" size="20" />
            </b-avatar>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-12 col-sm-6 col-lg-4">
      <b-card>
        <div class="d-flex justify-content-between">
          <div class="">
            <b-card-text class="h5">Status</b-card-text>
            <b-card-text class="d-flex h2 mt-1 align-items-center justify-content-between">
              <span class="mr-1">19 860</span>
            </b-card-text>
            <b-card-text class="h4">
              Locked Users
            </b-card-text>
          </div>
          <div class="">
            <b-avatar variant="primary">
              <feather-icon icon="UserXIcon" size="20" />
            </b-avatar>
          </div>
        </div>
      </b-card>
    </div>
    <div class="col-12 col-sm-6 col-lg-4">
      <b-card>
        <div class="d-flex justify-content-between">
          <div class="">
            <b-card-text class="h5">Status</b-card-text>
            <b-card-text class="d-flex h2 mt-1 align-items-center justify-content-between">
              <span class="mr-1">19 860</span>
            </b-card-text>
            <b-card-text class="h4">
              Active Users
            </b-card-text>
          </div>
          <div class="">
            <b-avatar variant="success">
              <feather-icon icon="UserCheckIcon" size="20" />
            </b-avatar>
          </div>
        </div>
      </b-card>
    </div>
  </div>
  <b-card title="Search Filter">
    <InlineFilter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                  @filter="filter" :with-actions="false" />
  </b-card>
  <b-card body-class="p-0">
    <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                      :on-new-element="definition.create ===false ? null : onNewElement" :total-rows="totalRows"
                      :with-filter="definition.filters && definition.filters.length > 0"
                      :inline-filter="!definition.inline_filter"
                      :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                      :actions="definition.actions" @action="(a)=>$refs.table.onAction(a)"
                      @filter="$refs.filter.openModal()"/>
  </b-card>
  <b-card>
    <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
               :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
               :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
               :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
               :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
               :primary-key-column="definition.primaryKey" :ids="ids" :entity-endpoint="definition.entityEndpoint"
               :selectable="false"
    />
  </b-card>
  <generic-modal :fetch-data="false" :cache-key="table+'-'" :table="table" ref="modal"
                 :definition="definition" with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                 @reload-table="$refs.table.reload()"/>
</div>
</template>
<script>
import InlineFilter from "@/views/app/Generic/InlineFilter.vue";
import TablePagination from "@/layouts/components/TablePagination.vue";
import GenericModal from '@/views/app/Generic/modal.vue'


const Datatable = () => import('@/layouts/components/DataTables.vue')

export default ({
  name: "UserIndex",
  props: ['definition'],
  components: {
    InlineFilter,Datatable,TablePagination,GenericModal
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
    }
  },
  computed: {
    useModalToCreate() {
      return this.definition.createModal !== false
    },
  },
  methods: {
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.table.filter(data)
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
  }
})
</script>



