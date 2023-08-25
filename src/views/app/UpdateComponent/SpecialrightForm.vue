<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-col v-for="(field,index) in formFields" :key="index" :cols="cols">
        <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate || field.key === 'specialright_id' || field.key === 'contract_specialright_termination_date'"
               :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
      </b-col>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import {
  BCol, BForm,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'SpecialrightEditForm',
  components: {
    BForm,
    BCol,
    ValidationObserver,
    Field,
  },

  mixins: [FormMixin],

  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },

  },

  async mounted() {
    console.log('mounted')
    this.definition.submit = this.editDeadline
    this.loading = true
    await this.$http.get(`/contracts/deadlines/${this.$route.params.id}`)
      .then(response => {
        if (response.data && response.data.ContractActivatedOption) {
          const contractActivatedOption = response.data.ContractActivatedOption
          this.entity.contract_specialright_automatic_renewal_in_months = contractActivatedOption.contract_specialright_automatic_renewal_in_months
          this.entity.contract_specialright_total_number_options = contractActivatedOption.contract_specialright_total_number_options
        }
      })
      .catch(error => {
        console.error('error', error)
      })
      .finally(() => {
        this.loading = false
      })
    console.log('this.entity: ', this.entity)
  },

  methods: {
    //! SECTION hook up to the update endpoint
    async editDeadline() {
      this.loading = true
      const payload = {
        contract_id: this.$route.params.id,
        Specialrights: [{ ...this.entity }],
      }
      let result
      await this.$http.post('/contracts/deadline/step2', payload)
        .then(response => {
          result = response.data
        })
        .catch(error => {
          throw new Error(error)
        })
        .finally(() => {
          this.loading = false
        })

      console.log('result: ', result)
      return result
    },
  },

}
</script>

<style scoped>

</style>
