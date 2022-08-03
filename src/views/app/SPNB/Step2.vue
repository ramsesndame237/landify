<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_customer') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form ref="form" table="company" :definition="definition" table-definition-key="company" create
                   :initial-data="initialData" cols="12"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import EntityForm from "@/views/app/Generic/EntityForm";
import Table from '@/table'

export default {
  name: 'Step2',
  props: ['context'],
  data() {
    return {
      entity: {},
      definition: JSON.parse(JSON.stringify(Table.company)),
      initialData: { customergroup_id: this.context.customergroup_id },
    }
  },
  components: { EntityForm, BRow, BCol },
  mounted() {
    this.definition.fields.find(f => f.key === 'customergroup_id').disabled = true
    this.$refs.form.loadDefinition()
  },
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
