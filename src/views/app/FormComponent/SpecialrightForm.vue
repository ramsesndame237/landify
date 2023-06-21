<template>
  <validation-observer  ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field v-if="field" ref="fields" :disabled="loading || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import moment from 'moment'


export default {
  name: "SpecialrightForm",
  mixins: [FormMixin],

  mounted(){
    // const def = {...this.definition}
    const terminationDate = this.entity['contract_specialright_termination_date']
    let index = -1
    if (terminationDate && moment().isSameOrAfter(terminationDate)) {
      // we disable the contract_specialright_is_passive field and set its value to 1 (true)
      index = this.definition.fields.findIndex(field => field.key === 'contract_specialright_is_passive')
      if (index >= 0){
        this.definition.fields[index].disabled = true
        this.$set(this.entity, 'contract_specialright_is_passive', 1)
      }

      // we disable the contract_specialright_is_passive field and set its value to 1 (true)
      index = this.definition.fields.findIndex(field => field.key === 'contract_specialright_is_availed')
      if (index >= 0){
        this.definition.fields[index].disabled = true
        this.$set(this.entity, 'contract_specialright_is_availed', 1)
      }
    }else {
      // we enable the contract_specialright_is_passive field
      index = this.definition.fields.findIndex(field => field.key === 'contract_specialright_is_passive')
      if (index >= 0){
        this.definition.fields[index].disabled = false
      }

      // we enable the contract_specialright_is_passive field
      index = this.definition.fields.findIndex(field => field.key === 'contract_specialright_is_availed')
      if (index >= 0){
        this.definition.fields[index].disabled = false
      }
    }

  }

}

</script>

<style scoped>

</style>
