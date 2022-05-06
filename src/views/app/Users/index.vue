<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between"
        style="padding: 10px"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Show</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            style="width: 60px"
            size="sm"
            :options="pageOptions"
            class="w-10"
          />
          <label class="d-inline-block text-sm-left ml-50">Entries</label>
        </b-form-group>

        <div class="d-flex align-items-center">
          <span class="mr-1">show 1 to {{ perPage }} of {{ totalRows }} entires</span>
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
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              new </b-button>
            <b-button
              size="sm"
              variant="secondary"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              Edit</b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              Delete</b-button>
          </div>

          <div
            size="sm"
            class="d-flex align-items-center"
          >
            <label class="d-inline-block text-sm-left mr-50">Search</label>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="rechercher.."
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link="user-edit"
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
      ok-title="Save"
      cancel-title="Cancel"
      modal-class="modal-primary"
      centered
      title="Create new user"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Name Company*"
              label-for="company-name"
              label-cols-md="4"
            >
              <b-form-input
                id="company-name"
                type="text"
                placeholder="Please select ..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="eMail"
              label-for="h-email"
              label-cols-md="4"
            >
              <b-form-input
                id="h-email"
                type="email"
                placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Name / First name"
              label-for="h-name"
              label-cols-md="4"
            >
              <div class="d-flex">
                <b-form-input
                  id="h-name"
                  class="mr-1"
                  type="text"
                  placeholder="Enter here..."
                />
                <b-form-input
                  id="h-firstname"
                  md="4"
                  type="text"
                  placeholder="Enter here..."
                />
              </div>

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Mobile"
              label-for="h-mobile"
              label-cols-md="4"
            >
              <b-form-input
                id="h-mobile"
                type="number"
                placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Fax"
              label-for="h-fax"
              label-cols-md="4"
            >
              <b-form-input
                id="h-fax"
                type="text"
                placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Deputy"
              label-for="h-deputy"
              label-cols-md="4"
            >
              <b-form-select
                v-model="selected"
                :options="options"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Type"
              label-for="h-deputy"
              label-cols-md="4"
            >
              <b-form-select
                v-model="selected"
                :options="options"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import axios from 'axios'
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
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Last Name', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'email', label: 'eMail', sortable: true },
        { key: 'last_login', label: 'Last login', sortable: true },
        { key: 'user_type', label: 'User type', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
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
  beforeMount() {
    axios.get('https://627536d05dc4f5764ba0abcb.mockapi.io/api/users')
      .then(response => {
        this.items = response.data
      })
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
.first-bloc img {
  margin-right: 4px;
}
</style>
