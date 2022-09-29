<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_area') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="area" :definition="definition" table-definition-key="area" create :initial-data="{}" cols="12"
                   :disabled="loading" ref="form"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          <b-spinner v-if="loading" small/>
          Save
        </b-button>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" entity="area" :entity-list="definition.entity" :fields="fields" :current-page="1" :per-page="100"
                  :with-edit="false" :with-view="false" :selectable="false" :ids="areas"/>

    </b-col>
  </b-row>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'
import {
  BRow, BCol, BButton, BSpinner
} from 'bootstrap-vue'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step4',
  props: ['context', 'disabled'],
  data() {
    const definition = JSON.parse(JSON.stringify(Table.area))
    definition.fields.find(f => f.key === 'location_id').ids = this.context.locations
    return {
      entity: { customergroup_id: this.context.customergroup_id },
      definition,
      fields: [
        { key: 'location_name' },
        { key: 'area_name' },
        { key: 'area_id' },
        { key: 'area_space_value' },
        { key: 'areatype_name' },
      ],
      loading: false,
      areas: this.context.areas || [],
    }
  },
  components: { DataTables, Field, BRow, BCol, EntityForm, BButton, BSpinner },
  mounted() {
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        this.areas.push(entity.area_id)
        this.$refs.datatable.reload()
        this.$refs.form.reset()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
