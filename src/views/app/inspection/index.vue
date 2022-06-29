<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between text-uppercase"
        style="padding: 10px"
      >
        <div>
          {{ $t('app.content.inspections_main_heading') }}
        </div>
        <div class="d-flex align-items-center justify-end">
          <div class="mr-1 d-flex">
            <b-button
              size="sm"
              variant="warning"
              class="mr-1 d-flex"
            >
              {{ $t('app.btn.filter_inspection_result') }} 
            </b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="info"
              @click="downloadFile()"
            >
              {{ $t('app.btn.export_csv') }}
            </b-button>
          </div>
        </div>
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
          :label="$t('app.form.label.user_id')"
          label-for="user_id"
        >
          <b-form-select
            id="user_id"
            :disabled="view"
            name="user_id"
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
          :label="$t('app.form.label.country_id')"
          label-for="country_id"
        >
          <b-form-select
            id="country_id"
            :disabled="view"
            name="country_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="`${$t('app.form.label.invoice_date')} / ${$t('app.form.label.invoice_contract_year')}`"
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
          :label="$t('app.form.label.saving_type_id')"
          label-for="saving_type_id"
        >
          <b-form-select
            id="saving_type_id"
            :disabled="view"
            name="saving_type_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.inspectionresult_realised')"
          label-for="inspectionresult_realised"
        >
          <b-form-select
            id="inspectionresult_realised"
            :disabled="view"
            name="inspectionresult_realised"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.board_id')"
          label-for="board_id"
        >
          <b-form-select
            id="board_id"
            :disabled="view"
            name="board_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.costype_id')"
          label-for="costype_id"
        >
          <b-form-select
            id="costype_id"
            :disabled="view"
            name="costype_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.contradictionpackage_id')"
          label-for="contradictionpackage_id"
        >
          <b-form-select
            id="contradictionpackage_id"
            :disabled="view"
            name="contradictionpackage_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.partner_company_id')"
          label-for="partner_company_id"
        >
          <b-form-select
            id="partner_company_id"
            :disabled="view"
            name="partner_company_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.partner_company_id')"
          label-for="partner_company_id"
        >
          <b-form-select
            id="partner_company_id"
            :disabled="view"
            name="partner_company_id"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.inspectionresult_unique_or_perennial')"
          label-for="inspectionresult_unique_or_perennial"
        >
          <b-form-select
            id="inspectionresult_unique_or_perennial"
            :disabled="view"
            name="inspectionresult_unique_or_perennial"
          />
        </b-form-group>
      </div>
      <div class=" col-md-3 sol-sm-6 col-12 ">
        <b-form-group
          :label="$t('app.form.label.inspectionresult_legally_clear')"
          label-for="inspectionresult_legally_clear"
        >
          <b-form-select
            id="inspectionresult_legally_clear"
            :disabled="view"
            name="inspectionresult_legally_clear"
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

import exportFromJSON from "export-from-json"

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
      view:true,
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
    downloadFile() {
      const data = this.items
      const fileName = "inspections results"
      const exportType = exportFromJSON.types.csv
      if (data) exportFromJSON({ data, fileName, exportType })
    },
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
