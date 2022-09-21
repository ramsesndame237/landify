<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create new Contact Criteria
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_criteria_rel" :definition="definition" table-definition-key="contract_criteria_rel"
                   create :initial-data="initialData" cols="12" ref="form" :disabled="loading"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          <b-spinner v-if="loading" small/>
          Save
        </b-button>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" :current-page="1" :per-page="100" :with-edit="false"
                  :initial-filter="{contract_id: initialData.contract_id }" :selectable="false" :with-view="false"
                  entity="contract_criteria_rel" entity-list="frontend_3_4_3_4" :fields="fields"/>
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
  name: 'Step8',
  components: { DataTables, entityForm, Table, BButton, BCol, BRow, Field },
  props: ['context', 'disabled'],
  data() {
    const definition = {
      ...Table.criteria.relations.find(x => x.primaryKey === 'contract_id'),
      fieldComponent: () => import('@/views/app/CreateComponent/ContractCriteria'),
    }

    definition.fields = [
      { key: 'contract_id', disabled: true },
      { key: 'contract_name', disabled: true },
      { key: 'criteria_id', type: 'list', list: 'criteria', listLabel: 'criteria_name', composite: true },
      ...definition.fields.slice(2),
    ]
    return {
      definition,
      initialData: {
        contract_id: this.context.contract?.contract_id,
        contract_name: this.context.contract?.contract_name,
      },
      fields: [
        { key: 'criteria_id' },
        { key: 'contract_criteria_valid_from_date' },
        { key: 'contract_criteria_valid_to_date' },
        { key: 'contract_criteria_value' },
        { key: 'choice_name' },
      ],
      loading: false,
      contractcriterias: this.context.contractcriterias || [],
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
        this.$refs.form.reset()
        this.$refs.datatable.reload()
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
