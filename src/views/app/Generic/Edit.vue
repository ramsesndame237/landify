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
        <b-form @submit.prevent="passes(update)">
          <component :is="definition.formComponent" v-if="definition.formComponent"/>
          <b-row v-else>
            <b-col v-for="(field,index) in formFields" :key="index" cols="12" md="6">
              <field :disabled="view" :entity="entity" :table-definition="tableDefinition" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>

    <b-card v-if="definition.relations && definition.relations.length>0">
      <b-tabs pills>
        <b-tab v-for="(relation, index) in definition.relations" :key="index" :title="$t(relation.title)"
               :active="index===0" lazy>
          <data-tables :second-key="definition.primaryKey" :second-key-value="$route.params.id"
                       :primary-key-column="relation.primaryKey" :entity="relation.entity" :fields="relation.fields"/>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">
              New
            </b-button>
            <b-button class="mr-1" size="sm" variant="primary">
              Delete
            </b-button>
            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">Search</label>
              <b-form-input id="filterInput" type="search" placeholder="rechercher.."/>
            </div>
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
  BTabs, BRow, BCol, BForm, BFormInput, BButton,
} from 'bootstrap-vue'
import Tables from "@/table";
import DataTables from "@/layouts/components/DataTables";
import Field from './Field';


export default {
  components: {
    DataTables,
    BCard,
    BTab,
    BTabs,
    BRow,
    BCol,
    BForm,
    BFormInput,
    BButton,
    Field,
  },
  data() {
    return {
      view: this.$route.query.edit !== 'true',
      perPage: 10,
      pageOptions: [3, 5, 10],
      entity: this.$route.params.entity || {},
      originalEntity: null,
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Last Name', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'email', label: 'eMail', sortable: true },
        { key: 'last_login', label: 'Last login', sortable: true },
        { key: 'user_type', label: 'User type', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        'Action',
      ],
      columnRoles: [
        { key: 'role_id', label: 'Role-ID', sortable: true },
        { key: 'role_name', label: 'Role name', sortable: true },
        { key: 'role_permission', label: 'Role permission', sortable: true },
        { key: 'user_role_valid_from', label: 'Valid From', sortable: true },
        { key: 'user_role_valid_to', label: 'Valid To', sortable: true },
        'Action',
      ],
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
  },
  async created() {
    if (!this.$route.params.entity) {
      this.entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: this.$route.params.table,
        primaryKey: this.definition.primaryKey,
        id: this.$route.params.id,
      })
    }
    this.originalEntity = { ...this.entity }
  },
  methods: {
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
          .then(() => {
            // show success message
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
