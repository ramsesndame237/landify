<template>
  <div>
    <b-card body-class="p-1">
      <h3>Take over partial billing items from previous year</h3>
    </b-card>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(filterTable)">
        <b-row>
          <b-col v-for="(field,index) in filters" :key="index" cols="12" md="4" lg="3">
            <field ref="fields" :entity="filterData" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <div class="d-flex my-2 justify-content-end">
      <b-button class="mr-1" variant="primary" @click="filterTable">
        <span>Show Invoice Positions</span>
      </b-button>
      <b-button v-if="show" class="mr-1" variant="primary" @click="transfer">
        <b-spinner v-if="transfering" small/>
        <span>Submit and transfert to invoice</span>
      </b-button>
    </div>

    <template v-if="show">
      <h3 class="mb-1">Please select the partial billing items and data you want to transfer:</h3>
      <b-card>
        <b-table ref="table" striped hover responsive :busy.sync="loading" :per-page="perPage"
                 :current-page="currentPage" :items="provider" :fields="fields" :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc" :sort-direction="sortDirection" select-mode="multi">
          <template #cell(__selected)="data">
            <b-form-checkbox v-if="currentItems[data.index]" v-model="currentItems[data.index].__selected"/>
          </template>
          <template #head(__selected)>
            <b-form-checkbox v-model="selected"/>
          </template>
          <template #head()="data">
            <div class="d-flex">
              <b-form-checkbox v-model="columnSelected[data.field.key]"/>
              <span>{{ data.label }}</span>
            </div>
          </template>
          <template #cell()="data">
            <div class="d-flex" v-if="data.value">
              <b-form-checkbox v-model="data.item.meta[data.field.key]"/>
              <span>{{ data.value }}</span>
            </div>
          </template>
        </b-table>
      </b-card>
    </template>
  </div>
</template>

<script>
import { BButton, BCard, BTable, BRow, BFormCheckbox, BForm, BCol, BSpinner } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field.vue';

