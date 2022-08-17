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
      <component :is="definition.updateComponent || definition.formComponent || 'entity-form'" ref="form" :table="table"
                 :definition="definition" :table-definition-key="table" :create="create" :is-relation="false"
                 :disabled="view" :inline="false" :cols="6" :initial-data="entity" :entity-id="entityId"/>
    </b-card>

    <p v-if="relationsReview" class="text-danger h4 mb-1 text-center" v-html="relationsReview"></p>

    <b-card v-if="definition.relations && definition.relations.length>0 && !create">
      <b-tabs ref="tabs" pills>
        <b-tab v-for="(relation, index) in definition.relations" :key="index" :title="$t(relation.title)"
               :active="index===0" lazy>
          <data-tables :second-key="primaryKey" :second-key-value="entityId" :current-page="currentPage"
                       :per-page="perPage" :total-rows="totalRows" :primary-key-column="relation.primaryKey"
                       :entity="relation.entity" :search="search" :entity-form="relation.entityForm"
                       :entity-view="relation.entityView" :with-view="relation.view!==false" :fields="relation.fields"
                       :on-edit-element="editElement" :with-edit="relation.update!==false"/>
          <generic-modal title="Test" :table="relation.entityForm || relation.entity" :definition="relation" is-relation
                         :table-definition-key="relation.entity" @reload-table="reloadRelatedTable"/>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <component v-if="currentTool" :is="currentTool"/>
            <b-button class="mr-1" size="sm" variant="info" @click="newElement">
              New
            </b-button>
            <b-button class="mr-1" size="sm" variant="primary" @click="deleteSelected">
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
import Tables from '@/table'
import Reviews from '@/table/review'
import DataTables from '@/layouts/components/DataTables'
import GenericModal from '@/views/app/Generic/modal'
import EntityForm from "@/views/app/Generic/EntityForm";

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
  data() {
    return {
      view: this.$route.name === 'table-view' && this.$route.query.edit !== 'true',
      entity: this.$route.params.entity,
      originalEntity: null,
      search: '',
      currentPage: 1,
      perPage: Number.MAX_SAFE_INTEGER,
      totalRows: 0,
      entityLoaded: false,
      create: this.$route.name === 'table-form',
      loading: false,
    }
  },
  computed: {
    title() {
      if (this.create) return 'create_' + this.table
      if (this.view) return 'view_' + this.table
      return 'edit_' + this.table
    },
    table() {
      return this.$route.params.table
    },
    definition() {
      return Tables[this.table]
    },
    formReview() {
      return Reviews[this.table + '_form']
    },
    relationsReview() {
      return Reviews[this.table + '_relations']
    },
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm)
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
    entityId() {
      // convert to string to fix bug on relation tables
      return '' + this.$route.params.id
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
    currentHasFilter() {
      return this.definition.relations[this.$refs.tabs.currentTab]?.filters != null
    },
    currentTool() {
      return this.definition.relations[this.$refs.tabs.currentTab]?.tool
    },
  },
  methods: {
    cancel() {
      if (this.create) this.$router.push({ name: 'table', params: { table: this.table } })
      else {
        this.view = true
        this.$refs.form.reset()
      }
    },
    edit() {
      this.view = false
    },
    update() {
      this.loading = true
      this.$refs.form.submit()
        .then(data => {
          this.view = true
          if (this.create) {
            console.log('data', data)
            this.$router.push({ name: 'table-view', params: { id: data[this.primaryKey] }, query: { edit: true } })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteSelected() {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].deleteSelected()
    },
    newElement() {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[1].openModal(true, { [this.primaryKey]: this.entityId }, `Add ${this.definition.relations[tabs.currentTab].title}`)
    },
    editElement(entity) {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[1].openModal(false, entity, `Update ${this.definition.relations[tabs.currentTab].title}`)
    },
    reloadRelatedTable() {
      const { tabs } = this.$refs
      tabs.tabs[tabs.currentTab].$children[0].reload()
    },
  },

}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
