<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :total-rows="totalRows">
        <!--        <div class="d-flex justify-content-end flex-wrap" style="padding: 10px">-->
        <b-button variant="primary" @click="$refs.table.refresh()">
          Refresh
        </b-button>
        <div class="mx-1">
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
        </div>
        <!--                <b-form-input v-model="search" id="filterInput" debounce="500" type="search" class="w-auto"-->
        <!--                              placeholder="Search.."/>-->
        <!--        </div>-->
      </table-pagination>
      <!--      <generic-filter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"/>-->
    </b-card>
    <b-card class="mt-2">
      <div class="d-flex justify-content-between">
        <h5>New Emails</h5>
        <div>
          Sorting:

        </div>
      </div>
      <mail-table ref="table" :filter-value="filterValue" :search="search" :per-page="perPage"
                  :current-page.sync="currentPage" :total-rows.sync="totalRows"/>
    </b-card>

  </div>
</template>

<script>
import TablePagination from '@/layouts/components/TablePagination'
import MailTable from '@/layouts/components/MailTable'

export default {
  name: 'IncomingMails',
  components: {
    MailTable, TablePagination,
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
      table: this.$route.params.table,
      ids: this.$route.params.ids,
      definition: {
        filters: [{
          key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name',
        }],
      },
      filterValue: 0,
      filterOptions: [
        { text: 'All mails', value: null },
        { text: 'Not processed', value: 0 },
        { text: 'Processed', value: 1 },
        { text: 'In Progress', value: 2 },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>
