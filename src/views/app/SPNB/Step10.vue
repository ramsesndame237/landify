<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create new Contract Recurring Payment
    </b-col>
    <b-col cols="12" md="6">
      <entity-form ref="form" table="recurringpayment" :definition="definition" table-definition-key="recurringpayment"
                   create :initial-data="initialData" cols="12" :disabled="loading"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          Save
        </b-button>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" :current-page="1" :per-page="100" :with-edit="false"
                  :initial-filter="{contract_id: initialData.contract_id}" :selectable="false" :with-view="false"
                  entity="contract_recurringpayment_rel" entity-list="frontend_3_4_3_3" :fields="fields"/>

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
  components: {
    DataTables, entityForm, Table, BButton, BCol, BRow, Field,
  },
  props: ['context', 'disabled'],
  data() {
    const definition = { ...Table.recurringpayment }
    definition.fields = [
      {
        key: 'contract_id',
        disabled: true,
        type: 'list',
        list: 'contract',
        listLabel: 'contract_name',
        relationEntity: 'contract_recurringpayment_rel'
      },
      { key: 'contract_name', disabled: true },
      ...definition.fields.filter(f => f.key !== 'contract_id'),
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
    // this.definition.fields.find(x => x.key === 'contract_id').disabled = true
  },
  methods: {
    async add() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        this.$refs.form.reset()
        this.$refs.datatable.reload()
        // // create the the relation
        // await this.$api({
        //   entity: 'contract_recurringpayment_rel',
        //   action: 'create',
        //   data: [{
        //     contract_id: this.initialData.contract_id,
        //     recurringpayment_id: entity.recurringpayment_id,
        //   }],
        // })
        // this.recurringpayments.push(entity)
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
