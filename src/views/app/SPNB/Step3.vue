<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_location') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form ref="form" table="location" :definition="definition" table-definition-key="location" create
                   :disabled="loading" :initial-data="initialData" cols="12"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
                  entity="location" :entity-list="definition.entity" :fields="fields" :selectable="false" :ids="locations"/>
      <div class="text-center">
        <b-button size="md" class="mt-2" :disabled="loading" variant="info" @click="add">
          <b-spinner v-if="loading" small/>
          {{ $t('app.btn.save_add_location') }}
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BButton, BSpinner,
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step3',
  components: {
    DataTables, EntityForm, BRow, BCol, BButton, BSpinner,
  },
  props: ['context', 'disabled'],
  data() {
    return {
      entity: {},
      locations: this.context.locations || [],
      definition: JSON.parse(JSON.stringify(Table.location)),
      fields: [
        { key: 'location_id' },
        { key: 'location_name' },
        { key: 'city_name' },
        { key: 'locationtype_name' },
      ],
      initialData: {},
      loading: false,
    }
  },
  mounted() {
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      this.loading = true
      const entity = await this.$refs.form.submit()
      this.loading = false
      this.locations.push(entity.location_id)
      this.$refs.datatable.reload()
      return entity
    },
  },
}
</script>

<style scoped>

</style>
