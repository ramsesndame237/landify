<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~maininfos') }}
    </b-col>
    <b-col cols="12" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(emitSubmit)" autocomplete="off">
          <b-col v-for="(field,index) in definition.filter(f=> f.hide!==true && !f.auto && f.hideOnCreate !==true && f.hideOnForm !==true)" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                   :inline="false" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
        </b-form>
      </validation-observer>

    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from "vee-validate";

import {
  BRow, BCol, BForm
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Field from "@/views/app/Generic/Field";
import Table from '@/table'

export default {
  name: 'Step1',
  components: {
    EntityForm, Field, BForm, BRow, BCol, ValidationObserver,
  },
  props: ['disabled', 'context'],
  data() {
    const contractTable = {...Table.contract}
    return {
      entity: {...this.context.contract_main_infos} || {},
      definition: contractTable.fields,
      initialData: {},
      loading: false,
    }
  },

  methods: {

    async emitSubmit(){
      return true
    },
    async validate(){
      return await this.$refs.form.validate().then(success => {
        if (!success){
          throw new Error ('invalid Form')
        }
        else {
          return {...this.entity}
        }
      })
    }
  },
  computed: {
    tableDefinition(){
      return this.$store.getters['table/tableDefinition'](this.table)
    }
  }
}
</script>

<style scoped>

</style>
