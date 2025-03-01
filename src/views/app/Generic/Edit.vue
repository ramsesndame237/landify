<template>
  <div>
    <b-card v-if="$isAbleTo('seeHeader', definition.permissions)" body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t(title) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex align-items-center">
            <notes v-if="definition.note && $isAbleTo('note', definition.permissions)" :id="entityId" class="mr-2" :primary-key="primaryKey" :note="definition.note"
                   :note-rel="'note_user_'+table+'_rel'"/>
            <template v-if="view">
              <b-button v-for="(action,i) in definition.actions" :key="i" :disabled="action.loading" size="sm"
                        variant="primary" class="mr-1" @click="onAction(action)">
                <!--        <feather-icon icon="Trash2Icon" class="mr-50"/>-->
                <span>{{ action.text }}</span>
              </b-button>
            </template>
            <template v-if="$isAbleTo('remove', definition.permissions)">
              <b-button v-if="view" size="sm" variant="primary" class="mr-1" @click="deleteEntity">
                <feather-icon icon="Trash2Icon" class="mr-50"/>
                {{ $t('button~delete') }}
              </b-button>
            </template>
            <template v-if="definition.update !== false && $isAbleTo('update', definition.permissions)">
              <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
                <feather-icon icon="EditIcon" class="mr-50"/>
                {{ $t('button~edit') }}
              </b-button>
              <b-button v-else size="sm" variant="info" class="mr-1" :disabled="loading" @click="update">
                <b-spinner v-if="loading" small class="mr-50"/>
                <feather-icon v-else icon="SaveIcon" class="mr-50"/>
                {{ $t('button~save') }}
              </b-button>
            </template>
            <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
              {{ $t('button~cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="container-card" :no-body="noBody">
      <component
        :is="(create ? definition.createComponent :definition.updateComponent) || definition.formComponent || 'entity-form'"
        ref="form" :table="table" :definition="definition" :table-definition-key="table" :create="create"
        :is-relation="false" :disabled="view" :inline="false" :cols="6" :initial-data="entity" :entity-id="entityId"
        @loaded="formLoaded=true"/>
    </b-card>

    <template v-if="table==='invoice' && $refs.tabs">
      <invoice-stats/>
    </template>
    <generic-filter ref="filterEdit" :table="table"
                    :definition="definition.relations && definition.relations.find(element=> (element.entityView === 'ticket'))"
                    :initial-data="initialFilterData"
                    :is-loading-data="isLoading"
                    @filter="filterDataSearch"/>
    <b-card v-if="definition.relations && formLoaded && visibleRelations.length>0 && !create ">
      <b-tabs ref="tabs" v-model="tabIndex" card>
        <b-tab v-for="(relation, index) in visibleRelations" :key="index"
               :title="$t(relation.title || ('headline~'+(relation.entityView||relation.entityForm)+'~tab'))"
               :lazy="relation.lazy!==false" :active="index===tabIndex" :title-item-class="[index === tabIndex ? 'activeTab': '']">
          <template v-if="relation.component">
            <component :is="relation.component" :relation="relation" :entity-id="entityId"/>
          </template>
          <template v-else>
            <b-card v-if="relation.primaryKey === 'ticket_id'" body-class="p-0">
              <table-pagination :per-page.sync="perPage" :show-input="false" :current-page.sync="currentPage"
                                :entity="table"
                                :show-for-childreen="visibleRelations[tabIndex].entity === 'tax_rates' || false"
                                :with-filter="definition.filters && definition.filters.length > 0"
                                :total-rows.sync="totalRows"
                                :inline-filter="!definition.inline_filter" @filter="$refs.filterEdit.openModal()"/>
            </b-card>
            <data-tables ref="table" :second-key="primaryKey" :second-key-value="entityId" :current-page="currentPage"
                         :per-page="perPage" :total-rows="totalRows" :primary-key-column="relation.primaryKey"
                         :entity="relation.entity" :search="search" :entity-form="relation.entityForm"
                         :entity-view="relation.entityView" :with-view="relation.view!==false" :fields="relation.fields"
                         :on-edit-element="editElement" :with-edit="relation.update!==false" :can-make-delete-call="!(relation.entityView === 'partnercompany')"
                         :opacity="relation.primaryKey === 'ticket_id'"
                         :items="itemsData" :with-delete="relation.delete!==false"
                         :custom-request="relation.customRequest" :entity-endpoint="relation.entityEndpoint"
                         :on-view-element="relation.onViewElement" :is-loading-data="isLoadingDataFetch"
                         :permissions="relation.permissions" @delete-items="deleteAction"/>
            <generic-modal :cache-key="relation.entity+'-'" title="Test" :table="relation.entityForm || relation.entity"
                           :definition="relation" is-relation
                           :table-definition-key="relation.entityForm || relation.entity"
                           :with-continue="relation.withContinue" @reload-table="reloadRelatedTable"/>
            <template v-if="relation.primaryKey === 'specialright_id'">
              <b-card-text class="text-right">
                <b-button variant="primary">
                  viewed all Options
                </b-button>
              </b-card-text>
            </template>
          </template>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <component :is="currentTool()" v-if="currentTool() && showTool"/>
            <b-button v-if="currentRelation.entityView === 'partnercompany' || currentRelation.entity === 'contractaction' ? currentRelation.create : (currentRelation && canCreateCurrent)" class="mr-1" size="sm" variant="info"
                      @click="newElement">
              {{ $t('button~new') }}
            </b-button>
            <b-button v-if="currentRelation.entityView === 'partnercompany' ? currentRelation.delete : (currentRelation && canDeleteCurrent)" class="mr-1" size="sm" variant="primary"
                      @click="deleteSelected">
              {{ $t('button~delete') }}
            </b-button>
            <b-button v-if="currentHasFilter" size="sm" variant="primary" class="mr-1 btn-icon"
                      @click="$emit('filter')">
              <feather-icon icon="FilterIcon"/>
            </b-button>
            <b-dropdown v-if="canImportOrExport.includes(visibleRelations[tabIndex].importEntityName || visibleRelations[tabIndex].entity)" size="lg" variant="link"
                        toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-button id="popover-button-variant" size="sm" variant="success" class="mr-1 btn-icon">

                  <span>
                    Ex-/Import
                  </span>
                </b-button>
              </template>
              <b-dropdown-item @click="fetchExportData(visibleRelations[tabIndex].entity === 'tax_rates' ? 'tax-rate' : (visibleRelations[tabIndex].importEntityName || visibleRelations[tabIndex].entity),{name:definition.primaryKey,value:$route.params.id})">
                <FeatherIcon icon="ArrowUpIcon" />

                {{ $t('translate~key~export') }}
              </b-dropdown-item>
              <b-dropdown-item @click="()=>$router.push({name:'importView',query: isFunction(visibleRelations[tabIndex].importQueryParams) ? callFunctionWithThis(visibleRelations[tabIndex].importQueryParams) : visibleRelations[tabIndex].importQueryParams, params:{name: visibleRelations[tabIndex].importEntityName || visibleRelations[tabIndex].entity}})">

                <FeatherIcon icon="ArrowDownIcon" />
                {{ $t('translate~key~import') }}
              </b-dropdown-item>
            </b-dropdown>

            <b-form-input v-if="currentHasSearch()" id="filterInput" v-model="search" debounce="500" type="search"
                          placeholder="Search..."/>
          </div>
        </template>
      </b-tabs>
    </b-card>

    <template v-if="formLoaded && definition.panels && definition.panels.length > 0">
      <template v-for="(panel,idx) in definition.panels">
        <component :is="panel.component" v-if="$isAbleTo('read', panel.permissions)" :key="idx" :definition="definition" v-bind="panel.props"/>
      </template>
    </template>
  </div>
</template>

<script>
import DataTables from '@/layouts/components/DataTables'
import TablePagination from '@/layouts/components/TablePagination.vue'
import Tables from '@/table'
import InvoiceStats from '@/views/app/CustomComponents/InvoiceStats'
import EditPageMixin from '@/views/app/Generic/EditPageMixin'
import EntityForm from '@/views/app/Generic/EntityForm'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import Notes from '@/views/app/Generic/Notes'
import GenericModal from '@/views/app/Generic/modal'
import {
  BButton,
  BCard,
  BCol,
  BDropdown,
  BDropdownForm,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BRow,
  BSpinner,
  BTab,
  BTabs,
} from 'bootstrap-vue'

export default {
  components: {
    TablePagination,
    GenericFilter,
    InvoiceStats,
    Notes,
    EntityForm,
    GenericModal,
    DataTables,
    BCard,
    BTab,
    BTabs,
    BRow,
    BCol,
    BDropdown,
    BDropdownForm,
    BInputGroup,
    BInputGroupPrepend,
    BFormGroup,
    BFormInput,
    BButton,
    BSpinner,
  },
  mixins: [EditPageMixin],
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    const table = this.$route.params.table
    const definition = Tables[table]
    if (!definition.relations) {
      definition.relations = []
    }
    let defaultPage = null
    if (this.isUserExternClient) {
      defaultPage = definition.perPage
    }
    return {
      search: '',
      currentPage: 1,
      perPage: 100_000,
      isLoading: true,
      isLoadingDataFetch: false,
      itemsData: [],
      canImportOrExport:['tax_rates','bankdata','kreditornumber', 'contactperson'],
      totalRows: 0,
      formLoaded: false,
      noBody: false,
      showTool: true,
      tabIndex: 0,
      initialFilterData: payload?.filter,
      relationEntity: null,
    }
  },
  computed: {
    currentRelation() {
      return this.visibleRelations[this.tabIndex]
    },
    currentHasFilter() {
      return this.visibleRelations[this.$refs.tabs?.currentTab]?.filters != null
    },
    canDeleteCurrent() {
      return this.$isAbleTo('remove', this.currentRelation.permissions)
    },
    canCreateCurrent() {
      return this.$isAbleTo('create', this.currentRelation.permissions)
    },
    visibleRelations() {
      return (this.definition.relations ?? []).filter(r => {
        // console.log('call visible', this.$refs.form)
        if (r.visible && this.formLoaded) {
          if (!r.visible(this)) return false
        }
        // return this.$can('read', r.entityForm || r.entityView)
        return this.$isAbleTo('list', r.permissions)
      })
    },
  },
  watch: {
    tabIndex(newValue) {
      this.itemsData = []
      this.filterDataSearch()
    },
  },

  mounted() {
    this.$watch('$refs.tabs.currentTab', val => {
      if (this.tabIndex !== val) {
        this.tabIndex = val
        this.relationEntity = (this.definition.relations ?? []).find(element => element.entityView === this.visibleRelations[val].entityView)
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: { tab: val },
        })
      }
    })
    this.filterDataSearch()
  },
  methods: {
    callFunctionWithThis(func) {
      return func(this)
    },
    isFunction(func) {
      return func instanceof Function
    },
    removeBody(val = false) {
      return this.noBody = val
    },
    filterDataSearch(data) {
      data = {
        ...(this.table === 'pos' ? { pos_id: this.$route.params.id } : {}),
        ...(data || {}),
        keyword: this.search,
        page: this.currentPage,
        size: this.perPage,
        per_page: this.perPage === 0 ? 25 : this.perPage,
        order_filed: this.sortBy,
        order: this.sortDesc ? 'desc' : 'asc',
      }
      if (!this.visibleRelations[this.tabIndex]?.entityEndpoint || typeof this.visibleRelations[this.tabIndex]?.entityEndpoint === 'function') {
        this.itemsData = undefined
        return
      }
      this.isLoadingDataFetch = true
      const url = this.visibleRelations[this.tabIndex]?.entityEndpoint || this.visibleRelations[this.tabIndex]?.entityForm || this.visibleRelations[this.tabIndex]?.entity
      for (const element in data) {
        if (data[element] === -1) {
          delete data[element]
        }
      }

      this.$http.get(url, {
        params: { ...data },
      }).then(response => {
        this.itemsData = response.data.data
      }).catch(error => console.error(error)).finally(() => this.isLoadingDataFetch = false)
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    onAction(action) {
      action.onClick(this.$refs.form.entity, this)
    },
    filter(data) {
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    currentTool() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.tool
    },
    currentHasNew() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.create !== false
    },
    deleteAction(items) {
      console.log(items[0].location_partnercompany_partnertype_uuid)
      console.log('this is the data ', this.currentRelation)
      if (this.currentRelation.entityView === 'partnercompany') {
        this.$http.delete(`locations/${items[0].location_partnercompany_partnertype_uuid}/partnercompany`).then(response => {
          this.reloadRelatedTable()
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    currentHasDelete() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.delete !== false
    },
    currentHasSearch() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.search !== false
    },
    deleteSelected() {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].deleteSelected()
    },
    newElement() {
      const { tabs } = this.$refs
      const route = this.visibleRelations[tabs.currentTab].newRoute
      if (route) {
        this.$router.push({ name: route.name, params: { id: this.entityId, table: route.params.table } })
      } else {
        console.log('Ici tabs', { tabs })
        const def = (this.definition.relations || [])[tabs.currentTab]
        tabs.tabs[tabs.currentTab].$children[1].openModal(true, { [this.primaryKey]: this.entityId }, `headline~${def.entityForm || def.title}~new`)
      }
    },
    editElement(entity) {
      const { tabs } = this.$refs
      const def = (this.definition.relations || [])[tabs.currentTab]
      tabs.tabs[tabs.currentTab].$children[1].openModal(false, entity, `headline~${def.entityForm || def.title}~detail`)
    },
    reloadRelatedTable() {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].reload()
    },
    getCurrentTable() {
      const { tabs } = this.$refs
      return tabs.tabs[tabs.currentTab].$children[0]
    },
  },
}
</script>
