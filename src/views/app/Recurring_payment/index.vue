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
              :placeholder="$t('app.search.placeholder')"
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link="recurring-payment-view"
        link_view="recurring-payment-view"
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
      :title="$t('app.content.create_new_recurring_pay')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.id') "
              label-for="id"
              label-cols-md="4"
            >
              <b-form-input
                id="id"
                type="text"
                readonly
                :placeholder="$t('app.form.placeholder.pay.id')"
              />

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.contract') "
              label-for="contract"
              label-cols-md="4"
            >
              <b-form-select
                id="contract"
                size="sm"
                :options="contractOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.type') "
              label-for="type"
              label-cols-md="4"
            >
              <b-form-select
                id="type"
                size="sm"
                :options="typeOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.sum') "
              label-for="sum"
              label-cols-md="4"
            >
              <b-form-input
                id="sum"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.sum')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.cond') "
              label-for="cond"
              label-cols-md="4"
            >
              <b-form-input
                id="cond"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.cond')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.percent') "
              label-for="percent"
              label-cols-md="4"
            >
              <b-form-input
                id="percent"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.percent')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.begin') "
              label-for="begin"
              label-cols-md="4"
            >
              <b-form-input
                id="begin"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.begin')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.end') "
              label-for="end"
              label-cols-md="4"
            >
              <b-form-input
                id="end"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.end')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.description') "
              label-for="desc"
              label-cols-md="4"
            >
              <b-form-textarea
                id="textarea"
                v-model="text"
                :placeholder="$t('app.form.placeholder.right.description')"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.m_type') "
              label-for="m_type"
              label-cols-md="4"
            >
              <b-form-select
                id="m_type"
                size="sm"
                :options="typeOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.m_date') "
              label-for="m_date"
              label-cols-md="4"
            >
              <b-form-input
                id="m_date"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_date')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.m_at') "
              label-for="m_at"
              label-cols-md="4"
            >
              <b-form-input
                id="m_at"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_at')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.m_range') "
              label-for="m_range"
              label-cols-md="4"
            >
              <b-form-input
                id="m_range"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_range')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.pay.value') "
              label-for="value"
              label-cols-md="4"
            >
              <b-form-input
                id="value"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.value')"
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
  BFormCheckbox,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
  BPagination,
  BInputGroup, BFormDatepicker, BFormTextarea,
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
    BFormCheckbox,
    BModal,
    BForm,
    BRow,
    BFormTextarea,
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
        { key: 'id', label: 'Recurring Payment ID' },
        { key: 'group_id', label: 'Contract ID', sortable: false },
        { key: 'group_name', label: 'Recurring Payment type ID', sortable: true },
        { key: 'group_fname', label: 'Maturity type ID', sortable: true },
        { key: 'index', label: 'Index clause ID', sortable: true },
        'Action',
      ],
      selected: null,
      filter: null,
      text: null,
      typeOptions: [
        { value: null, text: 'Please select the Contract Service' },
        { value: 'type1', text: 'Type 1' },
        { value: 'type2', text: 'Type 2' },
        { value: 'type3', text: 'Type 3' },
      ],
      contractOptions: [
        { value: null, text: 'Please select the Contract Service' },
        { value: 'type1', text: 'Type 1' },
        { value: 'type2', text: 'Type 2' },
        { value: 'type3', text: 'Type 3' },
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
