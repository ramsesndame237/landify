<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <span>Authorization Management detail view</span>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="primary" class="mr-1 d-flex">
              <img src="@/assets/images/icons/sort.svg" alt="">
              </b-button>
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              new </b-button>
            <b-button size="sm" variant="secondary" class="mr-1 d-flex">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              Edit</b-button>
            <b-button size="sm" class="d-flex" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              Delete</b-button>
          </div>

          <b-input-group size="sm" class="d-flex align-items-center">
            <label class="d-inline-block text-sm-left mr-50">Search</label>
            <b-form-input
                id="filterInput"
                type="search"
                placeholder="AJAX data source"
            />
          </b-input-group>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <!-- Field: email -->
          <b-col cols="12" md="4">
            <b-form-group label="ID du rôle de l'utilisateur" label-for="username">
              <b-form-input placeholder="Délai d'opposition" id="username" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <!-- Field: password -->
          <b-col cols="12" md="4">
            <b-form-group label="Rollenname" label-for="full-name">
              <b-form-input placeholder="Délai d'opposition" id="full-name" v-model="user.name" type="email"/>
            </b-form-group>
          </b-col>
          <!--        check box -->

          <!-- Field: Name -->
          <b-col cols="12" md="12">
            <label for="textarea-default">DESCRIPTION</label>
            <b-form-textarea
                id="textarea-default"
                placeholder="Enter here..."
                rows="3"
            />
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab title="Droits" active>
          <databases :actions="true" :items="rowsRoles" :fields="columnRoles" />
        </b-tab>
        <b-tab title="Customers">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <b-tab title="User">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">New</b-button>
            <b-button class="mr-1" size="sm" variant="primary">Delete</b-button>
            <b-input-group size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">Search</label>
              <b-form-input
                  id="filterInput"
                  type="search"
                  placeholder="rechercher.."
              />
            </b-input-group>
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
                label-cols-md="4">
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
                label-cols-md="4">
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
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BTab, BFormTextarea,
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
    BModal,
    BFormSelect,
    BFormTextarea,
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
      columnRoles: [
        { key: 'id', label: 'Id' },
        { key: 'authorisation', label: 'Attribution des autorisations', sortable: true },
        { key: 'create', label: 'Créer (j/n)', sortable: true },
        { key: 'read', label: 'Read (j/n)', sortable: true },
        { key: 'write', label: 'Write (j/n)', sortable: true },
        { key: 'delete', label: 'Delete (j/n)', sortable: true },
        { key: 'valable_date', label: 'Valable de la date', sortable: true },

        { key: 'valable_date_j', label: 'Valable jusqu\'à la date', sortable: true },
        { key: 'active', label: 'Actif (j/n)', sortable: true },
        { key: 'element', label: 'éléments/ symboles à modifier, supprimer', sortable: true },
      ],
      rowsRoles: [
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
