<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create Contract Area
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_area_unit_usagetype_rel" :definition="definition"
                   table-definition-key="contract_area_unit_usagetype_rel" create :initial-data="initialData" ref="form"
                   cols="12" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="contractAreas" :current-page="1" :per-page="100" :with-edit="false" :items="contractAreas"
                  :selectable="false" :with-view="false" entity="contract_area_unit_usagetype_rel" :fields="fields"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          <b-spinner v-if="loading" small/>
          Save and add Contract Area
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BButton, BSpinner,
} from 'bootstrap-vue'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import entityForm from '@/views/app/Generic/EntityForm'

export default {
  name: 'Step7',
  components: { BRow, BCol, DataTables, entityForm, BButton, BSpinner },
  props: ['context', 'disabled'],
  data() {
    const definition = JSON.parse(JSON.stringify(Table.area.relations.find(x => x.primaryKey === 'contract_id')))
    definition.fields = [
      definition.fields[0],
      { key: 'contract_name', disabled: true },
      { key: 'area_id', list: 'frontend_3_2_1', listLabel: 'area_name', type: 'list', ids: this.context.areas },
      {
        key: 'pos_name',
        disabled: true,
        rules: { required: false },
      },
      ...definition.fields.slice(1)]
    definition.fields[0].disabled = true
    return {
      definition,
      // initialiser le contract_id
      initialData: {
        contract_id: this.context.contract?.contract_id,
        contract_name: this.context.contract?.contract_name,
      },
      fields: [
        { key: 'contract_id' },
        { key: 'area_name' },
        { key: 'pos_id' },
        { key: 'space' },
        { key: 'begin_date' },
        { key: 'end_date' },
      ],
      loading: false,
      contractAreas: this.context.contractAreas || [],
    }
  },
  mounted() {
    this.$refs.form.loadDefinition()
    this.$watch('$refs.form.entity.area_id', function (val) {
      console.log('change area_id', val)
      const idx = this.$refs.form.formFields.findIndex(f => f.key === 'area_id')
      const selectedValue = this.$refs.form.$refs.fields[idx].selectedValue
      this.$set(this.$refs.form.entity, 'pos_name', selectedValue.pos_name)
      console.log(selectedValue, 'value')
    })
  },
  methods: {
    async add() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        this.contractAreas.push(entity)
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
