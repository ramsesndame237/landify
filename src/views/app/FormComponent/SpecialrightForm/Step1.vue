<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_deadline~title~action')}}
    </b-col>

    <b-col cols="12" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(handleSubmit)" autocomplete="off">
          <b-col v-for="(field,index) in definition" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate || loading"
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
      { key: 'contract_specialright_automatic_renewal_in_months', type: 'number', required: true },
    ];
    return {
      definition,
      entity: {},
      loading: false,
    }
  },

  async mounted(){
    this.loading = true
    await this.$http.get(`/contracts/deadlines/${this.$route.params.id}`)
      .then(response => {
        if(response.data && response.data.ContractActivatedOption)
        this.entity = structuredClone(response.data.ContractActivatedOption)
      })
      .catch(error => {
        console.error("error", error);
      })
      .finally(() => {
        this.loading = false
      })
      console.log('this.entity: ', this.entity);
  },
  methods: {
    async handleSubmit(){
      this.loading = true
      let data
      await this.$refs.form.validate()
        .then(async (success) => {
          if (success) {
            data = await this.save()
          }
        }).catch(error => {
          throw new Error(error)
        })
        .finally(() => {
          this.loading = false
        })
      return data
    },

    async save(){
      const payload = {
        contract_id: this.$route.params.id,
        ...this.entity
      }
      let result
      await this.$http.post('/contracts/deadline/step1', payload)
        .then(response => {
          result = response.data
        })
        .catch(error => {
          throw new Error(error)
        })

      return result
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
