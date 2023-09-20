<template>
  <div class="">
    <div class="d-flex justify-content-between my-1">
      <div v-if="withSize" class="">
        <b-form-group class="mb-0">
          <b-form-select id="perPageSelect" v-model="perPage" size="lg" :options="size"
                         class="w-10"/>
        </b-form-group>
      </div>
      <div v-if="withSearch">
        <b-form-group>
          <b-form-input id="filterInput" v-model="search" size="lg" debounce="500" type="search" class="w-auto"
                        placeholder="Search.."/>
        </b-form-group>
      </div>
    </div>
    <div class="">
      <data-tables :selectable="withSelect" :second-key-value="entityId" :current-page.sync="currentPage"
                   :per-page="perPage" :total-rows.sync="totalRows" :primary-key-column="definition.primaryKey"
                   :entity="definition.entity" :search="search" :entity-form="definition.entityForm"
                   :entity-view="definition.entityView" :with-view="true" :with-actions="false"
                   :fields="definition.fields" :default-sort-column="sortColumnBy" :default-sort-desc="sortColumnDesc"
                   :initial-filter="initialFilter" :entity-endpoint="definition.entityEndpoint"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between mt-2">
      <b-card-text>
        <label class="font-small-3 text-muted">Showing {{ currentPage }} to {{ perPage }} of {{ totalRows }}
          entries</label>
      </b-card-text>
      <b-pagination v-model="currentPage" size="lg" prev-text="Previous" next-text="Next" :total-rows="totalRows"
                    :per-page="perPage" first-number last-number />
    </div>
  </div>
</template>
<script>
import DataTables from '@/layouts/components/DataTables.vue'

export default {
  name: 'CompactDataTables',
  components: { DataTables },
  props: {
    withSize: {
      type: Boolean, default: true,
    },
    withSearch: {
      type: Boolean, default: true,
    },
    withPagination: {
      type: Boolean, default: true,
    },
    withActions: {
      type: Boolean, default: true,
    },
    size: {
      type: Array, default: () => [5, 10, 30, 100, { text: 'All', value: 100000 }],
    },
    sortColumnBy: { type: String, require: false },
    sortColumnDesc: { type: Boolean, default: false },
    definition: Object,
    entityId: String,
    withSelect: {
      type: Boolean, default: true,
    },
    initialFilter: Object,
  },
  data() {
    return {
      search: '',
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      formLoaded: false,
      noBody: false,
      showTool: true,
    }
  },
}
</script>
