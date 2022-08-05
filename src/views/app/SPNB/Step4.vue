<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_area') }}
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <entity-form table="area" :definition="definition" table-definition-key="area" create :initial-data="{}"
                   cols="12" :disabled="loading" ref="form"/>
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <DataTables entity="area" :fields="fields" :current-page="1" :per-page="100" :with-edit="false"
                  :with-view="false" :selectable="false" :items="areas"/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="mt-2" variant="info" :disabled="loading" @click="add">
          Save and add area
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Field from "@/views/app/Generic/Field";
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step4',
  props: ['context', 'disabled'],
  data() {
    return {
      entity: { customergroup_id: this.context.customergroup_id },
      definition: JSON.parse(JSON.stringify(Table.area)),
      fields: [
        { key: 'location_name' },
        { key: 'area_name' },
        { key: 'area_id' },
        { key: 'area_space_value' },
        { key: 'area_type_name' },
      ],
      loading: false,
      areas: this.context.areas || [],
    }
  },
  components: { DataTables, Field, BRow, BCol, EntityForm, BButton },
  methods: {
    // async validate() {
    //   const entity = await this.$refs.form.submit()
    //   return entity
    // },
    // eslint-disable-next-line no-empty-function
    async add() {
      this.loading = true
      const entity = await this.$refs.form.submit()
      this.loading = false
      this.areas.push(entity)
      return entity
    },
    mounted() {
      this.$refs.form.loadDefinition()
    },
  },
}
</script>

<style scoped>

</style>
