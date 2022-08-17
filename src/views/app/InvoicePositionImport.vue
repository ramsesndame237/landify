<template>
  <div>
    <h3>
      Main Heading </h3>
    <b-card>
      <h3>Take over partial billing items from previous year</h3>
    </b-card>
    <b-row>

    </b-row>
    <div class="d-flex justify-content-end">
      <b-button class="mr-1" size="sm" variant="primary">
        <span>Show Invoice Positions</span>
      </b-button>
      <b-button class="mr-1" size="sm" variant="primary">
        <span>Submit and transfert to invoice</span>
      </b-button>
    </div>

    <h3>Please select the partial billing items and data you want to transfer:</h3>
    <b-card>
      <b-table ref="table" striped hover responsive :busy.sync="loading" :per-page="perPage" :current-page="currentPage"
               :items="provider" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
               :sort-direction="sortDirection" select-mode="multi">
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
          <div class="d-flex">
            <b-form-checkbox v-model="data.item.meta[data.field.key]"/>
            <span>{{ data.value }}</span>
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BButton, BCard, BTable, BRow, BFormCheckbox } from 'bootstrap-vue'
import { ref } from "@vue/composition-api";

export default {
  name: 'InvoicePositionImport',
  components: {
    BButton,
    BCard,
    BTable,
    BRow,
    BFormCheckbox,
  },
  data() {
    return {
      loading: false,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      columnSelected: {
        invoiceposition_name: false,
        invoiceposition_costtype_invoice: false,
        costtype_id: false,
        invoiceposition_flat_rate: false,
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
          key: 'costtype_id',
          type: 'list',
          list: 'costtype',
          listLabel: 'costtype_name',
          hideOnIndex: true,
          __selected: false,
        },
        { key: 'invoiceposition_flat_rate', type: 'boolean', __selected: false },
        { key: 'invoiceposition_total_units', type: 'number', __selected: false },
        { key: 'invoiceposition_units_customer', type: 'number', __selected: false },
        { key: 'invoiceposition_amount_total', type: 'number', __selected: false },
        { key: 'invoiceposition_amount_customer', type: 'number', __selected: false },
      ],
      currentItems: [],
      selected: false,
      perPage: 1000,
      currentPage: 1,
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
    provider(ctx) {
      const {
        currentPage, perPage, filter, sortBy, sortDesc,
      } = ctx
      const payload = {
        action: 'read-rich',
        entity: 'invoiceposition',
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
            el.__selected = ref(false)
            el.meta = {}
            Object.keys(el).map(key => {
              el.meta.key = false
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
