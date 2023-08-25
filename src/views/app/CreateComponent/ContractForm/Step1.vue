<template>
  <b-row>
    <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">
      {{ $t('headline~new_contract~title~maininfos') }}
    </b-col>
    <b-col cols="12" class="p-0">
      <entity-form
        ref="form"
        table="contract"
        :definition="definition"
        table-definition-key="contract"
        :disabled="disabled"
        create
        :initial-data="initialData"
        cols="12"
        :fetch-data="false"
      />
    </b-col>
  </b-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import {
  BRow, BCol, BForm,
} from 'bootstrap-vue'
import EntityForm from '@/views/app/Generic/EntityForm'
import Table from '@/table'

export default {
  name: 'Step1',
  components: {
    EntityForm, BForm, BRow, BCol,
  },
  props: ['disabled', 'context'],
  data() {
    const contractDefinition = { ...Table.contract }
    contractDefinition.submit = vm => {
      const data = { ...vm.entity }
      delete data.customergroup_id
      return vm.$http.post('/contracts/step/0', data).then(() => {
        vm.$successToast('Contract Created')
      })
    }
    return {
      definition: contractDefinition,
      initialData: { ...this.context.contract_main_infos },
      loading: false,
    }
  },
  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.table)
    },
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
