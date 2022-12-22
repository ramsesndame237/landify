<template>
  <div class="d-flex justify-content-between flex-wrap" style="padding: 10px">
    <b-form-group class="mb-0">
      <label class="d-inline-block text-sm-left mr-50">Show</label>
      <b-form-select id="perPageSelect" v-model="perPage" style="width: 60px" size="sm" :options="pageOptions"
                     class="w-10"/>
      <label class="d-inline-block text-sm-left ml-50">Entries</label>
    </b-form-group>

    <div class="d-flex align-items-center">
      <span class="mr-1">show {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(perPage * currentPage, totalRows) }}
        of {{ totalRows }} entries
      </span>
      <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" class="my-0"
                    first-number last-number prev-class="prev-item" next-class="next-item"/>
    </div>

    <div class="d-flex align-items-center">
      <b-button v-if="withFilter" @click="$emit('filter')" size="sm" variant="primary" class="mr-1 btn-icon">
        <feather-icon icon="FilterIcon"/>
      </b-button>
      <b-button v-if="onNewElement!=null && canCreate" @click="onNewElement" size="sm" variant="info" class="mr-1">
        <feather-icon icon="PlusCircleIcon" class="mr-50"/>
        <span>{{ $t('button~new') }}</span>
      </b-button>
      <b-button v-if="onDeleteElements!=null && canDelete" @click="onDeleteElements" size="sm" variant="primary"
                class="mr-1">
        <feather-icon icon="Trash2Icon" class="mr-50"/>
        <span>{{ $t('button~delete') }}</span>
      </b-button>
      <b-form-input debounce="500" id="filterInput" v-model="internalSearch" type="search" class="w-auto"
                    placeholder="Search.."/>
    </div>

  </div>
</template>

<script>
import {
  BFormGroup,
  BFormSelect,
  BFormInput,
  BPagination,
  BButton,
} from 'bootstrap-vue'

export default {
  name: 'TablePagination',
  components: {
    BFormGroup,
    BFormSelect,
    BFormInput,
    BPagination,
    BButton,
  },
  props: {
    onNewElement: Function,
    onDeleteElements: Function,
    withFilter: Boolean,
    pageOptions: {
      type: Array,
      default() {
        return [10, 30, 100, { text: 'All', value: 100000 }]
      },
    },
    perPage: Number,
    currentPage: Number,
    search: String,
    totalRows: Number,
    entity: String,
  },
  data() {
    return { internalSearch: this.search }
  },
  computed: {
    canDelete() {
      return this.$can('delete', this.entity)
    },
    canCreate() {
      return this.$can('create', this.entity)
    },
  },
  watch: {
    internalSearch() {
      this.$emit('update:search', this.internalSearch)
    },
    perPage() {
      this.$emit('update:perPage', this.perPage)
    },
    currentPage() {
      this.$emit('update:currentPage', this.currentPage)
    },
  },
}
</script>

<style scoped>

</style>
