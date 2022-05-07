<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex align-items-center justify-content-between"
        style="padding: 10px"
      >
        <div class="d-flex align-items-center">
          <img
            class="mr-1"
            src="@/assets/images/icons/people.svg"
            alt=""
          >
          <span>Créer un utilisateur</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-b-modal.modal-user
              size="sm"
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              Create new User </b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              Cancel</b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <!-- Field: email -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="E-mail*"
              label-for="username"
              placeholder="Enter here..."
            >
              <b-form-input
                id="username"
                v-model="user.email"
              />
            </b-form-group>
          </b-col>

          <!-- Field: password -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Password*"
              label-for="full-name"
              placeholder="Enter here..."
            >
              <b-form-input
                id="full-name"
                v-model="user.name"
                type="email"
              />
            </b-form-group>
          </b-col>

          <!--        check box -->
          <b-col
            cols="12"
            md="7"
            class="d-flex mb-1"
          >
            <div class="d-flex">
              <span class="mr-1">User must change his password at next login</span>
              <b-form-checkbox />
            </div>
            <div class="d-flex ml-auto">
              <span class="mr-1">User locked</span>
              <b-form-checkbox />
            </div>
          </b-col>

          <b-col
            cols="12"
            md="5"
            class="d-flex mb-1"
          >
            <b-col
              cols="5"
              md-2
            >
              <span>Address</span>
            </b-col>
            <div class="d-flex">
              <span class="mr-1">Mr.</span>
              <b-form-radio name="some-radios" />
            </div>
            <div class="d-flex ml-auto">
              <span class="mr-1">Ms.</span>
              <b-form-radio name="some-radios" />
            </div>

          </b-col>

          <!-- Field: First Name -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="FIRST NAME*"
              label-for="first_name"
            >
              <b-form-input
                id="first_name"
                v-model="user.first_name"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Last Name"
              label-for="last_name"
            >
              <b-form-input
                id="last_name"
                v-model="user.full_name"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Name abbreviation*"
              label-for="name"
            >
              <b-form-input
                id="abbreviation"
                v-model="user.full_name"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Function"
              label-for="name"
            >
              <b-form-input
                id="firstname"
                v-model="user.email"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Customer Group*"
              label-for="name"
            >
              <div class="d-flex">
                <b-form-input
                  id="customer-group"
                  v-model="user.email"
                  placeholder="Please select ..."
                  class="mr-1"
                  type="text"
                />
                <img
                  src="@/assets/images/icons/customerGroup.svg"
                  alt=""
                >
              </div>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Contact person"
              label-for="name"
            >
              <b-form-input
                id="contact-person"
                v-model="user.email"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="USER TYPE"
              label-for="name"
            >
              <b-form-input
                id="user-type"
                v-model="user.user_type"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              label="Title"
              label-for="name"
            >
              <b-form-input
                id="title"
                v-model="user.email"
                type="text"
              />
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab
          title="Roles"
          active
        >
          <databases
            :actions="true"
            :items="rowsRoles"
            :fields="columnRoles"
          />
        </b-tab>
        <b-tab title="Customers">
          <databases
            :items="items"
            :fields="fields"
          />
        </b-tab>
        <b-tab title="Equipe">
          <databases
            :items="items"
            :fields="fields"
          />
        </b-tab>
        <b-tab title="Point de vente">
          <databases
            :items="items"
            :fields="fields"
          />
        </b-tab>
        <b-tab title="Partner">
          <databases
            :items="items"
            :fields="fields"
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
              New
            </b-button>
            <b-button
              class="mr-1"
              size="sm"
              variant="primary"
            >
              Delete
            </b-button>
            <div
              size="sm"
              class="d-flex align-items-center"
            >
              <label class="d-inline-block text-sm-left mr-50">Search</label>
              <b-form-input
                id="filterInput"
                type="search"
                placeholder="rechercher.."
              />
            </div>
          </div>
        </template>
      </b-tabs>
    </b-card>

    <!--modal-->
    <b-modal
      id="modal-role"
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
              label="Role ID"
              label-for="role-id"
              label-cols-md="4"
            >
              <b-form-input
                id="company-name"
                type="text"
                placeholder="Enter here ..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Name"
              label-for="name"
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
        </b-row>
      </b-form>
    </b-modal>

    <!--  user modal -->
    <b-modal
      id="modal-user"
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
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio, BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'
import axios from 'axios'

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
  },
  props: ['id'],
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      user: {},

      selected: 'first',
      options: [
        { text: 'Benutzer muss bei nachster Anmeldung sein Passwort andern', value: 'first', disabled: false },
        { text: 'Benutzer gesperrt', value: 'second', disabled: false },
      ],
      options2: [
        { text: 'Mr.', value: 'first2', disabled: false },
        { text: 'Ms.', value: 'second2', disabled: false },
      ],
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
        {
          id: 4,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 11,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 12,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 13,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 14,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 15,
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
      columnRoles: [
        { key: 'id', label: 'Id' },
        { key: 'role_id', label: 'Role-ID', sortable: true },
        { key: 'role_name', label: 'Role name', sortable: true },
        { key: 'role_permission', label: 'Role permission', sortable: true },
        'Action',
      ],
      rowsRoles: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: '1',
          role_name: 'ADMIN',
          role_permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: '2',
          role_name: 'CUSTOMERS',
          role_permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: '2',
          role_name: 'CUSTOMERS',
          role_permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: '2',
          role_name: 'CUSTOMERS',
          role_permission: 'ADMIN',
        },
      ],
    }
  },
  mounted() {
    axios.get(`https://627536d05dc4f5764ba0abcb.mockapi.io/api/users/${this.id}`)
      .then(response => {
        this.user = response.data
      })
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
