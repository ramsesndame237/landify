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
                        :show-input="definition.showInput || true"
                        :import-export-array-item="(definition.relations || []).filter(x => importExportElementArray.includes(x.importEntityName || x.entity)).map(item =>({entity: item.importEntityName || item.entity,primaryKey:item.primaryKey}))"
                        :inline-filter="!definition.inline_filter"
                        :definition="definition"
                        :on-delete-elements="definition.delete !== false ? (()=> $refs.table.deleteSelected()):null"
                        :actions="definition.actions" :filter-badge="getFilterCount()"
                        :on-export-data="fetchExportData" @action="(a)=>$refs.table.onAction(a)"
                        @filter="$refs.filter.openModal()"/>
      <generic-filter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"
                      @filter="filter"/>
    </b-card>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="definition.delete !== false" :with-edit="definition.update !== false"
                 :default-sort-column="initialSortBy||definition.defaultSortField" :default-sort-desc="initialSortDesc"
                 :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"
                 :on-edit-element="definition.inlineEdit ? editElement : null" :fields="definition.fields"
                 :primary-key-column="definition.primaryKey" :ids="ids" :entity-endpoint="definition.entityEndpoint"
                 :no-cache="definition.noCache"
                 :filter-items="definition.filter" :custom-request="definition.customRequest"
                 :initial-filter-data="initialFilterData" :permissions="definition.permissions"/>
      <!--      <DataTable :key="table" :columns="getHeadersDataTable" :url="definition.entityEndpoint || definition.entity"-->
      <!--                 hide-top-bar="true" :resolve-data="data =>data.data.data || data.data || data.items" :custom-actions="definition.custom_actions"-->
      <!--                 :hidde-filter-bar="true"/>-->
    </b-card>
    <generic-modal v-if="definition.useModalGeneric || definition.useModalGeneric === undefined" ref="modal"
                   :fetch-data="false" :cache-key="table+'-'" :table="table" :definition="definition"
                   with-continue :table-definition-key="table" :title="`headline~${table}~new`"
                   @reload-table="$refs.table.reload()"/>
    <SidebarModalComponent ref="sidebarComponent" :title="`headline~${table}~new`" :definition="definition"
                           :options="definition.options || null" :table-definition-key="table" :table="table">
      <div slot="customHeader" class="header-customer mb-3 d-flex align-items-center justify-content-center">
        <span>
          {{ $t(`headline~${table}~new`) }}
        </span>
      </div>
    </SidebarModalComponent>
  </div>
</template>

<script>

import SidebarModalComponent from '@/components/SidebarModalComponent.vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import DataTable from '@/views/app/CustomComponents/DataTable/DataTable.vue'
import GenericModal from '@/views/app/Generic/modal.vue'
import { BCard } from 'bootstrap-vue'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Tables from '../../../table'
import GenericFilter from './Filter.vue'
import InlineFilter from './InlineFilter.vue'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    DataTable,
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
    if (this.isUserExternClient || definition.perPage) {
      defaultPage = definition.perPage
    }
    return {
      search: payload?.search || '',
      importExportElementArray: ['contactperson', 'bankdata', 'kreditornumber', 'tax_rates'],
      perPage: payload?.perPage || defaultPage || 20,
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
    getHeadersDataTable() {
      const columnData = []
      this.definition.fields.filter(x => !x.hideOnTable).forEach(element => {
        const definitionData = {
          id: `${element.key}`,
          key: `${element.key}`,
          component: element.component,
          header: {
            name: this.$t(`attribute.${element.key}`),
          },
        }
        columnData.push(definitionData)
      })

      return columnData
    },
    ...mapGetters('user', ['isUserExternClient']),
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
    getFilterCount() {
      const obj = this.$refs.filter ? this.$refs.filter.getFinalData() : this.initialFilterData
      if (obj == null) return null
      const count = Object.keys(obj).length
      if (count === 0) return null
      return count
    },
    async fetchExportData(name) {
      // const valid = await this.$refs.form.validate()
      // if (!valid) return
      // this.loadingDonwload = true
      // const filter = _(this.data).pick(['customergroup_id', 'company_id', 'pos_id', 'country_id']).omitBy(_.isNil).value()
      // filter.size = 100000
      // // generate the request query string
      // const requestQuery = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
      try {
        const filename = `${name}-Export_${moment().format('DD_MM_YYYY')}.xlsx`
        const masterData = (await this.$http.get(`synchronizations/${name === 'tax_rates' ? 'tax-rate' : name}/export`, {
          responseType: 'blob',
        })).data
        console.log('masterData: ', masterData)
        const link = document.createElement('a')
        link.setAttribute('href', URL.createObjectURL(masterData))
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (err) {
        if (err.code === 'ERR_BAD_REQUEST') {
          let error = (await err.response).data
          error = JSON.parse(await error.text())

          this.$errorToast(error.detail || 'Unknown error')
        } else {
          this.$errorToast('Unknown error')
        }
      } finally {
        this.loadingDonwload = false
      }
    },
    filter(data) {
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    reset() {
      this.filter({})
    },
    editElement(entity) {
      this.$refs.modal.openModal(false, entity, `headline~${this.definition.entityForm || this.definition.entity}~detail`)
    },
    s2ab(s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    },
    onNewElement() {
      console.log('this is the value of the create modal', this.definition.createModal)
      if (this.definition.createModal === 'sidebar') this.$refs.sidebarComponent.openSidebarComponent()
      else if (this.definition.createModal === 'otherPage') {
        this.$router.push({
          name: 'table-form',
          params: { table: this.table },
        })
      } else if (this.useModalToCreate) this.$refs.modal.openModal(true, {})
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
