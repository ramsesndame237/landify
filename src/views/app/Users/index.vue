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
        entity="user"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
        @deleteButton="deleteUser"
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
      @ok="createUser(user)"
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
                v-model="user.company"
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
                v-model="user.email"
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
                  v-model="user.first_name"
                  class="mr-1"
                  type="text"
                  placeholder="Enter here..."
                />
                <b-form-input
                  id="h-firstname"
                  v-model="user.full_name"
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
                v-model="user.mobile"
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
                v-model="user.fax"
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
                v-model="user.deputy"
                :options="deputy"
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
                v-model="user.user_type"
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

import { mapState, mapActions } from 'vuex'

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
      user: {},
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      pageOptions: [3, 5, 10],
      sortDirection: 'asc',
      sortBy: '',
      sortDesc: false,
      fields: [
        { key: 'user_id', label: 'Id' },
        { key: 'user_firstname', label: 'First Name', sortable: true },
        { key: 'user_lastname', label: 'Last Name', sortable: true },
        { key: 'user_email', label: 'Email', sortable: true },
        { key: 'user_last_login_time', label: 'Last login', sortable: true },
        { key: 'user_type', label: 'User type', sortable: true },
        { key: 'user_company', label: 'Company', sortable: true },
        'Actions',
      ],
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      deputy: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      filter: null,
      items: [],
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
