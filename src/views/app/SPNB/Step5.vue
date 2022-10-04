<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_pos') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="pos" :definition="definition" table-definition-key="pos" create :initial-data="initialData"
                   cols="12" ref="form" :disabled="loading"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          <b-spinner v-if="loading" small/>
          Save
        </b-button>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" :current-page="1" :per-page="100" :with-edit="false" :ids="pos" :selectable="false"
                  :with-view="false" entity="pos" entity-list="frontend_3_1_3_1" :fields="fields"/>

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
  BRow, BCol, BButton, BSpinner
} from 'bootstrap-vue'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'
import entityForm from '@/views/app/Generic/EntityForm'

export default {
  name: 'Step5',
  props: ['context', 'disabled'],
  data() {
    const definition = JSON.parse(JSON.stringify(Table.pos))
    definition.fields = [
      ...definition.fields,
      {
        key: 'tag_id',
        type: 'list',
        list: 'tag',
        listLabel: 'tag_name',
        withNew: true,
      },
      {
        key: 'user_id',
        type: 'list',
        list: 'user',
        listLabel: 'user_email',
        relationEntity: 'user_pos_rel',
        with: ['user_pos_valid_from'],
      },
      {
        key: 'user_pos_valid_from', type: 'date',
      },
      {
        key: 'area_id',
        type: 'list',
        list: 'area',
        listLabel: 'area_name',
        ids: this.context.areas,
        relationEntity: 'area_pos_rel',
      },
    ]
    return {
      definition,
      initialData: { ...this.context.company },
      loading: false,
      pos: this.context.pos || [],
      fields: [
        { key: 'pos_id' },
        { key: 'pos_name' },
        { key: 'area_id' },
        { key: 'area_name' },
        { key: 'tag_name' },
      ],
    }
  },
  components: { Field, BRow, BCol, DataTables, entityForm, BButton, BSpinner },
  mounted() {
    this.definition.fields.find(f => f.key === 'company_id').disabled = true
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      this.loading = true
      this.$refs.form.submit()
        .then(entity => {
          this.pos.push(entity.pos_id)
          this.$refs.datatable.reload()
          this.$refs.form.reset()
        })
        .finally(() => this.loading = false)
    },
  },
}
</script>

<style scoped>

</style>
