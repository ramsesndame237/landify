<template>
  <div>
    <b-card-actions title="Filter" action-collapse>
      <div class="d-flex align-items-center">
        <b-form-input debounce="500" id="filterInput" v-model="search" type="search" class="w-auto"
                      placeholder="Search.."/>
      </div>

      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(filter)">
          <b-row>
            <b-col v-for="(field,index) in definition.filters" :key="index" cols="12" :md="6">
              <field ref="fields" :entity="data" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <template v-slot:card-footer>
        <b-button variant="secondary" @click="$refs.modal.hide()">
          Cancel
        </b-button>
        <b-button variant="info" @click="reset">
          Reset
        </b-button>
        <b-button variant="primary" @click="filter">
          Apply
        </b-button>
      </template>
    </b-card-actions>

    <b-card>
      <Datatable :key="table" ref="table" :search="search" :entity="table" :entity-list="definition.entity"
                 :with-delete="false" :with-edit="false" :per-page="perPage" :current-page.sync="currentPage"
                 :total-rows.sync="totalRows" :fields="definition.fields" :items="items"/>
    </b-card>
  </div>
</template>

<script>

import {
  BCard, BButton, BFormInput, BForm, BRow, BCol,
} from 'bootstrap-vue'
import Tables from '../../../table'
import GenericFilter from '../Generic/Filter.vue'
import BCardActions from "@core/components/b-card-actions/BCardActions";
import Field from "@/views/app/Generic/Field";

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
    BForm,BRow,BCol
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
    }
  },
  computed: {
    definition() {
      return Tables[this.table]
    },
  },
  beforeDestroy() {
    this.$store.commit('table/setTableData', {
      table: this.table,
      payload: {
        search: this.search,
        currentPage: this.currentPage,
        perPage: this.perPage,
        totalRows: this.totalRows,
        filter: { ...this.$refs.filter.data },
        sortBy: this.$refs.table.sortBy,
        sortDesc: this.$refs.table.sortDesc,
      },
    })
  },
  methods: {
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.table.filter(data)
    },
    reset() {
      this.filter({})
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
