<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~recurringpayment')}}
    </b-col>

    <b-col cols="12" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(save)" autocomplete="off">
          <b-col v-for="(field,index) in definition" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                   :inline="false" :entity="entity" :field="field" :table-definition="tableDefinition"/>
          </b-col>
        </b-form>
      </validation-observer>

    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from "vee-validate";

import {
  BRow, BCol, BForm, BButton
} from 'bootstrap-vue'
import Field from "@/views/app/Generic/Field";

export default {
  name: 'Step1',
  components: {
    BForm, BRow, BCol, BButton,
    ValidationObserver, Field,
  },
  props: ['disabled', 'context'],
  data() {
    const definition = [
      { key: 'contract_specialright_total_number_options', type: 'number', required: true },
      { key: 'contract_specialright_extensions', type: 'number', required: true },
    ];
    return {
      definition,
      entity: {},
      loading: false,
    }
  },
  methods: {
    async save(){
      this.$refs.form.validate();
      console.log("step1 form submitted");
    }
  },

  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    }
  }

}
</script>

<style scoped>

</style>
