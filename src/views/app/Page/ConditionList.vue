<template>
  <div>
    <b-card-actions :title="$t('general~filter')" action-collapse>
      <!--      <div class="d-flex align-items-center">-->
      <!--        <b-form-input debounce="500" id="filterInput" v-model="search" type="search" class="w-auto"-->
      <!--                      placeholder="Search.."/>-->
      <!--      </div>-->

      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(filter)">
          <b-row>
            <b-col v-for="(field,index) in definition.filters" :key="index" cols="12" :md="6">
              <field ref="fields" :entity="data" :disabled="loading || field.disabled" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <div class="text-right">
        <b-button variant="success" :disabled="loadingDonwload" @click="download">
          <b-spinner v-if="loadingDonwload" class="mr-1" small/>
          {{ $t('button~download') }}
        </b-button>
        <b-button variant="info" class="ml-1" :disabled="loading || loadingDonwload" @click="reset">
          {{ $t('button~reset') }}
        </b-button>
        <b-button variant="primary" :disabled="loading" class="ml-1" @click="filter">
          <b-spinner v-if="loading" class="mr-1" small/>
          {{ $t('button~apply') }}
        </b-button>
      </div>
    </b-card-actions>

    <b-card>
      <!-- <div v-if="table==='conditions'" class="mb-1">
        <b-form-group label="Currency" label-cols="auto">
          <b-form-checkbox v-model="eurCurrency" name="check-button" switch inline>
            {{ eurCurrency ? 'EUR' : 'Local' }}
          </b-form-checkbox>
        </b-form-group>
      </div> -->
      <Datatable :key="table" ref="table" :selectable="false" :search="search" primary-key-column="contract_id"
                 entity="contract" :with-delete="false" :with-edit="false" :with-nested="table === 'deadlines'" :sub-fields="definition.subFields"
                 :fields="definition.fields" :items="items" sub-fields-data-key="deadlines" :with-actions="false"
      />
    </b-card>

    <b-row v-if="table==='conditions'">
      <b-col lg="4" md="6">
        <b-card v-if="items.length>0" title="Totals">
          <table class="mt-2 mt-xl-0 w-100">
            <tr>
              <th class="pb-50 font-weight-bold">
                Total Rental Space
              </th>
              <td class="pb-50">
                {{ total_rental_space }}
              </td>
            </tr>
            <tr>
              <th class="pb-50 font-weight-bold">
                Total rent per month
              </th>
              <td class="pb-50">
                {{ total_rent_per_month }}
              </td>
            </tr>
          </table>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import {
  BCard, BButton, BForm, BRow, BCol,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions'
import Field from '@/views/app/Generic/Field'
import _ from 'lodash'
import moment from 'moment'
import { formatDate } from '@/libs/utils'
import DeadlineMixin from '@/views/app/Contracts/Relations/Deadlines/DeadlineMixin'
import { getUserData } from '@/auth/utils'
import rates from './rates.json'

const Datatable = () => import('@/layouts/components/DataTables.vue')
const CONTRACT_STATUS_CRITERIA_CODE = 'aktueller Vertragstyp'
const CONTRACT_MISSING_DOCUMENT_CRITERIA_CODE = 'Fehlende Unterlagen FriKo-Liste'
const CONTRACT_RETAIL_SPACE_CRITERIA_CODE = 'Verkaufsfläche'
const CONTRACT_COMMENT_CRITERIA_CODE = 'Bemerkung FriKo-Liste'
const CONTRACT_SECURITIES_CRITERIA_CODE = 'Mietsicherheit - Anzeige'
export default {
  components: {
    Field,
    BCardActions,
    Datatable,
    BCard,
    BButton,
    BForm,
    BRow,
    BCol,
  },
  mixins: [DeadlineMixin],
  data() {
    const payload = this.$store.getters['table/tableData'](this.$route.params.table)
    console.log('initial payload', payload)
    return {
      search: payload?.search || '',
      perPage: payload?.perPage || 10,
      currentPage: payload?.currentPage || 1,
      totalRows: payload?.totalRows || 0,
      initialFilterData: this.definition?.initialFilterValues ?? payload?.filter,
      initialSortBy: payload?.sortBy,
      initialSortDesc: payload?.sortDesc ?? true,
      items: [],
      data: {},
      loading: false,
      loadingDonwload: false,
      eurCurrency: false,
    }
  },
  computed: {
    definition() {
      const user = getUserData()

      return {
        title: 'headline~contractlist~condition',
        entityEndpoint: '/contracts/conditionList',
        fields: [
          { key: 'contract_name', stickyColumn: false, variant: 'light' },
          { key: 'contracttype_name' },
          { key: 'pos_name' },
          { key: 'country_short' },
          { key: 'attribute.retail_space' },
          {
            key: 'contract_of_status',
          },
          ...(this.table === 'deadlines' ? [{ key: 'term_type'}] : []),
          { key: 'contract_begin_date', default: moment().format('DD/MM/YYYY') },
          { key: 'contract_end_date' },
          ...(this.table === 'deadlines' ? [
            { key: 'next_possible_end_of_contract' },
            { key: 'last_possible_end_of_contract'},
            // { key: 'available_options' },
            // { key: 'total_options' },
            { key: 'next_action', default: moment().format('DD/MM/YYYY') },
            { key: 'action_begin', default: moment().format('DD/MM/YYYY') },
            { key: 'action_ende_soll' },
            { key: 'action_ende_final' },
            {
              key: 'planned_termination' },
            {
              key: 'planned_special_termination',
            },
          ] : []),
          { key: 'max_contract_end_date', hideOnIndex: true },
          ...(this.table === 'conditions' ? [
            { key: 'total_rental_space' },
            'retail_space',
            { key: 'currency_name' },
            { key: 'base_rent_per_area_amount' },
            { key: 'rent_per_month' },
            { key: 'advertising_per_month' },
            { key: 'ancillary_cost_per_month' },
            { key: 'heating_ancillary_cost_per_month' },
            'index_adjustment_lease',
            'index_adjustment_rate_in_percent',
            'staggered_minimum_rent',
            'turnover_rent',
            'securities_related_to_contract', 'negotiator'] : []),
        ],
        subFields: [
          {
            key: 'contractdeadline_type'
          },
          { key: 'contractdeadline_acting_by' },
          {
            key: 'contractdeadline_available_options'
          },
          { key: 'contractdeadline_options', label: 'Nbr of Options' },
          {
            key: 'extension'
          },
          {
            key: 'contractdeadline_notice_period'},
          {
            key: 'contractdeadline_status',
            hideOnForm: true,
            label: 'Status',
          },
        ],
        filter_vertical: true,
        filters: [
          {
            key: 'customergroup_id',
            required: true,
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            send: false,
          },
          {
            key: 'company_id',
            required: true,
            type: 'list',
            list: 'frontend_2_2_3_1',
            listLabel: 'company_name',
            filter_key: 'customergroup_id',
          },
          {
            key: 'pos_id',
            required: false,
            type: 'list',
            list: 'frontend_2_1_3_8',
            listLabel: 'pos_name',
            entityCustomEndPoint: '/pos',
            filter_key: 'company_id',
            change: (entity, vm) => {
              console.log('vm.entity.pos_id: ', vm.entity.pos_id)
              const pos = vm.list.find(c => c.pos_id === vm.entity.pos_id)
              if (pos && pos.hasOwnProperty('pos_id')) {
                vm.$set(vm.entity, 'country_id', pos.country_id)
              }
              if (vm.entity.pos_id === null || vm.entity.pos_id === undefined) vm.$set(vm.entity, 'country_id', null)
            },
          },
          {
            key: 'country_id',
            required: false,
            type: 'list',
            list: 'country',
            listLabel: 'country_name',
            disabled: true,
          },
          { key: 'date', default: moment().format('DD/MM/YYYY') },

        ],
        create: false,
        update: false,
        delete: false,
      }
    },
    table() {
      return this.$route.name === 'condition-list' ? 'conditions' : 'deadlines'
    },
    total_rental_space() {
      return _.sumBy(this.items, 'total_rental_space')
    },
    total_rent_per_month() {
      return _.sumBy(this.items, item => (parseFloat(item.rent_per_month) || 0)).toFixed(2)
    },
  },
  watch: {
    eurCurrency() {
      if (this.table === 'conditions') this.updateCurrencyValues()
    },
    table() {
      this.reset()
    },
  },
  created() {
    if (this.definition.filters) {
      (this.definition.filters ?? []).forEach(filter => {
        this.$watch(
          `data.${filter.key}`,
          () => {
            (this.definition.filters ?? []).filter(_filter => _filter.filter_key === filter.key).map(_filter => {
              this.$set(this.data, _filter.key, null)
            })
          },
        )
      })
    }
  },
  methods: {
    async filter() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      const filter = _(this.data).pick(['customergroup_id', 'company_id', 'pos_id', 'country_id', 'contactperson_id']).omitBy(_.isNil).value()
      filter.per_page = 100000
      // generate the request query string
      const requestQuery = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
      try {
        const date = moment(this.data.date, 'DD/MM/YYYY')
        const masterData = (await this.$http.get(`/contracts/conditionList/new?${requestQuery}`)).data.data
        const contracts = masterData;
        // const begin_date = moment('DD/MM/YYYY')
       // const end_date = moment('DD/MM/YYYY')
          // .filter(r => {
          //   const begin_date = moment(r.contract_begin_date, 'DD/MM/YYYY')
          //   const end_date = moment(r.contract_end_date, 'DD/MM/YYYY')
          //   return begin_date.isBefore(end_date, 'day') && date.isSameOrAfter(begin_date, 'day') && date.isSameOrBefore(end_date, 'day')
          // });

        this.items = contracts
        if (this.table === 'conditions') this.updateCurrencyValues()
      } finally {
        this.loading = false
      }
    },
    updateCurrencyValues() {
      console.log('update_currency')
      // get currency data
      const code = 'eur'
      this.items.forEach(contract => {
        if (!this.eurCurrency) {
          this.$set(contract, 'rent_per_month', contract.local_rent_per_month)
          this.$set(contract, 'base_rent_per_area_amount', contract.local_base_rent_per_area_amount)
          this.$set(contract, 'advertising_per_month', contract.local_advertising_per_month)
          this.$set(contract, 'ancillary_cost_per_month', contract.local_ancillary_cost_per_month)
          this.$set(contract, 'heating_ancillary_cost_per_mont', contract.local_heating_ancillary_cost_per_month)
          return
        }
        if (contract.currency_short) {
          const rate = rates[code][contract.currency_short.toLowerCase()]
          if (!rate) return
          this.$set(contract, 'rent_per_month', (contract.local_rent_per_month / rate).toFixed(2))
          this.$set(contract, 'base_rent_per_area_amount', (contract.local_base_rent_per_area_amount / rate).toFixed(2))
          this.$set(contract, 'advertising_per_month', (contract.local_advertising_per_month / rate).toFixed(2))
          this.$set(contract, 'ancillary_cost_per_month', (contract.local_ancillary_cost_per_month / rate).toFixed(2))
          this.$set(contract, 'heating_ancillary_cost_per_month', (contract.local_heating_ancillary_cost_per_month / rate).toFixed(2))
        }
      })
    },
    getRecurringPaymentMonthValue(rc) {
      if (!rc) return 0
      let val = rc.recurringpayment_sum_per_month
      if (rc.maturitytype_name === 'Intervall') {
        val /= rc.recurringpayment_maturity_monthly_range
      } else {
        val /= 12
      }
      return val
    },
    reset() {
      Object.keys(this.data).forEach(key => {
        this.$delete(this.data, key)
      })
      // call initial data for all the fields then reset (Do it later)
      const components = (Array.isArray(this.$refs.fields) ? this.$refs.fields : [this.$refs.fields])
      components.forEach(field => {
        field.initializeValue()
      })
      this.data.date = this.definition.filters.find(f => f.key === 'date').default
      this.$refs.form.reset()
      this.items = []
    },
    async download() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loadingDonwload = true
      const filter = _(this.data).pick(['customergroup_id', 'company_id', 'pos_id', 'country_id']).omitBy(_.isNil).value()
      filter.per_page = 100000
      // generate the request query string
      const requestQuery = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
      try {
        const filename = `${this.$t(`menu~${this.table === 'conditions' ? 'contractcondition' : 'contractdeadline'}`)}-Export_${moment().format('DD_MM_YYYY')}.xlsx`
        const masterData = (await this.$http.get(`/contracts/conditionList/export?${requestQuery}`, {
          responseType: 'blob',
        })).data
        console.log('masterData: ', masterData)
        const link = document.createElement('a')
        link.setAttribute('href', URL.createObjectURL(masterData))
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } finally {
        this.loadingDonwload = false
      }
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
