<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t(title) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex align-items-center">
            <notes v-if="definition.note" :id="entityId" class="mr-2" :primary-key="primaryKey" :note="definition.note"
                   :note-rel="'note_user_'+table+'_rel'"/>
            <template v-if="view">
              <b-button v-for="(action,i) in definition.actions" :key="i" :disabled="action.loading" size="sm"
                        variant="primary" class="mr-1" @click="onAction(action)">
                <!--        <feather-icon icon="Trash2Icon" class="mr-50"/>-->
                <span>{{ action.text }}</span>
              </b-button>
            </template>
            <template v-if="$can('delete', table)">
              <b-button v-if="view" size="sm" variant="primary" class="mr-1" @click="deleteEntity">
                <feather-icon icon="Trash2Icon" class="mr-50"/>
                {{ $t('button~delete') }}
              </b-button>
            </template>
            <template v-if="definition.update !== false && $can('update', table)">
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

    <b-card class="" :no-body="noBody">
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
                    :definition="definition.relations.find(x => x.entityView === visibleRelations[tabIndex].entityView)"
                    :initial-data="initialFilterData"
                    @filter="filter"/>
    <b-card v-if="definition.relations && formLoaded && visibleRelations.length>0 && !create ">
      <b-tabs ref="tabs" pills>
        <b-tab v-for="(relation, index) in visibleRelations" :key="index"
               :title="$t(relation.title || ('headline~'+(relation.entityView||relation.entityForm)+'~tab'))"
               :active="index===tabIndex" :lazy="relation.lazy!==false">
          <template v-if="relation.component">
            <component :is="relation.component" :relation="relation" :entity-id="entityId"/>
          </template>
          <template v-else>
            <b-card v-if="relation.primaryKey === 'ticket_id'" body-class="p-0">
              <table-pagination :per-page.sync="perPage" :show-input="true" :current-page.sync="currentPage"
                                :entity="table"
                                :with-filter="definition.filters && definition.filters.length > 0"
                                :total-rows.sync="totalRows"
                                :inline-filter="!definition.inline_filter" @filter="$refs.filterEdit.openModal()"/>
            </b-card>
            <data-tables ref="table" :second-key="primaryKey" :second-key-value="entityId" :current-page="currentPage"
                         :per-page="perPage" :total-rows="totalRows" :primary-key-column="relation.primaryKey"
                         :entity="relation.entity" :search="search" :entity-form="relation.entityForm"
                         :entity-view="relation.entityView" :with-view="relation.view!==false" :fields="relation.fields"
                         :on-edit-element="editElement" :with-edit="relation.update!==false"
                         :opacity="relation.primaryKey === 'ticket_id'"
                         :with-delete="relation.delete!==false" :custom-request="relation.customRequest"
                         :filter-items="relation.filter"
                         :entity-endpoint="relation.entityEndpoint"/>
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
            <b-button v-if="currentHasNew() && canCreateCurrent" class="mr-1" size="sm" variant="info"
                      @click="newElement">
              {{ $t('button~new') }}
            </b-button>
            <b-button v-if="currentHasDelete() && canDeleteCurrent" class="mr-1" size="sm" variant="primary"
                      @click="deleteSelected">
              {{ $t('button~delete') }}
            </b-button>
            <b-button v-if="currentHasFilter" size="sm" variant="primary" class="mr-1 btn-icon"
                      @click="$emit('filter')">
              <feather-icon icon="FilterIcon"/>
            </b-button>

            <b-form-input v-if="currentHasSearch()" id="filterInput" v-model="search" debounce="500" type="search"
                          placeholder="Search..."/>
          </div>
        </template>
      </b-tabs>
    </b-card>

    <template v-if="formLoaded && definition.panels && definition.panels.length > 0">
      <template v-for="(panel,idx) in definition.panels">
        <component :is="panel.component" :key="idx" :definition="definition" v-bind="panel.props"/>
      </template>
    </template>
  </div>
</template>

<script>
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
import DataTables from '@/layouts/components/DataTables'
import GenericModal from '@/views/app/Generic/modal'
import EntityForm from '@/views/app/Generic/EntityForm'
import EditPageMixin from '@/views/app/Generic/EditPageMixin'
import Notes from '@/views/app/Generic/Notes'
import InvoiceStats from '@/views/app/CustomComponents/InvoiceStats'
import GenericFilter from '@/views/app/Generic/Filter.vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import Tables from '@/table'

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
    let defaultPage = null
    if (this.isUserExternClient) {
      defaultPage = definition.perPage
    }
    return {
      search: '',
      currentPage: 1,
      perPage: 100_000,
      totalRows: 0,
      formLoaded: false,
      noBody: false,
      showTool: true,
      initialFilterData: payload?.filter,
    }
  },
  computed: {
    currentHasFilter() {
      return this.visibleRelations[this.$refs.tabs?.currentTab]?.filters != null
    },
    canDeleteCurrent() {
      return this.$can('delete', this.visibleRelations[this.$refs.tabs?.currentTab]?.entityForm)
    },
    canCreateCurrent() {
      return this.$can('create', this.visibleRelations[this.$refs.tabs?.currentTab]?.entityForm)
    },
    visibleRelations() {
      return this.definition.relations.filter(r => {
        // console.log('call visible', this.$refs.form)
        if (r.visible && this.formLoaded) {
          if (!r.visible(this)) return false
        }
        return this.$can('read', r.entityForm || r.entityView)
      })
    },
  },
  mounted() {
    this.$watch('$refs.tabs.currentTab', val => {
      if (this.tabIndex !== val) {
        this.tabIndex = val
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: {tab: val},
        })
      }
    })
  },
  methods: {
    removeBody(val = false) {
      return this.noBody = val
    },
    onAction(action) {
      action.onClick(this.$refs.form.entity, this)
    },
    filter(data) {
      console.log("this i sht data", data)
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
    currentHasDelete() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.delete !== false
    },
    currentHasSearch() {
      if (!this.$refs.tabs) return false
      return this.visibleRelations[this.$refs.tabs.currentTab]?.search !== false
    },
    deleteSelected() {
      const {tabs} = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].deleteSelected()
    },
    newElement() {
      const {tabs} = this.$refs
      const route = this.visibleRelations[tabs.currentTab].newRoute
      if (route) {
        this.$router.push({name: route.name, params: {id: this.entityId, table: route.params.table}})
      } else {
        console.log('Ici tabs', {tabs})
        const def = this.definition.relations[tabs.currentTab]
        tabs.tabs[tabs.currentTab].$children[1].openModal(true, {[this.primaryKey]: this.entityId}, `headline~${def.entityForm || def.title}~new`)
      }
    },
    editElement(entity) {
      const {tabs} = this.$refs
      const def = this.definition.relations[tabs.currentTab]
      tabs.tabs[tabs.currentTab].$children[1].openModal(false, entity, `headline~${def.entityForm || def.title}~detail`)
    },
    reloadRelatedTable() {
      const {tabs} = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].reload()
    },
    getCurrentTable() {
      const {tabs} = this.$refs
      return tabs.tabs[tabs.currentTab].$children[0]
    },
  },
}
</script>
