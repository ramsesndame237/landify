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
import FormMixin from "@/views/app/Generic/FormMixin";

export default {
  name: 'GenericModal',
  components: {
    Field,
    BFormInput,
    BSpinner,
    BForm,
    BRow,
    BCol,
    BButton,
  },
  mixins: [FormMixin],
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
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.submit()
        .then(() => {
          this.$refs.modal.hide()
        })
    },
  },
}
</script>

<style scoped>

</style>
