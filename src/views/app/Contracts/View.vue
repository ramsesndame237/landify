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
          <span>{{ $t('app.content.contract.view') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-if="view"
              size="sm"
              variant="info"
              class="mr-1 d-flex"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              Edit
            </b-button>
            <b-button
              v-else
              size="sm"
              variant="info"
              class="mr-1 d-flex"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >

              Save
            </b-button>
            <b-button
              v-if="!view"
              size="sm"
              class="d-flex"
              variant="primary"
              @click="view = !view"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              Cancel</b-button>
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
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.contract.id') "
                  label-for="contract_id"
                >
                  <b-form-input
                    id="contract_id"
                    type="text"
                    readonly
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.contract.id')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.contract.name') "
                  label-for="contract_name"
                >
                  <b-form-input
                    id="contract_name"
                    :disabled="view"
                    type="text"
                    :placeholder="$t('app.form.placeholder.contract.name')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.contract.type') "
                  label-for="type"
                >
                  <b-form-select
                    id="type"
                    :disabled="view"
                    size="sm"
                    :options="typeContractOptions"
                    class="w-10 mr-3"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.contract.begin') "
                  label-for="begin_date"
                >
                  <b-form-datepicker
                    id="begin_date"
                    :disabled="view"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.contract.end') "
                  label-for="end_date"
                >
                  <b-form-datepicker
                    id="end_date"
                    size="sm"
                    :disabled="view"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.contract.end_contract_possible') "
                  label-for="end_date"
                >
                  <b-form-datepicker
                    id="possible_end_date"
                    :disabled="view"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.contract.currency') "
                  label-for="currency"
                >
                  <b-form-select
                    id="currency"
                    v-model="currency"
                    :disabled="view"
                    size="sm"
                    :options="currencyOptions"
                    class="w-10 mr-3"
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
                <b-tabs pills>
                  <b-tab
                    :title="$t('app.tab.contract_tab.tab1')"
                    active
                  >
                    <databases
                      :actions="true"
                      :items="users"
                      :fields="rowsCustomerGroup"
                    />
                  </b-tab>
                  <b-tab :title="$t('app.tab.contract_tab.tab2')">
                    <databases
                      :items="users"
                      :fields="rowsObject"
                    />
                  </b-tab>
                  <b-tab :title="`${$t('app.tab.contract_tab.tab3')}`">
                    <databases
                      :items="users"
                      :fields="rowsOwner"
                    />
                  </b-tab>

                  <template #tabs-end>
                    <div class="first-bloc ml-auto d-flex align-items-center">
                      <!--                      <b-button
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
                      </b-button>-->
                      <div
                        size="sm"
                        class="d-flex align-items-center"
                      >
                        <label class="d-inline-block text-sm-left mr-50">{{ $t('app.search.label') }}</label>
                        <b-form-input
                          id="filterSearch"
                          type="search"
                          :placeholder="$t('app.search.placeholder')"
                        />
                      </div>
                    </div>
                  </template>
                </b-tabs>
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
        <b-tab :title="$t('app.tab.contract_tab.tab5')">
          <databases
            :items="users"
            :fields="rowsObject"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.contract_tab.tab6')}`">
          <databases
            :items="users"
            :fields="rowsSpecialRight"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.contract_tab.tab7')}`">
          <databases
            :items="users"
            :fields="rowsContractCriteria"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.contract_tab.tab8')}`">
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
      rowsDocument: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Document Name', sortable: true },
        { key: 'doc_id', label: 'Document ID', sortable: true },
        { key: 'doc_type', label: 'Document Type', sortable: true },
        { key: 'date', label: 'Date receive', sortable: true },
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
      rowsOwner: [
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
      rowsCustomerGroup: [
        { key: 'id', label: 'Invoice Id' },
        { key: 'invoice_date', label: 'Customer group', sortable: true },
        { key: 'invoice_payment', label: 'Name Customer group', sortable: true },
        'Action',
      ],
      filter: null,
      currency: null,

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
@import '../../../assets/scss/pages/page-users.scss';
</style>
