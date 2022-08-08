<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_pos') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="pos" :definition="definition" table-definition-key="pos" create :initial-data="initialData" cols="12"
                   ref="form" :disabled="loading"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="pos" :current-page="1" :per-page="100" :with-edit="false" :items="pos" :selectable="false"
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
import Field from '@/views/app/Generic/Field'
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import EntityForm from '@/views/app/Generic/EntityForm'

export default {
  name: 'Step7',
  components: [BRow, BCol, BButton, Field, Table, DataTables, EntityForm],
  data() {
    return {
      fields: [
        { key: 'contract_id' },
        { key: 'area_name' },
        { key: 'pos_id' },
        { key: 'space' },
        { key: 'begin_data' },
        { key: 'end_date' },
      ],
    }
  },
}
</script>

<style scoped>

</style>
