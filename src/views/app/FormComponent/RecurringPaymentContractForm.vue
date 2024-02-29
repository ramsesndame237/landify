<script>
import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'RecurringPaymentContractForm',
  mixins: [formMixin],
  data() {
    return {
      ignoreFieldsFillOnUpdate: true,
      contract: null,
      recurringpayment: null,
      loading: false,
    }
  },
  computed: {
    isContractView() {
      return this.$route.params.table === 'contract'
    },
  },
  watch: {
    recurringpayment(data) {
      const initialData = {
        ...data,
        recurringpaymenttype_id: Number(data?.recurringpaymenttype?.recurringpaymenttype_id),
        partnercompany_id: Number(data?.partnercompany_id),
        bankdata_id: Number(data?.partnercompany_bankdata?.bankdata_id),
        tax_rate_id: Number(data?.recurringpayment_taxrate_id), // tax_rate_id
        maturitytype_id: Number(data?.maturitytype?.maturitytype_id),
        indexclause_id: Number(data?.indexclause?.indexclause_id),
        contract_id: Number(data?.contract?.contract_id),
      }
      if (this.isContractView) {
        const firstField = this.$refs.fields[0] // recurringpayment_id
        firstField.subEntity = initialData
      } else {
        this.entity = initialData
      }
    },
  },
  mounted() {
    const promises = [this.getRecurringPayment]
    const isContractView = this.isContractView
    if (isContractView) {
      promises.push(this.getContract)
    }
    this.loading = true
    Promise.all(promises.map(f => f())).then(() => {
      const firstField = this.$refs.fields[0] // recurringpayment_id
      const subEntity = firstField?.subEntity
      if (subEntity && this.$route.params.id && isContractView) {
        console.log({ contract: this.contract })
        firstField.$set(subEntity, 'contract_id', Number(this.$route.params.id))
      }
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    async getRecurringPayment() {
      const firstField = this.$refs.fields[0] // recurringpayment_id
      if (firstField?.create || this.create) {
        return
      }
      const subEntity = firstField?.subEntity
      const recurringPaymentId = this.isContractView ? subEntity.recurringpayment_id : this.$route.params.id
      await this.$http.get(`/contracts/step/2/${recurringPaymentId}/details`).then(({ data }) => {
        this.recurringpayment = data
      }).catch(e => {
        this.$errorToast(this.$t('errors~loading~recurring~payment'))
      })
    },
    async getContract() {
      await this.$http.get(`/contracts/${this.$route.params.id}`).then(({ data }) => {
        this.contract = data
      }).catch(e => {
        this.$errorToast(this.$t('errors~loading~contract'))
      })
    },
  },
}
</script>

<template>
  <div>
    <div v-if="loading" class="p-4 d-flex justify-content-center align-items-center">
      <b-spinner />
    </div>
    <validation-observer v-show="!loading" ref="form" v-slot="{ passes }" slim>
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
  </div>

</template>
