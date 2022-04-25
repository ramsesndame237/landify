<template>
<div>
  <b-card class="">
    <div class="header">
      <div class="first-bloc">
        <img src="../../../assets/images/icons/people.svg" alt="">
        <span>Benutzer anlegen</span>
      </div>
      <div>
        <b-button size="sm" variant="info" class="mr-1">Create new User</b-button>
        <b-button size="sm" variant="primary">Cancel</b-button>
      </div>
    </div>
    <b-form>
      <b-row>
        <!-- Field: email -->
        <b-col cols="12" md="6">
          <b-form-group label="E-mail*" label-for="username" placeholder="Enter here...">
            <b-form-input id="username" v-model="user.name"/>
          </b-form-group>
        </b-col>

        <!-- Field: password -->
        <b-col cols="12" md="6">
          <b-form-group label="Password*" label-for="full-name" placeholder="Enter here...">
            <b-form-input id="full-name" v-model="user.name" type="email"/>
          </b-form-group>
        </b-col>
<!--        check box -->

        <!-- Field: Name -->
        <b-col cols="12" md="6">
          <b-form-group label="NAME*" label-for="name">
            <b-form-input id="nameu" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="First name" label-for="name">
            <b-form-input id="firstname" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Name abbreviation*" label-for="name">
            <b-form-input id="abbreviation" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Function" label-for="name">
            <b-form-input id="firstname" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Customer Group*" label-for="name">
            <b-form-input id="customer-group" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Contact person" label-for="name">
            <b-form-input id="contact-person" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="USER TYPE" label-for="name">
            <b-form-input id="user-type" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Title" label-for="name">
            <b-form-input id="title" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
  </b-card>

  <b-card>
    <div class="first-bloc d-flex mb-2">
      <b-form-group class="mr-2">
<!--        <label class="d-inline-block text-sm-left mr-50">Per page</label>-->
        <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="sm"
            :options="pageOptions"
            class="w-50"
        />
      </b-form-group>
      <b-button class="mr-1" size="sm" variant="info"><feather-icon
          class="cursor-pointer"
          icon="PlusIcon"
      />New</b-button>
      <b-input-group size="sm">
          <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
          />
        </b-input-group>
    </div>
    <b-tabs pills>
      <b-tab title="Roles" active>
        <databases :actions="true" :items="items" :fields="fields" />
      </b-tab>
      <b-tab title="Customers">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab title="Equipe">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab title="Point de vente">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab title="Partner">
        <databases :items="items" :fields="fields" />
      </b-tab>
    </b-tabs>
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
                  class="mr-1"
                  id="h-name"
                  type="text"
                  placeholder="Enter here..."
              />
              <b-form-input
                  md="4"
                  id="h-firstname"
                  type="text"
                  placeholder="Enter here..."
              />
            </div>

          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>

</div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BTab,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'

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
    BFormSelect,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      user: [
        {
          id: 1,
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
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
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>