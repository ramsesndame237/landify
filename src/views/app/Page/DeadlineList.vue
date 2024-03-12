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
                 :fields="definition.fields" :items="items" sub-fields-data-key="deadlines" :with-actions="true" :with-view="true"
      />
    </b-card>

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
import DeadlineMixin from '@/views/app/Contracts/Relations/Deadlines/DeadlineMixin'

const Datatable = () => import('@/layouts/components/DataTables.vue')
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
      return {
        title: 'headline~contractlist~deadlinelist',
        entityEndpoint: '/contracts/deadlineList/data',
        entityView: 'pos',
        primaryKey: 'pos_id',
        onViewElement: element => {
          console.log({ element })
        },
        fields: [
          { key: 'location_name', label: 'Standort' },
          { key: 'pos_id', label: 'Filial-Nr.' },
          { key: 'country_short', label: 'Land' },
          { key: 'sum_gesamt_flache', label: 'Gesamt-fläche (ohne Werbe-fläche)' },
          { key: 'owner_name', label: 'Vermieter' },
          { key: 'manager_name', label: 'Manager' },
          { key: 'contract_of_status', label: 'Vertragsstatus' },
          { key: 'term_type', label: 'Laufzeitentyp' },
          { key: 'contract_begin_date', label: 'MV-Beginn' },
          { key: 'contract_end_date', label: 'Aktuelles MV-Ende' },
          { key: 'next_possible_end_of_contract', label: 'nächstmögliches Mietvertragsende (inkl. nächster Handlungsmögl.)' },
          { key: 'last_possible_end_of_contract', label: 'spätmögliches Mietvertra   gsende (inkl. aller Handlungsmögl.)' },
          { key: 'next_action', label: 'nächste Aktion' },
          { key: 'action_begin', label: 'Aktion Beginn' },
          { key: 'action_ende_soll', label: 'Aktion Ende Soll' },
          { key: 'action_ende_final', label: 'Aktion Ende final \n (bisher "Aktionstermin")' },
          { key: 'contractdeadline_type', label: 'nächtes Handlungsintrument' },
          { key: 'contractdeadline_acting_by', label: 'Handelnder' },
          { key: 'remain_option', label: 'Anzahl Handlungsmöglichkeiten verfügbar' },
          { key: 'contractdeadline_options', label: 'Anzahl Handlungsmöglichkeiten ursprünglich' },
          { key: 'contractdeadline_extension_value', label: 'Verlängerungsjahre' },
          { key: 'contractdeadline_notice_period_value', label: 'Ankündigungsfrist' },
          { key: 'contractdeadline_notice_period_unit', label: 'Einheit Ankündigugnsfrist' },
          { key: 'contractdeadline_notice_date', label: 'Ankündigungszeitpunkt' },
          { key: 'announcement_date', label: 'endet automatisch' },
          { key: 'mieter_next_resiliation', label: 'nächster reg. Kündigungs-termin Mieter' },
          { key: 'vermieter_next_resiliation', label: 'nächster Kündigungs-termin Vermieter' },
          { key: 'next_option_extension', label: 'nächste Optionsverlängerung' },
          { key: 'special_resiliation', label: 'nächster Sonderkündigungstermin Mieter' },
          { key: 'automatic_extension_by', label: 'automatische Verlängerung um' },

          { key: 'remaining_options_current_action', label: 'Verfügbare Optionen' },
          { key: 'mieter_special_resiliation', label: 'Sonderkündigung Mieter' },
          { key: 'vermieter_special_resiliation', label: 'Sonderkündigung Vermieter' },
          { key: 'negotiation_status', label: 'Status Verhandlung' },
          { key: 'date_Status_change', label: 'Datum Statusfestlegung/-veränderung' },

          { key: 'remark_negotiation', label: 'Bemerkung Verhandlung' },
          { key: 'bemerkung', label: 'Bemerkungen' },
          { key: 'fehlende_unterlagen', label: 'Fehlende Unterlagen' },
          { key: 'state', label: 'Bundesland' },
          { key: 'negociator', label: 'Verhandler' },
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
      return this.$route.name === 'deadlines'
    },
  },
  watch: {
    eurCurrency() {
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
        this.items = (await this.$http.get(`/contracts/deadlineList/data?${requestQuery}`)).data.data
      } finally {
        this.loading = false
      }
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
        const filename = `Deadline list-Export_${moment().format('DD_MM_YYYY')}SFM.xlsx`
        const masterData = (await this.$http.get(`/contracts/deadlineList/export?${requestQuery}`, {
          responseType: 'blob',
        })).data
        console.log('masterData: ', masterData)
        const link = document.createElement('a')
        link.setAttribute('href', URL.createObjectURL(masterData))
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (err) {
        if (err.code === 'ERR_BAD_REQUEST') {
          let error = (await err.response).data
          error = JSON.parse(await error.text())

          this.$errorToast(error.detail || 'Unknown error')
        } else {
          this.$errorToast('Unknown error')
        }
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
