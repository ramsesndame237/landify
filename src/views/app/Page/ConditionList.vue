<template>
  <div>
    <b-card-actions title="Filter" action-collapse>
      <!--      <div class="d-flex align-items-center">-->
      <!--        <b-form-input debounce="500" id="filterInput" v-model="search" type="search" class="w-auto"-->
      <!--                      placeholder="Search.."/>-->
      <!--      </div>-->

      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(filter)">
          <b-row>
            <b-col v-for="(field,index) in definition.filters" :key="index" cols="12" :md="6">
              <field ref="fields" :entity="data" :disabled="loading" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <div class="text-right">
        <b-button variant="info" :disabled="loading" @click="reset">
          Reset
        </b-button>
        <b-button variant="primary" :disabled="loading" class="ml-1" @click="filter">
          <b-spinner v-if="loading" class="mr-1" small/>
          Apply
        </b-button>
      </div>
    </b-card-actions>

    <b-card>
      <Datatable :key="table" ref="table" :selectable="false" :search="search" :entity="table" :with-delete="false"
                 :with-edit="false" :fields="definition.fields" :items="items"/>
    </b-card>
  </div>
</template>

<script>

import {
  BCard, BButton, BFormInput, BForm, BRow, BCol,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions'
import Field from '@/views/app/Generic/Field'
import _ from 'lodash'
import GenericFilter from '../Generic/Filter.vue'
import Tables from '../../../table'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    Field,
    BCardActions,
    GenericFilter,
    Datatable,
    BCard,
    BButton,
    BFormInput,
    BForm,
    BRow,
    BCol,
  },
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    console.log('initial payload', payload)
    return {
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: payload?.filter,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      items: [],
      table: 'conditionlist',
      data: {},
      loading: false,
    }
  },
  computed: {
    definition() {
      return Tables[this.table]
    },
  },
  methods: {
    async filter() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      const filter = _.pick(this.data, ['customergroup_id', 'company_id', 'pos_id'])
      try {
        // get currency data
        const currency = this.$refs.fields.find(f => f.field.key === 'currency_id').selectedValue
        const currencies = this.$refs.fields.find(f => f.field.key === 'currency_id').list
        const code = currency.currency_iso4217.toLowerCase()
        // const currencyRates = (await this.$http.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${code}.json`))
        //   .data[code]

        const filteredData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_master',
          per_page: 10000000,
          ...(Object.keys(filter).length > 0 ? { data: [filter] } : {}),
        })).data.data.data

        const ids = filteredData.map(c => c.contract_id)

        const masterData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_master_detail',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id })),
        })).data.data.data

        const contracts = Object.values(_.groupBy(masterData, 'contract_id')).map(r => {
          const obj = _.pick(r[0], ['contract_id', 'contract_name', 'contract_begin_date',
            'contract_end_date', 'contract_first_possible_end_date', 'contract_creation_time',
            'contract_last_change_time', 'contract_migration_checked', 'contracttype_name', 'currency_name', 'currency_id',
            'contracttype_description', 'company_name', 'location_name', 'pos_name', 'country_name', 'owner_name', 'manager_name'])
          obj.areas = r.map(i => _.pick(i, ['area_id',
            'area_name',
            'areatype_id',
            'areatype_name',
            'contract_area_unit_usagetype_detail_description',
            'contract_area_unit_usagetype_valid_from_date',
            'contract_area_unit_usagetype_valid_to_date',
            'contract_area_unit_usagetype_rentalspace_value',
            'contract_area_unit_usagetype_allocationspace_value',
            'unit_id',
            'unit_name']))

          obj.total_allocation_space = _.sumBy(obj.areas.filter(ar => (['Parkfläche', 'Werbefläche'].indexOf(ar.areatype_name) >= 0)), 'contract_area_unit_usagetype_allocationspace_value')
          obj.total_rental_space = _.sumBy(obj.areas.filter(ar => (['Hauptfläche'].indexOf(ar.areatype_name) >= 0)), 'contract_area_unit_usagetype_rentalspace_value')
          return obj
        })

        const choicesData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_criteria',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id })),
        })).data.data.data

        let groups = _.groupBy(choicesData, 'contract_id')

        contracts.forEach(contract => {
          if (!groups[contract.contract_id]) contract.choices = []
          else {
            contract.choices = groups[contract.contract_id].map(i => _.pick(i, [
              'criteria_id',
              'criteria_name',
              'criteria_has_value',
              'contract_criteria_valid_to_date',
              'contract_criteria_valid_from_date',
              'contract_criteria_comment',
              'contract_criteria_exists',
              'contract_criteria_value',
              'contract_criteria_is_obsolete',
              'criteriatype_id',
              'criteriatype_name',
              'criteriatype_description',
              'choice_id',
              'choice_name']))
          }

          if (contract.choices.find(c => c.criteria_name === 'aktueller Vertragstyp' && c.choice_name === 'gekündigt')) {
            contract.contract_status = 'Terminated'
          } else {
            contract.contract_status = 'Unknown'
          }
        })

        const specialRightsData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_specialright',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id })),
        })).data.data.data

        groups = _.groupBy(specialRightsData, 'contract_id')
        contracts.forEach(contract => {
          if (!groups[contract.contract_id]) contract.specialRights = []
          else {
            contract.specialRights = groups[contract.contract_id].map(i => _.pick(i, [
              'contract_specialright_date',
              'contract_specialright_termination_date',
              'contract_specialright_description',
              'contract_specialright_is_passive',
              'contract_specialright_is_availed',
              'contract_specialright_prior_notice_date',
              'contract_specialright_is_obsolete',
              'contract_specialright_automatic_renewal_in_months',
              'specialright_name',
              'specialright_description']))
          }
        })

        const recurringPaymentsData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_recurringpayment',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id })),
        })).data.data.data

        groups = _.groupBy(recurringPaymentsData, 'contract_id')
        contracts.forEach(contract => {
          if (!groups[contract.contract_id]) contract.reccuringPayments = []
          else {
            contract.reccuringPayments = groups[contract.contract_id].map(i => _.pick(i, [
              'recurringpayment_id',
              'recurringpayment_sum_per_month',
              'recurringpayment_condition_percentage',
              'recurringpayment_percentage',
              'recurringpayment_begin_date',
              'recurringpayment_end_date',
              'recurringpayment_condition_comment',
              'recurringpayment_maturity_date',
              'recurringpayment_maturity_daily_range',
              'recurringpayment_maturity_monthly_range',
              'recurringpayment_value_deposit',
              'recurringpayment_name',
              'recurringpayment_description',
              'recurringpaymenttype_name',
              'recurringpaymenttype_description',
              'indexclause_id',
              'indexclause_baseyear',
              'indexclause_begin_date',
              'indexclause_name',
              'indexclause_adjustment_description',
              'indexclause_adjustment_rule',
              'indexclause_indextransmission_percent',
              'indexclause_minimal_percent_change_agreed',
              'indexclause_minimal_point_change_agreed',
              'maturitytype_name',
              'maturitytype_description']))
          }

          contract.rent_per_month = contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '1-Basismiete')?.recurringpayment_sum_per_month || 0
          contract.base_rent_per_area_mount = (contract.rent_per_month / contract.total_allocation_space).toFixed(2)
          contract.advertising_per_month = contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '6-Werbekosten')?.recurringpayment_sum_per_month || 0
          contract.ancillary_cost_per_month = contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '5-Nebenkostenpauschale')?.recurringpayment_sum_per_month || 0
          contract.heating_ancillary_cost_per_month = _.sumBy(contract.reccuringPayments.find(r => (['4-Nebenkostenvorauszahlung', '7-Heizkostenvorauszahlung'].indexOf(r.recurringpaymenttype_name) >= 0)), 'recurringpayment_sum_per_month') || 0

          const contractCurrency = currencies.find(c => c.currency_id === contract.currency_id)
          // if (contractCurrency) {
          //   const rate = currencyRates[contractCurrency.currency_iso4217]
          //   contract.local_rent_per_month = (contract.rent_per_month / rate).toFixed(2)
          //   contract.local_base_rent_per_area_mount = (contract.base_rent_per_area_mount / rate).toFixed(2)
          //   contract.local_advertising_per_month = (contract.advertising_per_month / rate).toFixed(2)
          //   contract.local_ancillary_cost_per_month = (contract.ancillary_cost_per_month / rate).toFixed(2)
          //   contract.local_heating_ancillary_cost_per_month = (contract.rancillary_cost_per_month / rate).toFixed(2)
          // }
        })

        this.items = contracts
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.data = {}
      this.$refs.form.reset()
      this.items = []
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
