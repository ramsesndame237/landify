<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create Contract Area
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_area_unit_usagetype_rel" :definition="definition"
                   table-definition-key="contract_area_unit_usagetype_rel" create :initial-data="initialData" cols="12"
                   ref="form" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="contractAreas" :current-page="1" :per-page="100" :with-edit="false" :items="contractAreas" :selectable="false"
                  :with-view="false" entity="contract_area_unit_usagetype_rel" :fields="fields"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          Save and add POS
        </b-button>
      </div>
      <div class="bg-light mt-2 p-1 text-sm">
        <small>
          {{ $t('app.content.new_busness_text_pos_msg') }}
        </small>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import {
  BRow, BCol, BButton
} from 'bootstrap-vue'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import entityForm from '@/views/app/Generic/EntityForm'

export default {
  name: 'Step7',
  props: ['context', 'disabled'],
  data() {
    const definition = JSON.parse(JSON.stringify(Table.area.relations[0]))
    definition.fields = [
      definition.fields[0],
      { key: 'contract_name', disabled: true },
      {
        key: 'pos_name',
        disabled: true,
        rules: { required: false },
      },
      { key: 'area_id', list: 'area', listLabel: 'area_name', type: 'list' },
      ...definition.fields.slice(1)]
    definition.fields[0].disabled = true
    return {
      definition,
      // initialiser le contract_id
      initialData: {
        contract_id: this.context.contract?.contract_id,
        contract_name: this.context.contract?.contract_name,
      },
      loading: false,
      contractAreas: this.context.contractAreas || [],
    }
  },
  components: { Field, BRow, BCol, DataTables, entityForm, BButton },
  mounted() {
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        this.pos.push(entity)
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
