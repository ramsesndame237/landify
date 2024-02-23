<script>
import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'RecurringPaymentContractForm',
  mixins: [formMixin],
  data() {
    return {
      contract: null,
      loading: false,
    }
  },
  mounted() {
    this.getContract().then(() => {
      const firstField = this.$refs.fields[0] // recurringpayment_id
      const subEntity = firstField?.subEntity
      if (subEntity && this.$route.params.id) {
        console.log({ contract: this.contract })
        firstField.$set(subEntity, 'contract_id', Number(this.$route.params.id))
      }
    })
  },
  methods: {
    async getContract() {
      this.loading = true
      await this.$http.get(`/contracts/${this.$route.params.id}`).then(({ data }) => {
        this.contract = data
      }).catch(e => {
        this.$errorToast('Error while loading recurring payment')
      }).finally(() => {
        this.loading = false
      })
    },
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
