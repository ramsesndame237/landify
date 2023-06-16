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
        <b-button variant="success" :disabled="loading || items.length === 0" @click="download">
          {{ $t('button~download') }}
        </b-button>
        <b-button variant="info" class="ml-1" :disabled="loading" @click="reset">
          {{ $t('button~reset') }}
        </b-button>
        <b-button variant="primary" :disabled="loading" class="ml-1" @click="filter">
          <b-spinner v-if="loading" class="mr-1" small/>
          {{ $t('button~apply') }}
        </b-button>
      </div>
    </b-card-actions>

    <b-card>
      <div class="mb-1" v-if="table==='conditions'">
        <!--        <b-form-input debounce="500" id="filterInput" v-model="search" type="search" class="w-auto"-->
        <!--                      placeholder="Search.."/>-->
        <b-form-group label="Currency" label-cols="auto">
          <b-form-checkbox v-model="eurCurrency" name="check-button" switch inline>
            {{ eurCurrency ? 'EUR' : 'Local' }}
          </b-form-checkbox>
        </b-form-group>
      </div>
      <Datatable :key="table" ref="table" :selectable="false" :search="search" primary-key-column="contract_id"
                 entity="contract" :with-delete="false" :with-edit="false" :fields="definition.fields" :items="items"/>
    </b-card>

    <b-row v-if="table==='conditions'">
      <b-col lg="4" md="6">
        <b-card title="Totals" v-if="items.length>0">
          <table class="mt-2 mt-xl-0 w-100">
            <tr>
              <th class="pb-50 font-weight-bold">Total Rental Space</th>
              <td class="pb-50">{{ total_rental_space }}</td>
            </tr>
            <tr>
              <th class="pb-50 font-weight-bold">Total rent per month</th>
              <td class="pb-50">{{ total_rent_per_month }}</td>
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
      data: {},
      loading: false,
      eurCurrency: false,
    }
  },
  computed: {
    definition() {
      return {
        title: 'headline~contractlist~condition',
        entity: 'frontend_contractlist_criteria',
        fields: [
          ...(this.table === 'deadlines' ? ['notice_of_termination', 'action_date'] : []),
          { key: 'contract_id', stickyColumn: true, variant: 'light', },
          { key: 'contract_name', stickyColumn: true, variant: 'light', },
          { key: 'contract_status' },
          { key: 'contracttype_name' },
          { key: 'contract_begin_date' },
          { key: 'contract_end_date' },
          { key: 'max_contract_end_date' },
          { key: 'company_name' },
          { key: 'location_name' },
          { key: 'pos_name' },
          { key: 'pos_branchnumber' },
          { key: 'country_name' },
          { key: 'total_rental_space' },
          'owner_name',
          'manager_name',
          ...(this.table === 'conditions' ? [
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
            'securities_related_to_contract'] : []),
          ...(this.table === 'deadlines' ? ['contract_ends_automatically',
            'next_termination_date_tenant',
            'next_termination_date_landlord',
            'next_option_renewal',
            'next_special_termination_date_tenant',
            'automatic_renewal_by_month',
            'available_options',
            'special_termination_tenant',
            'special_termination_landlord',
            'status_negotiations',
            'date_of_status_determination',
            'comment_negotiation',
          ] : []),
          'comment',
          {
            key: 'missing_documents',
            // type: 'html',
            // export_key: 'missing_documents_export'
          },
          // 'state',
          'negotiator',
        ],
        filter_vertical: true,
        filters: [
          {
            key: 'customergroup_id',
            required: false,
            type: 'list',
            list: 'customergroup',
            listLabel: 'customergroup_name',
            send: false,
          },
          {
            key: 'company_id',
            required: false,
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
              console.log('vm.entity.pos_id: ', vm.entity.pos_id);
              const pos = vm.list.find(c=> c.pos_id === vm.entity.pos_id)
              if (pos && pos.hasOwnProperty('pos_id')) {
                vm.$set(vm.entity, 'country_id', pos.country_id)
              }
              if(vm.entity.pos_id === null || vm.entity.pos_id === undefined)  vm.$set(vm.entity, 'country_id', null)

            }
          },
          {
            key: 'country_id',
            required: false,
            type: 'list',
            list: 'country',
            listLabel: 'country_name',
            disabled: true,
          },
          { key: 'date', type: 'date', default: moment().format('YYYY-MM-DD') },
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
  methods: {
    async filter() {
      const valid = await this.$refs.form.validate()
      if (!valid) return
      this.loading = true
      const filter = _(this.data).pick(['customergroup_id', 'company_id', 'pos_id', 'country_id']).omitBy(_.isNil).value()
      filter.per_page = 100000
      // generate the request query string
      const requestQuery = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&')
      try {
        const date = moment(this.data.date)
        const masterData = (await this.$http.get(`/contracts/conditionList?${requestQuery}`)).data.data
        const contracts = masterData.map(r => {
          const obj = _.pick(r.contract, ['contract_id', 'contract_name', 'contract_begin_date',
            'contract_end_date', 'contract_first_possible_end_date', 'contract_creation_time', 'pos_branchnumber',
            'contract_last_change_time', 'contract_migration_checked', 'contracttype_name', 'currency_name', 'currency_id', 'currency_short', 'currency_iso', 'currency_iso4217',
            'contracttype_description', 'company_name', 'location_name', 'pos_name', 'contactperson_firstname', 'contactperson_lastname', 'country_name', 'owner_name', 'manager_name'])

          if (!r.areas || !r.areas.length) obj.areas = []
          else{
            obj.areas = r.areas.map(i => {
              if (date.isBetween(i.contract_area_unit_usagetype_valid_from_date, i.contract_area_unit_usagetype_valid_to_date, "day", "[]")){
                return _.pick(i, [
                  'area_id',
                  'area_name',
                  'areatype_id',
                  'areatype_name',
                  'contract_area_unit_usagetype_detail_description',
                  'contract_area_unit_usagetype_valid_from_date',
                  'contract_area_unit_usagetype_valid_to_date',
                  'contract_area_unit_usagetype_rentalspace_value',
                  'contract_area_unit_usagetype_allocationspace_value',
                  'unit_id',
                  'unit_name',
                ])
              }
            })
            obj.total_allocation_space = _.sumBy(obj.areas.filter(ar => (['Parkfläche', 'Werbefläche'].indexOf(ar.areatype_name) === -1)), 'contract_area_unit_usagetype_allocationspace_value')
            obj.total_rental_space = _.sumBy(obj.areas.filter(ar => (['Hauptfläche'].indexOf(ar.areatype_name) >= 0)), 'contract_area_unit_usagetype_rentalspace_value')
          }
          obj.negotiator = `${obj.contactperson_firstname} ${obj.contactperson_lastname}`
          /*
          *!SECTION criteria
          */
          if (!r.criterias || !r.criterias.length) obj.choices = []
          else {
            obj.choices = r.criterias.map(i => _.pick(i, [
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

          const cc = obj.choices.find(c => c.criteria_name === 'aktueller Vertragstyp')
          if (cc) {
            obj.contract_status = cc.choice_name
          } else {
            // check the date
            obj.contract_status = date.isAfter(obj.contract_end_date) ? 'Terminated' : 'Running'
          }
          if (this.table === 'deadlines') {
            obj.notice_of_termination = (cc && cc.choice_name === 'gekündigt') ? 'Yes' : 'No'
            // obj.action_date = cc?.contract_criteria_value
          }

          /*
          *!SECTION specialrights
          */
          if (!r.specialrights || !r.specialrights.length) obj.specialRights = []
          else {
            obj.specialRights = _.sortBy(r.specialrights.map(i => _.pick(i, [
              'contract_specialright_date',
              'contract_specialright_termination_date',
              'contract_specialright_description',
              'contract_specialright_is_passive',
              'contract_specialright_is_availed',
              'contract_specialright_prior_notice_date',
              'contract_specialright_is_obsolete',
              'contract_specialright_automatic_renewal_in_months',
              'specialright_name',
              'specialright_description'])), 'contract_specialright_termination_date')

            if (this.table !== 'deadlines') return obj
            let sr

            sr = _(obj.specialRights).filter(r => r.specialright_name === 'Optionsausübung' && date.isSameOrBefore(r.contract_specialright_prior_notice_date)).orderBy('contract_specialright_prior_notice_date').value()[0]
            obj.action_date = sr?.contract_specialright_prior_notice_date

            // 20
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Kündigungstermin Mieter')
            obj.next_termination_date_tenant = sr?.contract_specialright_termination_date

            // 21
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Kündigungstermin Vermieter')
            obj.next_termination_date_landloard = sr?.contract_specialright_termination_date

            // 22
            sr = obj.specialRights.filter(csr => csr.specialright_name === 'Optionsverlängerung')
            sr = sr.find(csr => moment().isSameOrBefore(csr.contract_specialright_termination_date)) || sr[0]
            obj.next_option_renewal = sr?.contract_specialright_termination_date

            // 23
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Sonderkündigungstermin Mieter')
            obj.next_special_termination_tenant = sr?.contract_specialright_description

            // 25
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Optionsausübung')
            obj.available_options = sr ? 'Yes' : ''

            // 26
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Sonderkündigung Mieter')
            obj.special_termination_tenant = sr?.contract_specialright_description

            // 27
            sr = obj.specialRights.find(csr => csr.specialright_name === 'Sonderkündigung Vermieter')
            obj.special_termination_landlord = sr?.contract_specialright_description
          }

          /*
         *!SECTION recurringpayment
         */

          if (!r.recurringpayments || !r.recurringpayments.length) obj.reccuringPayments = []
          else {
            obj.reccuringPayments = r.recurringpayments.map(i => _.pick(i, [
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

          if (this.table !== 'conditions') return obj

          const rcBasismiete = obj.reccuringPayments.find(r => r.recurringpaymenttype_name === '1-Basismiete' && date.isBetween(r.recurringpayment_begin_date, r.recurringpayment_end_date, "day", "[]"))

          obj.rent_per_month = this.getRecurringPaymentMonthValue(rcBasismiete).toFixed(2)
          obj.base_rent_per_area_amount = obj.total_allocation_space > 0 ? (obj.rent_per_month / obj.total_allocation_space).toFixed(2) : 0
          obj.advertising_per_month = this.getRecurringPaymentMonthValue(obj.reccuringPayments.find(r => r.recurringpaymenttype_name === '6-Werbekosten')).toFixed(2)
          obj.ancillary_cost_per_month = this.getRecurringPaymentMonthValue(obj.reccuringPayments.find(r => r.recurringpaymenttype_name === '5-Nebenkostenpauschale')).toFixed(2)
          obj.heating_ancillary_cost_per_month = _.sum(obj.reccuringPayments.filter(r => (['4-Nebenkostenvorauszahlung', '7-Heizkostenvorauszahlung'].indexOf(r.recurringpaymenttype_name) >= 0)).map(rc => this.getRecurringPaymentMonthValue(rc))).toFixed(2)

          obj.local_rent_per_month = obj.rent_per_month
          obj.local_base_rent_per_area_amount = obj.base_rent_per_area_amount
          obj.local_advertising_per_month = obj.advertising_per_month
          obj.local_ancillary_cost_per_month = obj.ancillary_cost_per_month
          obj.local_heating_ancillary_cost_per_month = obj.heating_ancillary_cost_per_month

          const rcIndex = obj.reccuringPayments.find(r => ['1', '3'].includes((r.recurringpaymenttype_name || '').split('-')[0]) && date.isBetween(r.recurringpayment_begin_date, r.recurringpayment_end_date, "day", "[]"))

          if (rcIndex) {
            obj.index_adjustment_lease = rcIndex.indexclause_indextransmission_percent ?? `${rcIndex.indexclause_indextransmission_percent} %`
            obj.index_adjustment_rate_in_percent = rcIndex.indexclause_minimal_percent_change_aggreed ? `${rcIndex.indexclause_minimal_percent_change_aggreed} %` : rcIndex.indexclause_minimal_point_change_agreed
          }

          const rcStaffe = _(obj.reccuringPayments).filter(r => r.recurringpaymenttype_name === '3-Staffelmiete' && date.isSameOrBefore(r.recurringpayment_begin_date)).orderBy('recurringpayment_begin_date').value()[0]
          if (rcStaffe) {
            obj.staggered_minimum_rent = 'Yes, ' + rcStaffe.recurringpayment_begin_date
          }

          const rcUmsat = obj.reccuringPayments.find(r => (r.recurringpaymenttype_name || '').split('-')[0] === '2')
          obj.turnover_rent = rcUmsat?.recurringpayment_condition_percentage
          // const val = rcUmsat?.recurringpayment_value_deposit
          // contract.securities_related_to_contract = val != null ? (val ? 'yes' : 'no') : ''
          // contract.type_of_rental_security = ''
          return obj
        })

        let tickets = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_6_1_6_listall',
          per_page: 10000000,
          data: contracts.map(c => ({ contract_id: c.contract_id, ticket_closed: 0 })),
        })).data.data.data
        tickets = _.groupBy(tickets, 'contract_id')

        contracts.forEach(contract => {
          if (this.table === 'deadlines') {
            const ticket = _(tickets[contract.contract_id]).filter(t => t.board_name === 'contradictionpackage-Kanban-Board')
              .orderBy('ticket_move_time_in', 'desc').value()[0]
            if (ticket) {
              const route = this.$router.resolve({
                name: 'table-view',
                params: { table: 'ticket', id: ticket.ticket_id },
              })
              // 28
              contract.status_negotiations = `<a target="_blank" href="${route.href}">${ticket.ticket_id}</a>, ${ticket.column_name}, ${ticket.ticket_creation_time}`
              // 29
              contract.date_of_status_determination = ticket.ticket_move_time_in
            }
          }
        })

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
      this.data = { date: this.definition.filters.find(f => f.key === 'date').default }
      this.$refs.form.reset()
      this.items = []
    },
    download() {
      const filename = `${this.$t(`menu~${this.table === 'conditions' ? 'contractcondition' : 'contractdeadline'}`)}-Export_${moment().format('DD_MM_YYYY')}.csv`
      this.$refs.table.downloadCsv(filename)
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
