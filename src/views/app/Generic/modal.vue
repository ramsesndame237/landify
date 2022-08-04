<template>
  <!--modal-->
  <b-modal id="generic-modal" ref="modal" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
           :title="$t(forceTitle || title)" size="lg" @ok="handleOk">
    <entity-form ref="form" :table="table" :definition="definition" :table-definition-key="tableDefinitionKey" :initial-data="initialData"
                 :create="create" :is-relation="isRelation" inline :cols="12"/>
    <template v-slot:modal-footer>
      <b-button variant="secondary" :disabled="loading" @click="$refs.modal.hide()">Cancel</b-button>
      <b-button variant="primary" :disabled="loading" @click="handleOk">
        <b-spinner v-if="loading" small/>
        Save
      </b-button>
    </template>
  </b-modal>
</template>

<script>

import EntityForm from "@/views/app/Generic/EntityForm";
import {
  BButton, BSpinner,
} from "bootstrap-vue";

export default {
  name: 'GenericModal',
  components: { EntityForm, BButton, BSpinner },
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    title: String,
    isRelation: Boolean,
  },
  data() {
    return {
      forceTitle: '',
      create: true,
      loading: false,
      initialData: null,
    }
  },
  computed: {},
  methods: {
    openModal(create, data, title) {
      this.initialData = data
      this.forceTitle = title
      this.create = create
      this.$refs.modal.show()
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.loading = true
      this.$refs.form.submit()
        .then(() => {
          this.$refs.modal.hide()
          this.$emit('reload-table')
        })
        .finally(() => this.loading = false)
    },
  },
}
</script>

<style scoped>

</style>
