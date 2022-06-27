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
            <field inline="true" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>

import {
  BFormGroup,
  BFormSelect,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BFormTextarea
} from 'bootstrap-vue'
import Field from "@/views/app/Generic/Field";

export default {
  name: 'GenericModal',
  components: {
    Field,
    BFormInput, BFormGroup, BForm, BFormSelect, BRow, BCol, BFormTextarea
  },
  data() {
    return {
      entity: {},
      forceTitle: '',
      create: true,
    }
  },
  props: ['table', 'definition', 'tableDefinitionKey', 'title'],
  computed: {
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm)
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.tableDefinitionKey)
    },
  },
  methods: {
    openModal(create, data, title) {
      this.entity = data
      this.forceTitle = title
      this.create = create
      this.$refs.modal.show()
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
          .then(() => {
            this.$refs.modal.close()
            // navigate to view page or reload table
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
