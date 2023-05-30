<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~recurringpayment')}}
    </b-col>

    <!-- form -->
    <b-col cols="12" md="6" class="p-0">
      <entity-form
        ref="form"
        table="frontend_3_4_3_3"
        :definition="definition"
        table-definition-key="contract_recurringpayment_rel"
        is-relation
        :disabled="disabled"
        create
        cols="12"
        :fetch-data="false"
      />
      <div class="text-center">
        <b-button type="submit" size="md" class="mt-2" :disabled="loading" variant="info" @click="add">
          <b-spinner v-if="loading" small/>
          Save
        </b-button>
      </div>

    </b-col>

    <!-- data table -->
    <b-col cols="12" md="6">
      <data-tables
        ref="datatable"
        :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
        entity="contract_recurringpayment_rel" :entity-list="definition.entity" :fields="fields" :selectable="false"
        :ids="recurringPaymentIds"
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from "vee-validate";

import {
  BRow, BCol, BForm, BButton
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Field from "@/views/app/Generic/Field";
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import NewContractStepMixin from "./NewContractStepMixin"

export default {
  name: 'Step3',
  components: {
    BForm, BRow, BCol, BButton,
    ValidationObserver, EntityForm, Field,
    DataTables,
  },
  props: ['disabled', 'context'],
  data() {
    const definition = {...Table.recurringpayment}
    definition.submit = (vm) => {
      const data = {
        //contract_id: this.context.contract_main_infos.id,
        contract_id: 180124,
        recurringpayments: [
          {...vm.entity}
        ]
      }
      return vm.$http.post('/contracts/step/2', data)
    }
    const fields = []
    definition.fields.forEach(elt => {
      if(!elt.hideOnIndex) fields.push({key: elt.key})
    });
    return {
      definition,
      fields,
      recurringPaymentIds: this.context.recurringPaymentIds || [],
      loading: false,
      idsName: 'recurringPaymentIds'
    }
  },

  mixins: [NewContractStepMixin]
}
</script>

<style scoped>

</style>
