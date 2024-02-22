<script>
import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'RecurringPaymentContractForm',
  mixins: [formMixin],
  mounted() {
    const subEntity = this.$refs.fields[0]?.subEntity
    if (subEntity && this.$route.params.id) {
      this.$refs.fields[0].$set(subEntity, 'contract_id', Number(this.$route.params.id))
    }
  },
}
</script>

<template>
  <validation-observer ref="form" v-slot="{ passes }" slim>
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-row>
        <b-col v-for="(field,index) in formFields.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
               :md="field.cols || cols"
        >
          <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create"
                 :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"
          />
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>

</template>
