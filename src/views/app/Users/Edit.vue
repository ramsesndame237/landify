<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <!--              v-b-modal.modal-user-->
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>Editer un utilisateur</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-if="view" size="sm" variant="info" class="mr-1 d-flex" @click="changeMode">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              Edit
            </b-button>
            <b-button v-else size="sm" variant="info" class="mr-1 d-flex" @click="Edit">
              <img src="@/assets/images/pages/editIcons.svg" alt="">

              Save
            </b-button>
            <b-button v-if="!view" size="sm" class="d-flex" variant="primary" @click="changeMode">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              Cancel
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <!-- Field: user_email -->
          <b-col cols="12" md="6">
            <b-form-group label="E-mail*" label-for="email" placeholder="Enter here...">
              <b-form-input id="email" v-model="user.email" :disabled="view"/>
            </b-form-group>
          </b-col>

          <!-- Field: user_password -->
          <b-col cols="12" md="6">
            <b-form-group label="Password*" label-for="password" placeholder="Enter here...">
              <b-form-input id="password" v-model="user.password" type="password" :disabled="view"/>
            </b-form-group>
          </b-col>

          <!-- Field user_locked -->
          <b-col cols="12" md="7" class="d-flex mb-1">
            <div class="d-flex">
              <span class="mr-1">User must change his password at next login</span>
              <b-form-checkbox v-model="user.change_pwd" :disabled="view"/>
            </div>
            <div class="d-flex ml-auto">
              <span class="mr-1">User locked</span>
              <b-form-checkbox v-model="user.locked" :disabled="view"/>
            </div>
          </b-col>

          <!-- Field user_gender -->
          <b-col cols="12" md="5" class="d-flex mb-1">
            <b-col cols="5" md-2>
              <span>Gender</span>
            </b-col>
            <div class="d-flex">
              <span class="mr-1">Mr.</span>
              <b-form-radio v-model="user.title" name="some-radios" value="Mr." :disabled="view"/>
            </div>
            <div class="d-flex ml-auto">
              <span class="mr-1">Ms.</span>
              <b-form-radio v-model="user.title" name="some-radios" value="Ms." :disabled="view"/>
            </div>

          </b-col>

          <!-- Field: user_firstname -->
          <b-col cols="12" md="6">
            <b-form-group label="FIRST NAME*" label-for="first_name">
              <b-form-input id="first_name" v-model="user.first_name" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <!-- Field: user_lastname -->
          <b-col cols="12" md="6">
            <b-form-group label="Last Name" label-for="last_name">
              <b-form-input id="last_name" v-model="user.full_name" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Name abbreviation*" label-for="name">
              <b-form-input id="abbreviation" v-model="user.name_abrv" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Function" label-for="function">
              <b-form-input id="function" v-model="user.function" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Customer Group*" label-for="group">
              <div class="d-flex">
                <b-form-input id="customer-group" v-model="user.group" :disabled="view" placeholder="Please select ..." class="mr-1" type="text"/>
                <img src="@/assets/images/icons/customerGroup.svg" alt="">
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Contact person" label-for="contact-person">
              <b-form-input id="contact-person" v-model="user.contact" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="USER TYPE" label-for="name">
              <b-form-input id="user-type" v-model="user.user_type" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Title" label-for="title">
              <b-form-input id="title" v-model="user.title" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Roles" label-for="name">
              <v-select v-model="roles" multiple label="title" :options="availableRoles" placeholder="Select roles"/>
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab title="Roles" active>
          <databases :actions="true" :items="rowsRoles" :fields="columnRoles"/>
        </b-tab>
        <b-tab title="Customers">
          <databases :items="items" :fields="fields"/>
        </b-tab>
        <b-tab title="Equipe">
          <databases :items="items" :fields="fields"/>
        </b-tab>
        <b-tab title="Point de vente">
          <databases :items="items" :fields="fields"/>
        </b-tab>
        <b-tab title="Partner">
          <databases :items="items" :fields="fields"/>
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">
              New
            </b-button>
            <b-button class="mr-1" size="sm" variant="primary">
              Delete
            </b-button>
            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">Search</label>
              <b-form-input id="filterInput" type="search" placeholder="rechercher.."/>
            </div>
          </div>
        </template>
      </b-tabs>
    </b-card>

    <!--modal-->
    <b-modal id="modal-role" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered title="Create new user" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Role ID" label-for="role-id" label-cols-md="4">
              <b-form-input id="company-name" type="text" placeholder="Enter here ..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Name" label-for="name" label-cols-md="4">
              <b-form-input id="h-email" type="email" placeholder="Enter here..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Name / First name" label-for="h-name" label-cols-md="4">
              <div class="d-flex">
                <b-form-input id="h-name" class="mr-1" type="text" placeholder="Enter here..."/>
                <b-form-input id="h-firstname" md="4" type="text" placeholder="Enter here..."/>
              </div>

            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>

    <!--  user modal -->
    <b-modal id="modal-user" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered title="Create new user" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Name Company*" label-for="company-name" label-cols-md="4">
              <b-form-input id="company-name" type="text" placeholder="Please select ..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="eMail" label-for="h-email" label-cols-md="4">
              <b-form-input id="h-email" type="email" placeholder="Enter here..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Name / First name" label-for="h-name" label-cols-md="4">
              <div class="d-flex">
                <b-form-input id="h-name" class="mr-1" type="text" placeholder="Enter here..."/>
                <b-form-input id="h-firstname" md="4" type="text" placeholder="Enter here..."/>
              </div>

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Mobile" label-for="h-mobile" label-cols-md="4">
              <b-form-input id="h-mobile" type="number" placeholder="Enter here..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Fax" label-for="h-fax" label-cols-md="4">
              <b-form-input id="h-fax" type="text" placeholder="Enter here..."/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Deputy" label-for="h-deputy" label-cols-md="4">
              <b-form-select v-model="selected" :options="options"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Type" label-for="h-deputy" label-cols-md="4">
              <b-form-select v-model="selected" :options="options"/>
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
      view: true,
      perPage: 10,
      pageOptions: [3, 5, 10],
      user: this.$route.params.user,
      availableRoles: [{ title: 'Administrator' }, { title: 'Supervisor' }],
      selected: 'first',
      options: [
        { text: 'Benutzer muss bei nachster Anmeldung sein Passwort andern', value: 'first', disabled: false },
        { text: 'Benutzer gesperrt', value: 'second', disabled: false },
      ],
      options2: [
        { text: 'Mr.', value: 'first2', disabled: false },
        { text: 'Ms.', value: 'second2', disabled: false },
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
  computed: {

  },
  mounted() {
    axios.get(`https://627536d05dc4f5764ba0abcb.mockapi.io/api/users/${this.id}`)
      .then(response => {
        this.user = response.data
      })
  },
  methods: {
    changeMode() {
      this.view = !this.view
    },
    Edit() {
      console.log(this.user)
      axios.put(`https://627536d05dc4f5764ba0abcb.mockapi.io/api/users/${this.id}`,
        {
          change_pwd: this.user.change_pwd,
          company: this.user.company,
          contact: this.user.contact,
          email: this.user.email,
          first_name: this.user.first_name,
          full_name: this.user.full_name,
          function: this.user.function,
          group: this.user.group,
          locked: this.user.locked,
          mobile: this.user.mobile,
          name_abrv: this.user.name_abrv,
          password: this.user.password,
          title: this.user.title,
          user_type: this.user.user_type,
        }).then(response => {
        this.user = response.data
        this.view = true
      })
    },
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
