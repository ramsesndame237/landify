<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t(title) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
              <feather-icon icon="EditIcon" class="mr-50"/>
              {{ $t('Edit') }}
            </b-button>
            <b-button v-else size="sm" variant="info" class="mr-1" @click="update" :disabled="loading">
              <b-spinner v-if="loading" small class="mr-50"/>
              <feather-icon v-else icon="SaveIcon" class="mr-50"/>
              {{ $t('Save') }}
            </b-button>
            <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
              {{ $t('Cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <p v-if="formReview" class="text-danger h4 mb-1 text-center" v-html="formReview"></p>

    <b-card class="">
      <component
        :is="(create ? definition.createComponent :definition.updateComponent) || definition.formComponent || 'entity-form'"
        ref="form" :table="table" :definition="definition" :table-definition-key="table" :create="create"
        :is-relation="false" :disabled="view" :inline="false" :cols="6" :initial-data="entity" :entity-id="entityId"/>
    </b-card>

    <p v-if="relationsReview" class="text-danger h4 mb-1 text-center" v-html="relationsReview"></p>

    <b-card v-if="definition.relations && visibleRelations.length>0 && !create">
      <b-tabs ref="tabs" pills>
        <b-tab v-for="(relation, index) in visibleRelations" :key="index" :title="$t(relation.title)"
               :active="index===tabIndex" lazy>
          <data-tables :second-key="primaryKey" :second-key-value="entityId" :current-page="currentPage"
                       :per-page="perPage" :total-rows="totalRows" :primary-key-column="relation.primaryKey"
                       :entity="relation.entity" :search="search" :entity-form="relation.entityForm"
                       :entity-view="relation.entityView" :with-view="relation.view!==false" :fields="relation.fields"
                       :on-edit-element="editElement" :with-edit="relation.update!==false"
                       :with-delete="relation.delete!==false"/>
          <generic-modal title="Test" :table="relation.entityForm || relation.entity" :definition="relation" is-relation
                         :table-definition-key="relation.entityForm || relation.entity" with-continue
                         @reload-table="reloadRelatedTable"/>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <component v-if="currentTool()" :is="currentTool()"/>
            <b-button v-if="currentHasNew() && canCreateCurrent" class="mr-1" size="sm" variant="info"
                      @click="newElement">
              New
            </b-button>
            <b-button v-if="currentHasDelete() && canDeleteCurrent" class="mr-1" size="sm" variant="primary"
                      @click="deleteSelected">
              Delete
            </b-button>
            <b-button v-if="currentHasFilter" @click="$emit('filter')" size="sm" variant="primary"
                      class="mr-1 btn-icon">
              <feather-icon icon="FilterIcon"/>
            </b-button>

            <b-form-input id="filterInput" v-model="search" debounce="500" type="search" placeholder="Search..."/>
          </div>
        </template>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTab,
  BTabs,
  BRow,
  BCol,
  BSpinner,
  BFormInput,
  BButton,
  BDropdown,
  BDropdownForm,
  BFormGroup,
  BInputGroup,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import Reviews from '@/table/review'
import DataTables from '@/layouts/components/DataTables'
import GenericModal from '@/views/app/Generic/modal'
import EntityForm from "@/views/app/Generic/EntityForm";
import EditPageMixin from "@/views/app/Generic/EditPageMixin";

export default {
  components: {
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
    return {
      search: '',
      currentPage: 1,
      perPage: Number.MAX_SAFE_INTEGER,
      totalRows: 0,
    }
  },
  computed: {

    formReview() {
      return Reviews[this.table + '_form']
    },
    relationsReview() {
      return Reviews[this.table + '_relations']
    },
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
      return this.definition.relations.filter(r => this.$can('read', r.entityForm))
    }
  },
  mounted() {
    this.$watch('$refs.tabs.currentTab', (val) => {
      if (this.tabIndex !== val) {
        this.tabIndex = val
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          query: { tab: val },
        })
      }
    })
  },
  methods: {
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
        tabs.tabs[tabs.currentTab].$children[1].openModal(true, { [this.primaryKey]: this.entityId }, `Add ${this.definition.relations[tabs.currentTab].title}`)
      }
    },
    editElement(entity) {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[1].openModal(false, entity, `Update ${this.definition.relations[tabs.currentTab].title}`)
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
