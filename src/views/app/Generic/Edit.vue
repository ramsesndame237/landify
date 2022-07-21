<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>{{ $t('edit_' + table) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-if="view" size="sm" variant="info" class="mr-1 d-flex" @click="edit">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              {{ $t('Edit') }}
            </b-button>
            <b-button v-else size="sm" variant="info" class="mr-1 d-flex" @click="update">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              {{ $t('Save') }}
            </b-button>
            <b-button v-if="!view" size="sm" class="d-flex" variant="primary" @click="cancel">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('Cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form autocomplete="off" @submit.prevent="passes(update)">
          <component :is="definition.formComponent" v-if="definition.formComponent" :disabled="view" :entity="entity"
                     :table-definition="tableDefinition"/>
          <b-row v-else>
            <b-col v-for="(field,index) in formFields" :key="index" cols="12" md="6">
              <field :disabled="view" :entity="entity" :table-definition="tableDefinition" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>

    <b-card v-if="entityLoaded && definition.relations && definition.relations.length>0">
      <b-tabs ref="tabs" pills>
        <b-tab v-for="(relation, index) in definition.relations" :key="index" :title="$t(relation.title)"
               :active="index===0" lazy>
          <data-tables :second-key="primaryKey" :second-key-value="entityId" :current-page="currentPage"
                       :per-page="perPage" :total-rows="totalRows" :primary-key-column="relation.primaryKey"
                       :entity="relation.entity" :search="search" :entity-form="relation.entityForm"
                       :fields="relation.fields" :on-edit-element="editElement"/>
          <generic-modal title="Test" :table="relation.entityForm" :definition="relation" is-relation
                         :table-definition-key="relation.entity" @reload-table="reloadRelatedTable"/>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button class="mr-1" size="sm" variant="info" @click="newElement">
              New
            </b-button>
            <b-button class="mr-1" size="sm" variant="primary" @click="deleteSelected">
              Delete
            </b-button>

            <b-input-group size="sm">
              <b-input-group-prepend>
                <b-dropdown v-ripple.400="'rgba(255, 255, 255, 0.15)'" dropup right variant="primary" size="sm"
                            text="Filter">
                  <template #button-content>
                    <feather-icon icon="SearchIcon"/>
                  </template>
                  <b-dropdown-form class="py-1">
                    <b-form-group label="Date" label-for="dropdown-form-email" @submit.stop.prevent>
                      <b-form-input id="dropdown-form-email" size="sm" placeholder="Date"/>
                    </b-form-group>

                    <b-button variant="primary" size="sm">Search</b-button>
                  </b-dropdown-form>
                </b-dropdown>
              </b-input-group-prepend>
              <b-form-input id="filterInput" v-model="search" debounce="500" type="search" placeholder="Search..."/>
            </b-input-group>
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
  BTabs, BRow, BCol, BForm, BFormInput, BButton, BDropdown, BDropdownForm, BFormGroup, BInputGroup, BInputGroupPrepend
} from 'bootstrap-vue'
import Tables from '@/table'
import DataTables from '@/layouts/components/DataTables'
import GenericModal from '@/views/app/Generic/modal'
import Field from './Field'

export default {
  components: {
    GenericModal,
    DataTables,
    BCard,
    BTab,
    BTabs,
    BRow,
    BCol, BDropdown, BDropdownForm, BInputGroup, BInputGroupPrepend,
    BForm, BFormGroup,
    BFormInput,
    BButton,
    Field,
  },
  data() {
    return {
      view: this.$route.query.edit !== 'true',
      entity: this.$route.params.entity || {},
      originalEntity: null,
      search: '',
      currentPage: 1,
      perPage: Number.MAX_SAFE_INTEGER,
      totalRows: 0,
      entityLoaded: false,
    }
  },
  computed: {
    table() {
      return this.$route.params.table
    },
    definition() {
      return Tables[this.table]
    },
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm)
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
    entityId() {
      // convert to string to fix bug on relation tables
      return `${this.$route.params.id}`
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
  },
  async created() {
    if (!this.$route.params.entity) {
      this.entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: this.$route.params.table,
        primaryKey: this.primaryKey,
        id: this.$route.params.id,
      })
    }
    try {
      this.entityLoaded = true
      await this.fillRelations(this.entity)
    } finally {
      console.log('entity', this.entity)
      this.originalEntity = { ...this.entity }
    }
  },
  methods: {
    fillRelations(entity) {
      return Promise.all(this.formFields.filter(field => field.type === 'list').map(field => this.$api({
        entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
        action: 'read-rich',
        filter: {
          [this.primaryKey]: `${this.entity[this.primaryKey]}`,
        },
      })
        .then(({ data }) => {
          this.$set(entity, field.key, data.data.data[0][field.key])
          if (field.with) {
            (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
              this.$set(entity, val, data.data.data[0][val])
            })
          }
        })))
    },
    update() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.$api({
          entity: this.table,
          action: 'update',
          data: [
            this.entity,
          ],
        })
          .then(data => {
            this.$successToast(data.data.data.message)
            this.view = true
            // show success message
          })
          .catch(e => {
            this.$errorToast()
          })
      })
    },
    cancel() {
      this.view = true
      this.entity = { ...this.originalEntity }
    },
    edit() {
      this.view = false
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
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    to.meta.breadcrumb = [
      {
        text: to.params.table,
        to: { name: 'table', params: { table: to.params.table } },
        active: false,
      },
      {
        text: 'Details',
        active: true,
      },
    ]
    next()
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
