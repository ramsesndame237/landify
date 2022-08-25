<template>
  <b-row>
    <b-col :cols="create?6:4">
      <div class="bg-white d-flex justify-content-between align-items-center p-1">
        <h4 class="mb-0">{{ $t(title) }}</h4>
        <div class="mr-1 d-flex">
          <b-button v-if="view" size="sm" variant="info" class="mr-1" @click="edit">
            <feather-icon icon="EditIcon" class="mr-50"/>
            {{ $t('Edit') }}
          </b-button>
          <b-button v-else size="sm" variant="info" class="mr-1" @click="update" :disabled="loading">
            <b-spinner v-if="loading" small class="mr-50"/>
            <feather-icon v-else icon="SaveIcon" class="mr-50"/>
            {{ $t('Save') }}
          </b-button>
          <b-button v-if="!view" size="sm" variant="primary" @click="cancel">
            {{ $t('Cancel') }}
          </b-button>
        </div>
      </div>

      <b-card class="mt-2">
        <entity-form ref="form" :table="table" :definition="definition" :table-definition-key="table" :create="create"
                     :is-relation="false" :disabled="view" :inline="false" :cols="6" :initial-data="entity"
                     :entity-id="entityId"/>
      </b-card>
<!--      <b-card class="mt-2" v-if="!create">-->
<!--        <div class="d-flex justify-content-between align-items-center mb-1">-->
<!--          <h4>Filter Contradictions</h4>-->
<!--          <b-button variant="info" >Filter</b-button>-->
<!--        </div>-->
<!--        <field v-for="(field,idx) in filterFields" :key="idx" :field="field" :entity="filterData"/>-->
<!--      </b-card>-->
    </b-col>
    <b-col cols="4" v-if="!create">
      <div class="bg-white d-flex justify-content-between align-items-center p-1">
        <h4 class="mb-0">Allocated Contradictions</h4>
        <b-button variant="primary" size="sm">Remove</b-button>
      </div>
      <b-card class="mt-2">
        <data-tables ref="allocated" :current-page="1" :per-page="100" :with-actions="false"
                     entity="contradictionpackage_contradiction_rel" :second-key="primaryKey"
                     :second-key-value="entityId" :fields="contradictionFields" style="max-height: 400px" class="mb-1"/>
      </b-card>
      <b-button variant="info" class="btn-block" @click="showDetail=!showDetail">
        {{ (showDetail ? 'Hide' : 'Show') + ' contradictions details' }}
      </b-button>

    </b-col>
    <b-col cols="4" v-if="!create">
      <div class="bg-white p-1 d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Available contradictions</h4>
        <b-button size="sm" variant="primary" class="mr-1 btn-icon" @click="$refs.filter.openModal()">
          <feather-icon icon="FilterIcon"/>
        </b-button>
        <generic-filter ref="filter" :table="table" :definition="contradictionDefinition"
                        @filter="filter" vertical="true"/>
      </div>
      <b-card class="mt-2">
        <data-tables ref="contradictions" :current-page="1" :per-page="100" :with-actions="false" entity="contradiction"
                     :fields="contradictionFields" style="max-height: 400px" class="mb-1"/>
      </b-card>
      <b-button variant="info" class="btn-block" :disabled="loadingContradictions" @click="addContradictions">
        <b-spinner v-if="loadingContradictions" small class="mr-50"/>
        <span>Add Contradictions</span>
      </b-button>

    </b-col>
    <b-col cols="12" v-if="!create && showDetail">
      <div class="bg-white d-flex justify-content-between align-items-center p-1">
        <h4 class="mb-0">Package-Contradiction-Contradiction Points Details</h4>
        <b-form-input v-model="search" debounce="500" id="filterInput" type="search" class="w-auto"
                      placeholder="Search.."/>
      </div>
      <b-card class="mt-2">
        <data-tables ref="contradictionpoints" :current-page="1" :per-page="100" :with-edit="false" :with-delete="false"
                     entity-view="ticket_id" entity="contradictionpoint" :fields="contradictionpointFields"
                     :second-key="primaryKey" :second-key-value="entityId" :search="search" style="max-height: 400px"
                     class="mb-1"/>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import EditPageMixin from "@/views/app/Generic/EditPageMixin";
import { BRow, BCol, BCard, BButton, BFormInput, BSpinner } from "bootstrap-vue";
import EntityForm from "@/views/app/Generic/EntityForm";
import Field from "@/views/app/Generic/Field";
import DataTables from "@/layouts/components/DataTables";
import Table from '@/table'
import GenericFilter from '../Generic/Filter.vue';

export default {
  name: 'ContradictionPackage',
  mixins: [EditPageMixin],
  components: { DataTables, Field, EntityForm, BRow, BCol, BCard, BButton, BFormInput, BSpinner, GenericFilter },
  data() {
    return {
      contradictionFields: Table.contradiction.fields.slice(0, 2),
      contradictionpointFields: [
        { key: 'ticket_name' },
        { key: 'ticket_id' },
        { key: 'column_name' },
        { key: 'location_name' },
        { key: 'pos_name' },
        { key: 'invoice_contract_year' },
        { key: 'ticket_deadline' },
        { key: 'ticket_deadline_offset' },
        { key: 'contradiction_sum' },
      ],
      contradictionDefinition: Table.contradiction,
      filterData: {},
      showDetail: false,
      filterFields: [
        { key: 'customergroup_id', type: 'list', list: 'customergroup', listLabel: 'customergroup_name' },
        { key: 'company_id', type: 'list', list: 'company', listLabel: 'company_name' },
        { key: 'partnercompany_id', type: 'list', list: 'partnercompany', listLabel: 'partnercompany_name' },
        { key: 'invoice_contract_year_from', type: 'number' },
        { key: 'invoice_contract_year_to', type: 'number' },
      ],
      search: '',
      loadingContradictions: false,
    }
  },
  watch: {
    filterData: {
      handler() {
        this.$refs.contradictions.filter(this.filterData)
      },
      deep: true,
    },
  },
  methods: {
    async addContradictions() {
      const selected = this.$refs.contradictions.getSelected()
      if (selected.length === 0) {
        this.$errorToast('No element selected')
        return
      }
      const contradictions = this.$refs.allocated.currentItems
      const toPush = selected.filter(item => {
        return contradictions.findIndex(c => c.contradiction_id === item.contradiction_id) === -1
      })
      this.loadingContradictions = true
      await this.$api({
        entity: 'contradictionpackage_contradiction_rel',
        action: 'create',
        data: toPush.map(item => ({
          contradictionpackage_id: this.entityId,
          contradiction_id: item.contradiction_id,
        })),
      })
      this.loadingContradictions = false
      this.$refs.allocated.reload()
      this.$refs.contradictions.deselectAll()
    },
    removeContradictions() {
      this.$refs.allocated.deleteSelected()
      if (this.showDetail) {
        // refresh table
      }
    },
    filter(data) {
      console.log('on filter', data)
      this.currentPage = 1
      this.$refs.contradictions.filter(data)
    },
  },
  computed: {
    table() {
      return this.$route.params.table
    },
  },
}
</script>

<style scoped>

</style>
