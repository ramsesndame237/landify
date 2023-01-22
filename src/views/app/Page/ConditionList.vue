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
              <field ref="fields" :entity="data" :disabled="loading" :field="field"/>
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
  BCard, BButton, BFormInput, BForm, BRow, BCol,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions'
import Field from '@/views/app/Generic/Field'
import _ from 'lodash'
import moment from 'moment'
import GenericFilter from '../Generic/Filter.vue'
import Tables from '../../../table'
import rates from './rates.json'

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
          { key: 'total_allocation_space' },
          { key: 'total_rental_space' },
          'owner_name',
          'manager_name',
          ...(this.table === 'conditions' ? [{ key: 'currency_name' },
            { key: 'rent_per_month' },
            { key: 'base_rent_per_area_amount' },
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
          { key: 'missing_documents', type: 'html' },
          'state',
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
            filter_key: 'company_id',
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
      const filter = _(this.data).pick(['customergroup_id', 'company_id', 'pos_id']).omitBy(_.isNil).value()
      try {
        const filteredData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_master',
          per_page: 10000000,
          ...(Object.keys(filter).length > 0 ? { data: [filter] } : {}),
        })).data.data.data

        const ids = filteredData.map(c => c.contract_id)
        if (!ids.length) {
          this.items = []
          throw new Error('no data')
        }
        const date = moment(this.data.date)

        const masterData = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_contractlist_master_detail',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id })),
        })).data.data.data

        const contracts = Object.values(_.groupBy(masterData, 'contract_id')).map(r => {
          const obj = _.pick(r[0], ['contract_id', 'contract_name', 'contract_begin_date',
            'contract_end_date', 'contract_first_possible_end_date', 'contract_creation_time', 'pos_branchnumber',
            'contract_last_change_time', 'contract_migration_checked', 'contracttype_name', 'currency_name', 'currency_id', 'currency_short', 'currency_iso', 'currency_iso4217',
            'contracttype_description', 'company_name', 'location_name', 'pos_name', 'country_name', 'owner_name', 'manager_name'])
          obj.areas = r
            .filter(ar => date.isBetween(ar.contract_area_unit_usagetype_valid_from_date, ar.contract_area_unit_usagetype_valid_to_date))
            .map(i => _.pick(i, ['area_id',
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

          obj.total_allocation_space = _.sumBy(obj.areas.filter(ar => (['Parkfläche', 'Werbefläche'].indexOf(ar.areatype_name) === -1)), 'contract_area_unit_usagetype_allocationspace_value')
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

          const cc = contract.choices.find(c => c.criteria_name === 'aktueller Vertragstyp')
          if (cc) {
            contract.contract_status = cc.choice_name
          } else {
            // check the date
            contract.contract_status = date.isAfter(contract.contract_end_date) ? 'Terminated' : 'Running'
          }
          if (this.table === 'deadlines') {
            contract.notice_of_termination = (cc && cc.choice_name === 'gekündigt') ? 'Yes' : 'No'
            // contract.action_date = cc?.contract_criteria_value
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
            contract.specialRights = _.sortBy(groups[contract.contract_id].map(i => _.pick(i, [
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

            if (this.table !== 'deadlines') return
            let sr

            sr = _(contract.specialRights).filter(r => r.specialright_name === 'Optionsausübung' && date.isBefore(r.contract_specialright_prior_notice_date)).orderBy('contract_specialright_prior_notice_date').value()[0]
            contract.action_date = sr?.contract_specialright_prior_notice_date

            // 20
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Kündigungstermin Mieter')
            contract.next_termination_date_tenant = sr?.contract_specialright_termination_date

            // 21
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Kündigungstermin Vermieter')
            contract.next_termination_date_landloard = sr?.contract_specialright_termination_date

            // 22
            sr = contract.specialRights.filter(csr => csr.specialright_name === 'Optionsverlängerung')
            sr = sr.find(csr => moment().isBefore(csr.contract_specialright_termination_date)) || sr[0]
            contract.next_option_renewal = sr?.contract_specialright_termination_date

            // 23
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Sonderkündigungstermin Mieter')
            contract.next_special_termination_tenant = sr?.contract_specialright_description

            // 25
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Optionsausübung')
            contract.available_options = sr ? 'Yes' : ''

            // 26
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Sonderkündigung Mieter')
            contract.special_termination_tenant = sr?.contract_specialright_description

            // 27
            sr = contract.specialRights.find(csr => csr.specialright_name === 'Sonderkündigung Vermieter')
            contract.special_termination_landlord = sr?.contract_specialright_description
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
            contract.reccuringPayments = groups[contract.contract_id]
              // .filter(i => date.isBetween(i.recurringpayment_begin_date, i.recurringpayment_end_date))
              .map(i => _.pick(i, [
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

          if (this.table !== 'conditions') return

          const rcBasismiete = contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '1-Basismiete')

          contract.rent_per_month = this.getRecurringPaymentMonthValue(rcBasismiete).toFixed(2)
          contract.base_rent_per_area_amount = contract.total_allocation_space > 0 ? (contract.rent_per_month / contract.total_allocation_space).toFixed(2) : 0
          contract.advertising_per_month = this.getRecurringPaymentMonthValue(contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '6-Werbekosten')).toFixed(2)
          contract.ancillary_cost_per_month = this.getRecurringPaymentMonthValue(contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '5-Nebenkostenpauschale')).toFixed(2)
          contract.heating_ancillary_cost_per_month = _.sum(contract.reccuringPayments.filter(r => (['4-Nebenkostenvorauszahlung', '7-Heizkostenvorauszahlung'].indexOf(r.recurringpaymenttype_name) >= 0)).map(rc => this.getRecurringPaymentMonthValue(rc))).toFixed(2)

          contract.local_rent_per_month = contract.rent_per_month
          contract.local_base_rent_per_area_amount = contract.base_rent_per_area_amount
          contract.local_advertising_per_month = contract.advertising_per_month
          contract.local_ancillary_cost_per_month = contract.ancillary_cost_per_month
          contract.local_heating_ancillary_cost_per_month = contract.heating_ancillary_cost_per_month

          contract.index_adjustment_lease = rcBasismiete ? `${rcBasismiete.indexclause_adjustment_description} - ${rcBasismiete.indexclause_minimal_percent_change_aggreed || rcBasismiete.indexclause_minimal_point_change_agreed}` : ''
          contract.index_adjustment_rate_in_percent = rcBasismiete?.indexclause_indextransmission_percent

          const rcStaffe = _(contract.reccuringPayments).filter(r => r.recurringpaymenttype_name === '3-Staffelmiete' && date.isBefore(r.recurringpayment_begin_date)).orderBy('recurringpayment_begin_date').value()[0]
          if (rcStaffe) {
            contract.staggered_minimum_rent = 'Yes, ' + rcStaffe.recurringpayment_begin_date
          }

          const rcUmsat = contract.reccuringPayments.find(r => r.recurringpaymenttype_name === '2-Umsatzmiete')
          contract.turnover_rent = rcUmsat?.recurringpayment_condition_percentage
          const val = rcUmsat?.recurringpayment_value_deposit
          contract.securities_related_to_contract = val != null ? (val ? 'yes' : 'no') : ''
          contract.type_of_rental_security = ''

        })

        let tickets = (await this.$api({
          action: 'read-rich',
          entity: 'frontend_6_1_6_listall',
          per_page: 10000000,
          data: ids.map(id => ({ contract_id: id, ticket_closed: 0 })),
        })).data.data.data
        tickets = _.groupBy(tickets, 'contract_id')

        contracts.forEach(contract => {
          contract.missing_documents = _(tickets[contract.contract_id]).uniqBy('ticket_id').map('ticket_id')
            .map(id => {
              const route = this.$router.resolve({ name: 'table-view', params: { table: 'ticket', id } })
              return `<a target="_blank" href="${route.href}">${id}</a>`
            })
            .join('<br>')

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
      this.$refs.table.downloadCsv()
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
