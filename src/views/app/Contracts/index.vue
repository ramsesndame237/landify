<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between"
        style="padding: 10px"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">{{ $t('app.content.show') }}</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            style="width: 60px"
            size="sm"
            :options="pageOptions"
            class="w-10"
          />
          <label class="d-inline-block text-sm-left ml-50">{{ $t('app.content.entries') }}</label>
        </b-form-group>

        <div class="d-flex align-items-center">

          <span class="mr-1">{{ $t('app.content.show') }} 1 {{ $t('app.content.to') }} {{ perPage }} {{ $t('app.content.of') }} {{ totalRows }} {{ $t('app.content.entries') }}</span>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            class="my-0"
            first-number
            last-number
            prev-class="prev-item"
            next-class="next-item"
          />
        </div>

        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="primary"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/icons/sort.svg"
                alt=""
              >
            </b-button>
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="success"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              {{ $t('app.btn.view') }} </b-button>

            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.delete') }}</b-button>
          </div>

          <div
            size="sm"
            class="d-flex align-items-center"
          >
            <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              :placeholder="$t('app.search.palceholder')"
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link="contracts-view"
        link_view="contracts-view"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
      />
    </b-card>

    <!--modal-->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_new_contract')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.id') "
              label-for="contract_id"
              label-cols-md="4"
            >
              <b-form-input
                id="contract_id"
                type="text"
                readonly
                :placeholder="$t('app.form.placeholder.contract.id')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.name') "
              label-for="contract_name"
              label-cols-md="4"
            >
              <b-form-input
                id="contract_name"
                type="text"
                :placeholder="$t('app.form.placeholder.contract.name')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.begin') "
              label-for="begin_date"
              label-cols-md="4"
            >
              <b-form-datepicker
                id="begin_date"
                size="sm"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.end') "
              label-for="end_date"
              label-cols-md="4"
            >
              <b-form-datepicker
                id="end_date"
                size="sm"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.currency') "
              label-for="currency"
              label-cols-md="4"
            >
              <b-form-select
                id="currency"
                v-model="currency"
                size="sm"
                :options="currencyOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.type') "
              label-for="type"
              label-cols-md="4"
            >
              <b-form-select
                id="type"
                size="sm"
                :options="typeContractOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.contract.document') "
              label-for="type"
              label-cols-md="4"
            >
              <b-form-select
                id="document"
                size="sm"
                :options="documentContractOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
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
  BInputGroup, BFormDatepicker,
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
    BFormDatepicker,
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
      items: ['', '', ''],
      fields: [
        { key: 'id', label: 'Contract Id' },
        { key: 'group_id', label: 'Contract Type', sortable: false },
        { key: 'group_name', label: 'Contract Name', sortable: true },
        { key: 'group_fname', label: 'Begin date', sortable: true },
        { key: 'grouphf_name', label: 'End Date', sortable: true },
        { key: 'grohupf_name', label: 'Document contract type', sortable: true },
        { key: 'grouphf_nhame', label: 'Creation Date', sortable: true },
        { key: 'groufp_na me', label: 'Currency(contract)', sortable: true },
        { key: 'groufp_na me', label: 'Change Date', sortable: true },
        'Action',
      ],
      selected: null,
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
