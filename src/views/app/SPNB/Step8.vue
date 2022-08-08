<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      Create new ontact Criteria
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract_criteria_rel" :definition="definition" table-definition-key="contractcriteria" create :initial-data="{}" cols="12"
                   ref="form" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="pos" :current-page="1" :per-page="100" :with-edit="false" :items="contractcriteria" :selectable="false"
                  :with-view="false" entity="pos" :fields="fields"/>
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
import Table from '@/table'

export default {
  name: 'Step8',
  data() {
    return {
      definition: JSON.parse(JSON.stringify(Table.contract.relations[3])),
      fields: [
        { key: 'criteria_id' },
        { key: 'contract_criteria_valid_from_date' },
        { key: 'contract_criteria_valid_to_date' },
        { key: 'value' },
        { key: 'choice_id' },
      ],
      loading: false,
      contractcriteria: this.context.contractcriteria || [],
    }
  },
  methods: {
    async add() {
    }
  }
}
</script>

<style scoped>

</style>
