<template>
  <div>
    <b-card body-class="p-0"> 
      <div
        class="d-flex align-items-center justify-content-between"
        style="padding: 10px"
      >
        <div class="d-flex">
          <img
            src="@/assets/images/icons/team.svg"
            alt=""
            class="mr-1"
          >
          <span>
              {{ $t('app.content.invoice_ancillary_edit') }}
          </span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-if="view"
              size="sm"
              variant="info"
              class="mr-1 d-flex justify-content-center align-items-center"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              {{ $t('app.btn.edit') }}
            </b-button>
            <b-button
              v-else
              size="sm"
              variant="info"
              class="mr-1 d-flex justify-content-center align-items-center"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              {{ $t('app.btn.save') }}
            </b-button>
            <b-button
              v-if="!view"
              size="sm"
              class="d-flex justify-content-center align-items-center"
              variant="primary"
              @click="view = !view"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.cancel') }}
              </b-button>
            <div
              size="sm"
              class="ml-4 d-flex align-items-center"
            >
              <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
              <b-form-input
                id="search"
                v-model="filter"
                type="search"
                :placeholder="$t('app.search.palceholder')"
              />
            </div>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <b-col
            cols="12"
            md="6"
          >
            <b-row>
              <div
                class="d-flex col-12 justify-content-between font-weight-bolder"
              >
                 <span> {{ $t('app.form.label.ticket_id') }} </span>
                 <span> TA-788645</span>
              </div>

              <div
                class="d-flex col-12 justify-content-between font-weight-bolder"
              >
                 <span> {{ $t('app.form.label.invoice_id') }} </span>
                 <span> 123</span>
              </div>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.invoice_company_name') "
                  label-for="invoice_company_name"
                >
                  <b-form-input
                    id="invoice_company_name"
                    type="text"
                    readonly
                    name="invoice_company_name"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6" md="3">
                <b-form-group
                  :label=" $t('app.form.label.invoice_date_of_order') "
                  label-for="invoice_date_of_order"
                >
                  <b-form-datepicker
                    id="invoice_date_of_order"
                    type="text"
                    :disabled="view"
                    name="invoice_date_of_order"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6" md="3">
                <b-form-group
                  :label=" $t('app.form.label.invoice_date') "
                  label-for="invoice_date"
                >
                  <b-form-datepicker
                    id="invoice_date"
                    :disabled="view"
                    name="invoice_date"
                    class="w-10 mr-3"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.partner_type_id') "
                  label-for="partner_type_id"
                >
                  <b-form-select
                    id="partner_type_id"
                    :disabled="view"
                    name="partner_type_id"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.invoice_contract_year') "
                  label-for="invoice_contract_year"
                >
                  <b-form-select
                    id="invoice_contract_year"
                    :disabled="view"
                    name="invoice_contract_year"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.invoice_allocationarea') "
                  label-for="invoice_allocationarea"
                >
                  <b-form-input
                    id="invoice_allocationarea"
                    :disabled="view"
                    name="invoice_allocationarea"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6" md="3">
                <b-form-group
                  :label=" $t('app.form.label.invoice_contract_billing_period_from_date') "
                  label-for="invoice_contract_billing_period_from_date"
                >
                  <b-form-input
                    id="invoice_contract_billing_period_from_date"
                    :disabled="view"
                    name="invoice_contract_billing_period_from_date"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6" md="3">
                <b-form-group
                  :label=" $t('app.form.label.invoice_contract_billing_period_To_date') "
                  label-for="invoice_contract_billing_period_To_date"
                >
                  <b-form-input
                    id="invoice_contract_billing_period_To_date"
                    :disabled="view"
                    name="invoice_contract_billing_period_To_date"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.description') "
                  label-for="invoice_description"
                >
                  <b-form-input
                    id="invoice_description"
                    :disabled="view"
                    name="invoice_description"
                  />
                </b-form-group>
              </b-col>

            </b-row>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <b-row>
              <b-col
                cols="12"
                class="mb-2"
              >
                  <databases
                    :items="users"
                    :fields="rowsOwner"
                  />
              </b-col>
              <b-col
                cols="12"
                class="mb-2"
              >
                  <databases
                    :items="users"
                    :fields="rowsOwner"
                  />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab
          :title="$t('app.tab.contract_tab.tab4')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsDocument"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.invoice_details')}`">
          <databases
            :items="users"
            :fields="rowsSpecialRight"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.invoice_criteria')}`">
          <databases
            :items="users"
            :fields="rowsContractCriteria"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.invoice_deadlines')}`">
          <databases
            :items="users"
            :fields="rowsPayment"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.invoice_positions')}`">
          <databases
            :items="users"
            :fields="rowsInfo"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.service_object')}`">
          <databases
            :items="users"
            :fields="rowsInvoices"
          />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button
              v-b-modal.modal-role
              class="mr-1"
              size="sm"
              variant="info"
            >
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              class="mr-1"
              size="sm"
              variant="primary"
            >
              {{ $t('app.btn.cancel') }}
            </b-button>
            <div
              size="sm"
              class="d-flex align-items-center"
            >
              <label class="d-inline-block text-sm-left mr-50">{{ $t('app.search.label') }}</label>
              <b-form-input
                id="filterInput"
                type="search"
                :placeholder="$t('app.search.placeholder')"
              />
            </div>
          </div>
        </template>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio, BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormDatepicker,
} from 'bootstrap-vue'

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    BCard,
    BTab,
    BTabs,
    BRow,
    BFormGroup,
    BCol,
    BForm,
    BFormInput,
    BButton,
    Databases,
    BModal,
    BFormSelect,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
    BFormDatepicker,
  },
  data() {
    return {
      view: true,
      perPage: 10,
      pageOptions: [3, 5, 10],
      users: [
        {
          id: 1,
          full_name: 'Dev',
          first_name: 'MAG',
          email: 'gael.meli@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 1,
          full_name: 'Archile',
          first_name: 'Dev',
          email: 'dev.arc@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      selected: 'first',
      filter: null,
      currency: null,
      rowsDocument: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Document Name', sortable: true },
        { key: 'doc_id', label: 'Document ID', sortable: true },
        { key: 'doc_type', label: 'Document Type', sortable: true },
        { key: 'date', label: 'Date receive', sortable: true },
        'Action',
      ],
      rowsOwner: [
        { key: 'id', label: 'Id' },
        { key: 'area_id', label: 'Service Object ID', sortable: true },
        { key: 'space', label: 'Service Object Name', sortable: true },
        { key: 'pos_name', label: 'Service Object type', sortable: true },
        { key: 'area_id', label: 'Area ID', sortable: true },
        { key: 'location', label: 'Location ID', sortable: true },
        'Action',
      ],
      rowsObject: [
        { key: 'id', label: 'Id' },
        { key: 'area_id', label: 'Service Object ID', sortable: true },
        { key: 'space', label: 'Service Object Name', sortable: true },
        { key: 'pos_name', label: 'Service Object type', sortable: true },
        { key: 'area_id', label: 'Area ID', sortable: true },
        { key: 'location', label: 'Location ID', sortable: true },
        'Action',
      ],
      rowsSpecialRight: [
        { key: 'id', label: 'Id' },
        { key: 'right', label: 'Special right ID', sortable: true },
        { key: 'name', label: 'Special right Name', sortable: true },
        { key: 'date', label: 'Terminate Date', sortable: true },
        { key: 'right_date', label: 'Special right Date', sortable: true },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'passive', label: 'Passive?', sortable: true },
        { key: 'available', label: 'availed?', sortable: true },
        { key: 'partner_group', label: 'Prior notice date', sortable: true },
        'Action',
      ],
      rowsContractCriteria: [
        { key: 'id', label: 'Id' },
        { key: 'criteria_id', label: 'Contract Criteria ID', sortable: true },
        { key: 'criteria_name', label: 'Criteria Name', sortable: true },
        { key: 'valid_from', label: 'Valid from Date', sortable: true },
        { key: 'valid_to', label: 'Valid to Date', sortable: true },
        { key: 'type_criteria', label: 'Criteria Type', sortable: true },
        { key: 'comment', label: 'Comment', sortable: true },
        { key: 'criteria_value', label: 'Criteria Value', sortable: true },
        'Action',
      ],
      rowsInvoices: [
        { key: 'id', label: 'Invoice Id' },
        { key: 'invoice_date', label: 'Invoice Date', sortable: true },
        { key: 'invoice_payment', label: 'Payment Date', sortable: true },
        { key: 'invoice_payment_from', label: 'Date invoice time frame from', sortable: true },
        { key: 'invoice_payment_to', label: 'Date invoice time frame to', sortable: true },
        { key: 'year', label: 'Billing year', sortable: true },
        { key: 'allocation_area', label: 'Allocation Area', sortable: true },
        { key: 'position', label: '# of invoice positions(TAP)', sortable: true },
        'Action',
      ],
      rowsInfo: [
        { key: 'id', label: 'Cost type Id' },
        { key: 'name', label: 'Cost name' },
        'Action',
      ],
      rowsPayment: [
        { key: 'id', label: 'Recurring payment id' },
        { key: 'name', label: 'Recurring payment name' },
        { key: 'begin', label: 'begin date' },
        { key: 'type', label: 'Recurring payment type' },
        { key: 'maturity', label: 'maturity type' },
        { key: 'index', label: 'index clause id' },
        'Action',
      ],
      rowsCustomerGroup: [
        { key: 'id', label: 'Invoice Id' },
        { key: 'invoice_date', label: 'Customer group', sortable: true },
        { key: 'invoice_payment', label: 'Name Customer group', sortable: true },
        'Action',
      ],

      currencyOptions: [
        { value: null, text: 'Please select an currency' },
        { value: 'USD', text: 'USD' },
        { value: 'EUR', text: 'EUR' },
        { value: 'USD', text: 'USD' },
      ],
      typeContractOptions: [
        { value: null, text: 'Please select the Contract Type' },
        { value: 'type1', text: 'Type 1' },
        { value: 'type2', text: 'Type 2' },
        { value: 'type3', text: 'Type 3' },
      ],
      documentContractOptions: [
        { value: null, text: 'Please select the document type' },
        { value: 'type1', text: 'Document Type 1' },
        { value: 'type2', text: 'Document Type 2' },
        { value: 'type3', text: 'Document Type 3' },
      ],

    }
  },
}
</script>

<style scoped>
@import '../../../../assets/scss/pages/page-users.scss';
</style>
