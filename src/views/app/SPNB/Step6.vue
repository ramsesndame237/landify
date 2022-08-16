<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('app.content.create_contract') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form table="contract" :definition="definition" table-definition-key="contract" create
                   :initial-data="initialData" cols="12" ref="form" :disabled="loading"/>
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

export default {
  name: 'Step6',
  props: ['context', 'disabled'],
  data() {
    return {
      definition: JSON.parse(JSON.stringify(Table.contract)),
      loading: false,
      initialData: { ...this.context.contract },
    }
  },
  components: { Field, BRow, BCol, EntityForm, BButton },
  mounted() {
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
