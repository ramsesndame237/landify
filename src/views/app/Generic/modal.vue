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
  props: ['table', 'definition', 'tableDefinitionKey', 'title'],
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
          .then(({ data }) => {
            this.$refs.modal.hide()
            this.$successToast(data.data.message)
            this.$emit('reload-table')
            // navigate to view page or reload table
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
