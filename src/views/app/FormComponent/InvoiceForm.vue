<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <b-row>
        <b-col cols="7">
          <b-row>
            <b-col cols="12" class="d-flex justify-content-between">
              <span class="text-uppercase">Ticket_id</span>
              <span class="text-uppercase">Unknow</span>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-between mb-1">
              <span class="text-uppercase">Invoice_id</span>
              <span class="text-uppercase">{{ create ? 'Automatically created' : entity.invoice_id }}</span>
            </b-col>

            <b-col cols="6">
              <field ref="fields" :disabled="isDisabledFromName('invoice_company_name')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_company_name')"/>
            </b-col>
            <b-col cols="3">
              <field ref="fields" :disabled="isDisabledFromName('invoice_date_of_order')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_date_of_order')"/>
            </b-col>
            <b-col cols="3">
              <field ref="fields" :disabled="isDisabledFromName('invoice_date')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_date')"/>
            </b-col>

            <b-col cols="6">
              <field ref="fields" :disabled="isDisabledFromName('partnertype_id')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('partnertype_id')"/>
            </b-col>
            <b-col cols="6">
              <field ref="fields" :disabled="isDisabledFromName('invoice_contract_year')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_contract_year')"/>
            </b-col>

            <b-col cols="6">
              <field ref="fields" :disabled="isDisabledFromName('invoice_allocationarea')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_allocationarea')"/>
            </b-col>
            <b-col cols="3">
              <field ref="fields" :disabled="isDisabledFromName('invoice_contract_billing_period_from_date')"
                     :entity="entity" :table-definition="tableDefinition"
                     :field="getField('invoice_contract_billing_period_from_date')"/>
            </b-col>
            <b-col cols="3">
              <field ref="fields" :disabled="isDisabledFromName('invoice_contract_billing_period_to_date')"
                     :entity="entity" :table-definition="tableDefinition"
                     :field="getField('invoice_contract_billing_period_to_date')"/>
            </b-col>
            <b-col cols="12">
              <field ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                     :field="companyField"/>
            </b-col>
            <b-col cols="12">
              <field ref="fields" :disabled="isDisabledFromName('invoice_description')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_description')"/>
            </b-col>
            <b-col cols="12">
              <field ref="fields" :disabled="isDisabledFromName('invoice_number')" :entity="entity"
                     :table-definition="tableDefinition" :field="getField('invoice_number')"/>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="5">
          <div class="d-flex justify-content-between align-items-center flex-wrap mb-1">
            <span>Select respective contract to area</span>
            <b-form-input debounce="500" id="filterInput" v-model="search" type="search" class="w-auto"
                          placeholder="Search.." :disabled="entity.company_id==null"/>
          </div>
          <data-tables ref="contracts" :current-page="1" :per-page="100" :items="contracts" :multi-select="false"
                       :with-actions="false" entity="contract" :fields="contractFields" style="max-height: 300px"
                       class="mb-1" @selected="onContractSelect"/>

          <data-tables ref="areas" :current-page="1" :per-page="100" :items="areas" :selectable="false"
                       :with-actions="false" entity="area" :fields="areaFields" style="max-height: 300px"/>

        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import DataTables from '@/layouts/components/DataTables';
import { getYearFormDateString } from "@/libs/utils";

export default {
  name: 'InvoiceForm',
  components: { DataTables },
  mixins: [FormMixin],
  data() {
    return {
      search: '',
      companyField: {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        rules: { required: false },
      },
      contractFields: [
        { key: 'contract_id' },
        { key: 'contract_name' },
        { key: 'contracttype_name' },
        { key: 'documentcontracttype_name' },
        { key: 'contract_begin_date' },
        { key: 'contract_end_date' },
      ],
      areaFields: [
        { key: 'area_id' },
        { key: 'area_name' },
        { key: 'pos_name' },
        { key: 'location_name' },
      ],
      contracts: [],
      areas: [],
    }
  },
  watch: {
    search() {
      this.fetchContracts()
    },
    'entity.company_id': function (val) {
      if (val) this.fetchContracts()
      else this.contracts = []
    },
    'entity.invoice_contract_billing_period_to_date': function () {
      this.entity.invoice_contract_year = getYearFormDateString(this.entity.invoice_contract_billing_period_to_date)
    },
    'entity.contract_id': async function (val) {
      const contract = this.contracts.find(c => c.contract_id === val)
      if (!contract) {
        // laoding form
        // this.fetchContracts()
        this.contracts = (await this.$api({
          entity: 'contract',
          action: 'read-rich',
          data: [{ contract_id: val }],
        })).data.data.data
        this.$set(this.contracts[0], '__selected', true)
        await this.fetchAreas(val)
        return
      }
      this.$set(contract, '__selected', true)
      await this.fetchAreas(val)
    },
  },
  async mounted() {
    this.entity.invoice_contract_year = getYearFormDateString(this.entity.invoice_contract_billing_period_to_date)
  },
  methods: {
    async fetchContracts() {
      this.$refs.contracts.loading = true
      this.contracts = (await this.$api({
        entity: 'contract',
        action: 'read-rich',
        filter_all: this.search,
      })).data.data.data
      this.$refs.contracts.loading = false
    },
    async fetchAreas(contractId) {
      this.$refs.areas.loading = true
      this.areas = (await this.$api({
        entity: 'frontend_3_4_1_1',
        action: 'read-rich',
        data: [{ contract_id: contractId }],
      })).data.data.data
      this.$refs.areas.loading = false
    },
    onContractSelect(contract) {
      this.fetchAreas(contract.contract_id)
      this.entity.contract_id = contract.contract_id
    },
  },
}
</script>

<style scoped>

</style>
