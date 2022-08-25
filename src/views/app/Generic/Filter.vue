<template>
  <!--modal-->
  <b-modal id="filter-modal" ref="modal" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
           title="Filter" :size="vertical?'sm' : 'xl'" @ok="handleOk">
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(handleOk)">
        <b-row>
          <b-col v-for="(field,index) in definition.filters" :key="index" cols="12" :md="vertical?12:4" :lg="vertical?12:3">
            <field ref="fields" :entity="data" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <template v-slot:modal-footer>
      <b-button variant="secondary" @click="$refs.modal.hide()">Cancel</b-button>
      <b-button variant="info" @click="reset">Reset</b-button>
      <b-button variant="primary" @click="handleOk">
        Apply
      </b-button>
    </template>
  </b-modal>
</template>

<script>

import {
  BButton, BCol, BForm, BRow,
} from "bootstrap-vue";
import Field from "@/views/app/Generic/Field";

export default {
  name: 'GenericFilter',
  components: { Field, BButton, BCol, BForm, BRow },
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    initialData: Object,
    vertical: Boolean,
  },
  data() {
    return {
      data: { ...this.initialData },
    }
  },
  computed: {},
  methods: {
    openModal() {
      this.$refs.modal.show()
    },
    reset() {
      this.$refs.form.reset()
      // this.$refs.modal.hide()
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.loading = true
      this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          this.$refs.modal.hide()
          this.$emit('filter', this.data)
        })
    },
  },
}
</script>

<style scoped>

</style>
