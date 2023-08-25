<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~area_unit_usage') }}
    </b-col>

    <!-- form -->
    <b-col cols="12" md="6" class="p-0">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form autocomplete="off" @submit.prevent="passes(save)">
          <b-col v-for="(field,index) in definition" :key="index" cols="12">
            <field ref="fields" :disabled="disabled || field.disabled || field.disableOnUpdate"
                   :inline="false" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
          <div class="text-center">
            <b-button type="submit" size="md" class="mt-2" :disabled="loading" variant="info">
              <b-spinner v-if="loading" small/>
              Save
            </b-button>
          </div>
        </b-form>
      </validation-observer>

    </b-col>

    <!-- data table -->
    <b-col cols="12" md="6">
      <data-tables
        ref="datatable"
        :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
        entity="contract_area_unit_usagetype_rel" :entity-list="definition.entity" :fields="fields" :selectable="false"
        :items="areaUnitUsage" :can-make-delete-call="false"
        @delete-items="DeleleItemsInDataTable"
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import {
  BRow, BCol, BForm, BButton,
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Field from '@/views/app/Generic/Field'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import NewContractStepMixin from './NewContractStepMixin'

export default {
  name: 'Step2',
  components: {
    BForm,
    BRow,
    BCol,
    BButton,
    ValidationObserver,
    EntityForm,
    Field,
    DataTables,
  },

  mixins: [NewContractStepMixin],
  props: ['disabled', 'context'],
  data() {
    const relation = { ...Table.contract }.relations.find(rel => rel.entity === 'frontend_3_4_3_10')
    const definition = relation.fields.filter(f => f.hide !== true && !f.auto && f.hideOnCreate !== true && f.hideOnForm !== true)

    // activate area_id and contract_area_unit_usagetype_valid_from_date fields
    let index = definition.findIndex(f => f.key === 'contract_area_unit_usagetype_valid_from_date')
    definition[index].disableOnUpdate = false
    index = definition.findIndex(f => f.key === 'area_id')
    definition[index].disableOnUpdate = false

    const fields = []
    definition.forEach(elt => {
      fields.push({ key: elt.key })
    })
    return {
      definition,
      entity: { ...relation.default } || {},
      fields,
      areaUnitUsage: this.context.areaUnitUsage || [],
      loading: false,
      entityName: 'areaUnitUsage',
    }
  },

  methods: {
    async submit() {
      const data = {
        // contract_id: this.context.contract_main_infos.id,
        contract_id: 180124,
        areaunitusagetypes: [...this.areaUnitUsage],
      }
      await this.$http.post('/contracts/step/1', data)
    },
  },
}
</script>

<style scoped>

</style>
