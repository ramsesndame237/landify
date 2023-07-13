<template>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(submit)" autocomplete="off">
        <b-col :cols="cols" v-for="(field,index) in formFields" :key="index" cols="12">
          <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                  :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-form>
    </validation-observer>
</template>

<script>
import { ValidationObserver } from "vee-validate";

import {
  BRow, BCol, BForm, BButton
} from 'bootstrap-vue'
import Field from "@/views/app/Generic/Field";
import FormMixin from "@/views/app/Generic/FormMixin";
import moment from "moment";


export default {
  name: 'SpecialrightEditForm',
  components: {
    BForm, BRow, BCol, BButton,
    ValidationObserver, Field,
  },

  mixins: [FormMixin],

  async mounted() {
    console.log("mounted");
    this.definition.submit = this.editDeadline
    this.loading = true
    await this.$http.get(`/contracts/deadlines/${this.$route.params.id}`)
      .then(response => {
        if(response.data && response.data.ContractActivatedOption){
          const contractActivatedOption = response.data.ContractActivatedOption
          this.entity.contract_specialright_automatic_renewal_in_months = contractActivatedOption.contract_specialright_automatic_renewal_in_months
          this.entity.contract_specialright_total_number_options = co.ntractActivatedOption.contract_specialright_total_number_options
          this.entity.contract_specialright_is_passive = 0
          this.entity.contract_specialright_is_availed = 0
          this.entity.contract_specialright_date = moment().format("YYYY-MM-DD")
        }
      })
      .catch(error => {
        console.error("error", error);
      })
      .finally(() => {
        this.loading = false
      })
  },

  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    }

  },

  methods: {
    //!SECTION hook up to the update endpoint
    async editDeadline(){
      this.loading = true
      const payload = {
        contract_id: this.$route.params.id,
        Specialrights: [{...this.entity}]
      }
      let result
      await this.$http.post('/contracts/deadline/step2', payload)
        .then(response => {
          result = response.data
        })
        .catch(error => {
          throw new Error(error)
        })
        .finally(()=>{
          this.loading = false
        })

      console.log('result: ', result);
      return result
    },
  }

}
</script>

<style scoped>

</style>
