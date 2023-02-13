<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :search.sync="search" :per-page.sync="perPage" :current-page.sync="currentPage" :entity="table"
                        :total-rows="totalRows" :with-filter="definition.filters && definition.filters.length > 0"
                        @filter="$refs.filter.openModal()">
        <div class="mr-1">
          <b-form-select v-model="filterValue" placeholder="Select an option" :options="filterOptions"/>
        </div>
      </table-pagination>
      <generic-filter ref="filter" :table="table" :definition="definition" :initial-data="initialFilterData"/>
    </b-card>
    <b-row class="mt-2">
      <summary-card :title="$t('NKA Invoice Tickets created')" color="#343a40" :percent="(10*100/40).toFixed(0)"
                    :number="10" variant="dark" cols="3"/>
      <summary-card :title="$t('Contract Tickets created')" color="#FF7A00" :percent="(10*100/40).toFixed(0)"
                    :number="10" variant="warning" cols="3"/>
      <summary-card :title="$t('Facility Man. Tickets created')" color="#D51130" :percent="(10*100/40).toFixed(0)"
                    :number="10" variant="danger" cols="3"/>
      <summary-card :title="$t('incoming mails dismissed')" color="#D51130" :percent="(10*100/40).toFixed(0)"
                    :number="10" variant="danger" cols="3"/>
    </b-row>
    <b-card class="mt-2">
      <div class="d-flex justify-content-between">
        <h5>New Emails</h5>
        <div>
          Sorting:

        </div>
      </div>
      <mail-table :search="search" :per-page="perPage" :current-page.sync="currentPage" :total-rows.sync="totalRows"/>
    </b-card>

  </div>
</template>

<script>
import TablePagination from "@/layouts/components/TablePagination";
import GenericFilter from "@/views/app/Generic/Filter";
import MailTable from "@/layouts/components/MailTable";
import Field from "@/views/app/Generic/Field";
import SummaryCard from "@/views/app/CustomComponents/SummaryCard";

export default {
  name: 'IncomingMails',
  components: { SummaryCard, Field, MailTable, GenericFilter, TablePagination },
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
        filters: [{ key: 'ticket_id', type: 'list', list: 'ticket', listLabel: 'ticket_name' }],
      },
      filterValue: 0,
      filterOptions: [
        { text: 'All mails', value: 0 },
        { text: 'New', value: 1 },
        { text: 'Not processed', value: 2 },
      ],
    }
  },
  methods: {},
}
</script>

<style scoped>

</style>