export default {
  name: 'InvoicePositionImport',
  components: {
    Field,
    BButton,
    BCard,
    BTable,
    BRow,
    BFormCheckbox,
    BCol,
    BForm,
    BSpinner,
  },
  data() {
    return {
      filterData: {},
      loading: false,
      transfering: false,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      columnSelected: {
        invoiceposition_name: false,
        invoiceposition_costtype_invoice: false,
        costtype_name: false,
        externalcosttype_name: false,
        unit_name: false,
        invoiceposition_flat_rate: false,
        invoiceposition_apportionable: false,
        invoiceposition_total_units: false,
        invoiceposition_units_customer: false,
        invoiceposition_amount_total: false,
        invoiceposition_amount_customer: false,
      },
      fields: [
        { key: '__selected', __selected: false },
        { key: 'invoiceposition_name', __selected: false },
        { key: 'invoiceposition_costtype_invoice', __selected: false },
        {
          key: 'costtype_name',
          __selected: false,
        },
        {
          key: 'externalcosttype_name',
          __selected: false,
        },
        {
          key: 'unit_name',
          __selected: false,
        },
        { key: 'invoiceposition_flat_rate', type: 'boolean', __selected: false },
        { key: 'invoiceposition_apportionable', type: 'boolean', __selected: false },
        { key: 'invoiceposition_total_units', type: 'number', __selected: false },
        { key: 'invoiceposition_units_customer', type: 'number', __selected: false },
        { key: 'invoiceposition_amount_total', type: 'number', __selected: false },
        { key: 'invoiceposition_amount_customer', type: 'number', __selected: false },
      ],
      currentItems: [],
      selected: false,
      perPage: 1000,
      currentPage: 1,
      filters: [
        {
          key: 'customergroup_id',
          type: 'list',
          list: 'customergroup',
          listLabel: 'customergroup_name',
          required: false,
        },
        {
          key: 'company_id',
          type: 'list',
          list: 'frontend_2_2_3_1',
          listLabel: 'company_name',
          filter_key: 'customergroup_id',
          required: false,
        },
        {
          key: 'pos_id',
          type: 'list',
          list: 'frontend_2_1_3_8',
          listLabel: 'pos_name',
          filter_key: 'company_id',
          required: false,
        },
        {
          key: 'contract_id',
          listLabel: 'contract_name',
          type: 'list',
          list: 'frontend_4_2_1_contract_selector',
          filter_key: 'pos_id',
          required: false,
        },
        // { key: 'location_id', type: 'list', list: 'location', listLabel: 'location_name' },
        { key: 'invoice_contract_year', type: 'number' },
        { key: 'invoice_id', type: 'list', list: 'invoice', listLabel: 'invoice_name' },
        // { key: 'area_id', type: 'list', list: 'area', listLabel: 'area_name' },
      ],
      show: false,
    }
  },
  watch: {
    selected(val) {
      this.currentItems.forEach(item => {
        this.$set(item, '__selected', val)
      })
    },
  },
  mounted() {
    Object.keys(this.columnSelected).map(key => {
      this.$watch(`columnSelected.${key}`, val => {
        console.log('change', key, val)
        this.currentItems.map(item => {
          this.$set(item.meta, key, val)
        })
      })
    })
  },
  methods: {
    filterTable() {
      if (this.show) this.$refs.table.refresh()
      else this.show = true
    },
    async transfer() {
      const invoice_id = this.$route.params.invoice
      const selectedItems = this.currentItems.filter(item => {
        return Object.keys(item.meta).findIndex(key => item.meta[key]) >= 0
      })
      const data = selectedItems.map(item => {
        const el = {}
        Object.keys(item.meta).forEach(key => {
          if (item.meta[key]) el[key] = item[key]
          else if (['invoiceposition_total_units', 'invoiceposition_flat_rate',
            'invoiceposition_units_customer', 'invoiceposition_amount_total', 'invoiceposition_amount_customer'].indexOf(key) >= 0) {
            el[key] = 0
          } else if (['invoiceposition_name', 'invoiceposition_costtype_invoice'].indexOf(key) >= 0) {
            el[key] = 'Temporary'
          } else {
            el[key] = ''
          }
        })
        return el
      })
      this.transfering = true
      try {
        const response = await this.$api({
          entity: 'invoiceposition',
          action: 'create',
          data,
        })

        const relations = response.data.data.data
          .filter(item => !!item[0])
          .map(item => {
            return {
              invoice_id,
              invoiceposition_id: item[0].invoiceposition_id,
            }
          })

        await this.$api({
          action: 'create',
          entity: 'invoice_invoiceposition_rel',
          data: relations,
        })

        const typeRel = []
        response.data.data.data.forEach((el, idx) => {
          if (!el[0]) return
          if (selectedItems[idx].meta.costtype_name && selectedItems[idx].costtype_id) {
            typeRel.push({
              costtype_id: selectedItems[idx].costtype_id,
              invoiceposition_id: el[0].invoiceposition_id,
            })
          }
        })
        // create costtype relation
        if (typeRel.length) {
          await this.$api({
            action: 'create',
            entity: 'invoiceposition_costtype_rel',
            data: typeRel,
          })
        }

        const externalRel = []
        response.data.data.data.forEach((el, idx) => {
          if (!el[0]) return
          if (selectedItems[idx].meta.externalcosttype_name && selectedItems[idx].externalcosttype_id) {
            externalRel.push({
              externalcosttype_id: selectedItems[idx].externalcosttype_id,
              invoiceposition_id: el[0].invoiceposition_id,
            })
          }
        })

        // create externalcosttype relation
        if (externalRel.length) {
          await this.$api({
            action: 'create',
            entity: 'invoiceposition_externalcosttype_rel',
            data: externalRel,
          })
        }

        const unitRel = []
        response.data.data.data.forEach((el, idx) => {
          if (!el[0]) return
          if (selectedItems[idx].meta.unit_name && selectedItems[idx].unit_id) {
            unitRel.push({
              unit_id: selectedItems[idx].unit_id,
              invoiceposition_id: el[0].invoiceposition_id,
            })
          }
        })

        // create unit relation
        if (unitRel.length) {
          await this.$api({
            action: 'create',
            entity: 'invoiceposition_unit_rel',
            data: unitRel,
          })
        }

        await this.$router.push({ name: 'table-view', params: { table: 'invoice', id: invoice_id }, query: { tab: 5 } })
      } finally {
        this.transfering = false
      }
    },
    provider(ctx) {
      const {
        currentPage, perPage, filter, sortBy, sortDesc,
      } = ctx
      const payload = {
        action: 'read-rich',
        entity: 'frontend_4_4_1',
        order_by: sortBy,
        order_dir: sortDesc ? 'DESC' : 'ASC',
        per_page: perPage,
        from: 0,
        current_page: currentPage,
        filter: this.filterData,
        filter_all: filter ?? '',
        lang: this.$i18n.locale,
      }
      return this.$api(payload)
        .then(({ data }) => {
          console.log(data)
          data.data.data.forEach(el => {
            el.__selected = false
            el.meta = {}
            Object.keys(this.columnSelected).map(key => {
              el.meta[key] = false
            })
          })
          this.$store.commit('table/setDefinition', data)
          this.currentItems = data.data.data
          this.currentItems.forEach(item => {
            this.$watch(() => item.__selected, val => {
              Object.keys(item.meta).map(key => this.$set(item.meta, key, val))
            })
          })
          return this.currentItems
        })
        .catch(e => {
          console.log(e)
          const title = e.response?.data.detail
          this.$errorToast(title)
          return null
        })
    },
  },
}
</script>

<style scoped>

</style>
