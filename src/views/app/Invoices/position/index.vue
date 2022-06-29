<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between text-uppercase"
        style="padding: 10px"
      >
        {{ $t('app.content.invoceposition_main_heading') }}
      </div>
    </b-card>
    <b-card body-class="p-1 row">
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.customer_group_id')"
          label-for="group_id"
        >
          <b-form-select
            id="group_id"
            :disabled="view"
            name="Customergroup_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.company_id')"
          label-for="company_id"
        >
          <b-form-select
            id="company_id"
            :disabled="view"
            name="company_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.location_id')"
          label-for="location_id"
        >
          <b-form-select
            id="location_id"
            :disabled="view"
            name="location_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.pos_id')"
          label-for="pos_id"
        >
          <b-form-select
            id="group_id"
            :disabled="view"
            name="Customergroup_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.contract_id')"
          label-for="contract_id"
        >
          <b-form-select
            id="contract_id"
            :disabled="view"
            name="contract_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.invoice_contract_year')"
          label-for="invoice_contract_year"
        >
          <b-form-select
            id="invoice_contract_year"
            :disabled="view"
            name="invoice_contract_year"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.invoice_id')"
          label-for="invoice_id"
        >
          <b-form-select
            id="invoice_id"
            :disabled="view"
            name="invoice_id"
            type="text"
          />
        </b-form-group>
      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link_view="ancillary-incoive-position-edit"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
      />
    </b-card>
  </div>
</template>

<script>

import {
  BButton,
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
  BPagination,
  BInputGroup,
} from 'bootstrap-vue'

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    Databases,
    BButton,
    BFormGroup,
    BPagination,
    BCard,
    BFormSelect,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
  },
  data() {
    return {
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      pageOptions: [3, 5, 10],
      sortDirection: 'asc',
      sortBy: '',
      sortDesc: false,
      items: [
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          company_group: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          company_group: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          company_group: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: 'Something',
        },

      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'company_name', label: 'Invoice_id', sortable: true },
        { key: 'company_id', label: 'Invoice_date', sortable: true },
        { key: 'company_group', label: 'Invoice_contract_year', sortable: true },
        { key: 'city', label: 'Invoice_company_name', sortable: true },
        { key: 'phone', label: 'invoice_allocationarea', sortable: true },
        { key: 'mail', label: 'invoice_payment_date', sortable: true },
        { key: 'contact_partner', label: 'customergroup_name ', sortable: true },
        { key: 'partnercompany_name', label: 'partnercompany_name ', sortable: true },
        { key: 'partnercompany_name', label: 'partnercompany_name ', sortable: true },
        'Action',
      ],
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      filter: null,
      customerGroupOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
      ],
      newCompany: {
        customerGroupId: null,
        companyId: null,
        companyName: null,
        addressId: null,
        contactDetailId: null,
        bankDataId: null,
      },
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>
</style>
