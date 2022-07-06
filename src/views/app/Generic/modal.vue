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
            <field :disabled="!create && field.disableOnUpdate" inline="true" :entity="entity"
                   :table-definition="tableDefinition" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>

import {
  BForm,
  BRow,
  BCol,
  BFormInput,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'

export default {
  name: 'GenericModal',
  components: {
    Field,
    BFormInput,
    BForm,
    BRow,
    BCol,
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
      return Promise.all(this.formFields.filter(field => field.type === 'list').map(field => this.$api({
        entity: field.relationEntity ?? (`${this.table}_${field.list}_rel`),
        action: this.create ? 'create' : 'update',
        data: [{
          [field.key]: this.entity[field.key],
          [this.primaryKey]: entityId ?? this.entity[this.primaryKey],
        }],
      })))
    },
    submit() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.$api({
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
