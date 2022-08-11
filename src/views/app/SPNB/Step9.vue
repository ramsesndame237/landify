<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create new Special Right
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_specialright_rel" :definition="definition" table-definition-key="contract_specialright_rel" create :initial-data="initialData" cols="12"
                   ref="form" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="contractspecialright" :current-page="1" :per-page="100" :with-edit="false" :items="contractspecialrights" :selectable="false"
                  :with-view="false" entity="contract_specialright_rel" :fields="fields"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          Save and add Special Right
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
  name: 'Step9',
  components: { DataTables, entityForm, Table, BButton, BCol, BRow, Field },
  props: ['context', 'disabled'],
  data() {
    const definition = JSON.parse(JSON.stringify(Table.contract.relations.find(x => x.primaryKey === 'specialright_id')))

    definition.fields = [
      { key: 'contract_id', disabled: true },
      { key: 'contract_name', disabled: true },
      { key: 'specialright_id', type: 'list', list: 'specialright', listLabel: 'specialright_name' },
      ...definition.fields.slice(2),
    ]
    return {
      definition,
      initialData: {
        contract_id: this.context.contract?.contract_id,
        contract_name: this.context.contract?.contract_name,
      },
      fields: [
        { key: 'specialright_id' },
        { key: 'contract_specialright_termination_date' },
        { key: 'contract_specialright_prior_notice_date' },
        { key: 'contract_specialright_is_passive' },
        { key: 'contract_specialright_is_availed' },
      ],
      loading: false,
      contractspecialrights: this.context.contractspecialrights || [],
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
        this.contractspecialrights.push(entity)
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
