<template>
  <!--modal-->
  <b-modal id="generic-modal" ref="modal" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
           :title="$t(forceTitle || title)" size="lg" @ok="handleOk">
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(submit)">
        <component :is="definition.createComponent" v-if="definition.createComponent" :entity="entity"
                   :table-definition="tableDefinition"/>
        <b-row v-else>
          <b-col v-for="(field,index) in formFields" :key="index" cols="12">
            <field ref="fields" :disabled="!create && field.disableOnUpdate" inline="true" :entity="entity"
                   :table-definition="tableDefinition" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <template v-slot:modal-footer>
      <b-button variant="secondary" :disabled="loading" @click="$refs.modal.hide()">Cancel</b-button>
      <b-button variant="primary" :disabled="loading" @click="handleOk">
        <b-spinner small v-if="loading"/>
        Save
      </b-button>
    </template>
  </b-modal>
</template>

<script>

import {
  BForm,
  BRow,
  BCol,
  BSpinner,
  BFormInput,
  BButton
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'

export default {
  name: 'GenericModal',
  components: {
    Field,
    BFormInput,
    BSpinner,
    BForm,
    BRow,
    BCol,
    BButton
  },
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    title: String,
    isRelation: Boolean,
  },
  data() {
    return {
      entity: {},
      forceTitle: '',
      create: true,
      loading: false,
    }
  },
  computed: {
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm && (!f.auto || this.create))
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.tableDefinitionKey)
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
  },
  methods: {
    openModal(create, data, title) {
      this.entity = { ...this.definition.default, ...data }
      this.forceTitle = title
      this.create = create
      this.$refs.modal.show()
    },
    saveRelations(entityId) {
      return Promise.all(this.formFields.filter(field => field.type === 'list').map(field => {
        const extras = {}
        if (field.with) {
          (typeof field.with === 'string' ? [field.with] : field.with).forEach(val => {
            extras[val] = this.entity[val]
          })
        }
        return this.$api({
          entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
          action: this.create ? 'create' : 'update',
          data: [{
            [field.key]: this.entity[field.key],
            [this.primaryKey]: entityId ?? this.entity[this.primaryKey],
            ...extras,
          }],
        })
      }))
    },
    createNewEntities() {
      return Promise.all(this.formFields.filter(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        console.log(formField, formField.hasNew)
        return field.type === 'list' && formField.hasNew
      }).map(field => {
        const formField = this.$refs.fields.find(f => f.field === field)
        return this.$api({
          entity: field.list,
          action: 'create',
          data: [formField.subEntity],
        }).then(({ data }) => {
          const id = data.data.data[0][0][field.key]
          this.$set(this.entity, field.key, id)
          return id
        })
      }))
    },
    submit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.loading = true
        this.createNewEntities()
          .then(() => {
            return this.$api({
              entity: this.table,
              action: this.create ? 'create' : 'update',
              data: [
                this.entity,
              ],
            })
              .then(async ({ data }) => {
                try {
                  if (!this.isRelation) {
                    await this.saveRelations(data.data.data[0][0][this.primaryKey])
                  }
                } finally {
                  this.$refs.modal.hide()
                  this.$successToast(data.data.message)
                  this.$emit('reload-table')
                  // navigate to view page or reload table
                }
              })
              .catch(e => {
                console.log(e)
                const title = e.response?.data.detail
                this.$errorToast(title)
              })
          })
          .finally(() => this.loading = false)
      })
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.submit()
    },
  },
}
</script>

<style scoped>

</style>
