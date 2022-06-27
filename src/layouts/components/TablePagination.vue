<template>
  <div class="d-flex justify-content-between" style="padding: 10px">
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
      <div class="mr-1 d-flex">
        <b-button v-if="onNewElement!=null" @click="onNewElement" size="sm" variant="info" class="mr-1 d-flex">
          <img src="@/assets/images/pages/plusIcons.svg" alt="">
          new
        </b-button>
        <b-button v-if="onDeleteElements!=null" @click="onDeleteElements" size="sm" class="d-flex" variant="primary">
          <img src="@/assets/images/pages/deleteIcons.svg" alt="">
          Delete
        </b-button>
      </div>

      <div size="sm" class="d-flex align-items-center">
        <label class="d-inline-block text-sm-left mr-50">Search</label>
        <b-form-input debounce="500" id="filterInput" v-model="search" type="search" placeholder="Search.."/>
      </div>
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
    pageOptions: {
      type: Array,
      default() {
        return [10,20,30]
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    search: {
      get() {
        return this.$store.state.table.search
      },
      set(val) {
        this.$store.state.table.search = val
      },
    },
    perPage: {
      get() {
        return this.$store.state.table.perPage
      },
      set(val) {
        this.$store.state.table.perPage = val
      },
    },
    totalRows: {
      get() {
        return this.$store.state.table.totalRows
      },
      set(val) {
        this.$store.state.table.totalRows = val
      },
    },
    currentPage: {
      get() {
        return this.$store.state.table.currentPage
      },
      set(val) {
        this.$store.state.table.currentPage = val
      },
    },
  },

}
</script>

<style scoped>

</style>
