<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create new Contract Recurring Payment
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_recurringpayment_rel" :definition="definition" table-definition-key="contract_recurringpayment_rel" create :initial-data="initialData" cols="12"
                   ref="form" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="recurringpayment" :current-page="1" :per-page="100" :with-edit="false" :items="recurringpayments" :selectable="false"
                  :with-view="false" entity="contract_recurringpayment_rel" :fields="fields"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          Save and add Recurring Payment
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import entityForm from '@/views/app/Generic/EntityForm'
import Field from '@/views/app/Generic/Field'
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'

export default {
  name: 'Step10',
  components: { DataTables, entityForm, Table, BButton, BCol, BRow, Field },
  props: ['context', 'disabled'],
  data() {
    const definition = {
      primaryKey: 'specialright_id',
      entity: 'contract_recurringpayment_rel',
      entityForm: 'contract_recurringpayment_rel',
    }
    definition.fields = [
      { key: 'contract_id', disabled: true },
      { key: 'contract_name', disabled: true },
      { key: 'recurringpayment_id', type: 'list', list: 'recurringpayment', listLabel: 'recurringpayment_description' },
    ]
    return {
      definition,
      initialData: {
        contract_id: this.context.contract?.contract_id,
        contract_name: this.context.contract?.contract_name,
      },
      fields: [
        { key: 'recurringpayment_id' },
        { key: 'recurringpayment_sum_per_month' },
        { key: 'recurringpayment_begin_date' },
        { key: 'recurringpaymenttype_id' },
        { key: 'indexclause_id' },
      ],
      loading: false,
      recurringpayments: this.context.recurringpayments || [],
    }
  },
  mounted() {
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        this.recurringpayments.push(entity)
        console.log(entity)
        return entity
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
