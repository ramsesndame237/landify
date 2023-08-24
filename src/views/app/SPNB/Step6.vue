<template>
  <b-row class="">
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_business~title~contract') }}
    </b-col>
    <b-col cols="12" md="6">
      <entity-form ref="form" table="contract" :definition="definition"
                   table-definition-key="contract" :create="initialData.contract_id==null" :initial-data="initialData" cols="12"
                   :disabled="loading" :entity-id="initialData.contract_id"/>
    </b-col>
  </b-row>
</template>

<script>
import Field from '@/views/app/Generic/Field'
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'
import {
  BRow, BCol, BButton,
} from 'bootstrap-vue'

export default {
  name: 'Step6',
  components: {
    Field, BRow, BCol, EntityForm, BButton,
  },
  props: ['context', 'disabled'],
  data() {
    return {
      definition: JSON.parse(JSON.stringify(Table.contract)),
      loading: false,
      initialData: { ...this.context.contract },
    }
  },
  mounted() {
    this.$refs.form.loadDefinition()
  },
  methods: {
    async validate() {
      this.loading = true
      try {
        const entity = await this.$refs.form.submit()
        return entity
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>

</style>
