<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_area') }}
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <entity-form table="area" :definition="definition" table-definition-key="area" create :initial-data="{}"
                   cols="12"/>
    </b-col>
    <b-col cols="12" md="6" class="p-0">
      <DataTables entity="area" :/>
      <div class="d-flex justify-content-center">
        <b-button size="md" class="d-flex align-items-center mt-2" variant="info">
          {{ $t('app.btn.save_add_location') }}
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
  BRow, BCol,
} from 'bootstrap-vue'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'Step4',
  props: ['context', 'disabled'],
  data() {
    return {
      entity: { customergroup_id: this.context.customergroup_id },
      definition: JSON.parse(JSON.stringify(Table.area)),
    }
  },
  components: { DataTables, Field, BRow, BCol, EntityForm },
  methods: {
    async validate() {
      const entity = await this.$refs.form.submit()
      return entity
    },
  },
}
</script>

<style scoped>

</style>
