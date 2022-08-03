<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_location') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="location" :definition="definition" table-definition-key="location" create
                   :initial-data="initialData" cols="12"/>
    </b-col>
    <b-col cols="12" md="6">
      <DataTables ref="datatable" :current-page="1" :per-page="100" :with-edit="false" :with-view="false"
                  entity="location" :items="locations" :fields="definition.fields" :selectable="false"/>
      <div class="text-center">
        <b-button size="md" class="mt-2" variant="info" @click="add">
          {{ $t('app.btn.save_add_location') }}
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step3',
  components: {
    DataTables, EntityForm, BRow, BCol, BButton,
  },
  props: ['context'],
  data() {
    return {
      entity: {},
      locations: [],
      definition: JSON.parse(JSON.stringify(Table.location)),
      initialData: { customergroup_id: this.context.customergroup_id },
    }
  },
  mounted() {
    // this.definition.fields.find(f => f.key === 'customergroup_id').disabled = true
    this.$refs.form.loadDefinition()
  },
  methods: {
    async add() {
      const entity = await this.$refs.form.submit()
      this.locations.push(entity)
      return entity
    },
  },
}
</script>

<style scoped>

</style>
