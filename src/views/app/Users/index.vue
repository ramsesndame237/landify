<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination
        :on-new-element="()=> $bvModal.show('create-modal')"
        :on-delete-elements="()=> $refs.table.deleteSelected()"
      />
    </b-card>
    <b-card>
      <Databases
        ref="table"
        link="user-edit"
        entity="user"
        :default-sort-field="defaultSortField"
        :fields="fields"
        :on-view-element="(user)=> $router.push({name: 'user-edit', params: {id: user.user_id}})"
        :on-edit-element="(user)=> $router.push({name: 'user-edit', params: {id: user.user_id}, query: {edit: 'true'}})"
      />
    </b-card>

    <!--modal-->
    <b-modal
      id="create-modal"
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

import {
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    TablePagination,
    Databases,
    BFormGroup,
    BCard,
    BFormSelect,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
  },
  data() {
    return {
      user: {},
      defaultSortField: 'user_id',
      fields: [
        { key: '__selected' },
        { key: 'user_id', label: 'Id' },
        { key: 'user_firstname', label: 'First Name', sortable: true },
        { key: 'user_lastname', label: 'Last Name', sortable: true },
        { key: 'user_email', label: 'Email', sortable: true },
        { key: 'user_last_login_time', label: 'Last login', sortable: true },
        { key: 'user_type', label: 'User type', sortable: true },
        { key: 'user_company', label: 'Company', sortable: true },
        'Actions',
      ],
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
    }
  },
  methods: {
    createUser() {

    },
    deleteUsers() {
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    }
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
