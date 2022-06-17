<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
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
              <b-form-input id="user_email" v-model="user.user_email" :disabled="view"/>
            </b-form-group>
          </b-col>

          <!-- Field: user_password -->
          <b-col cols="12" md="6">
            <b-form-group label="Password*" label-for="password" placeholder="Enter here...">
              <b-form-input id="user_password" v-model="user.user_password" type="password" :disabled="view"/>
            </b-form-group>
          </b-col>

          <!-- Field user_reset-required -->
          <b-col cols="12" md="6">
            <div class="d-flex">
              <span class="mr-1">User must change his password at next login</span>
              <b-form-checkbox v-model="user.user_password_reset_required" :disabled="view"/>
            </div>
            <div class="d-flex mt-1">
              <span class="mr-1">User locked</span>
              <b-form-checkbox v-model="user.user_locked" :disabled="view"/>
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="USER TYPE" label-for="name">
              <b-form-select id="contact-person" v-model="user.usertype_id" :disabled="view"
                             placeholder="Please select ..." :options="userTypeListItems"/>
            </b-form-group>
          </b-col>

          <!-- Field: user_firstname -->
          <b-col cols="12" md="6">
            <b-form-group label="First Name*" label-for="first_name">
              <b-form-input id="first_name" v-model="user.user_firstname" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <!-- Field: user_lastname -->
          <b-col cols="12" md="6">
            <b-form-group label="Last Name" label-for="last_name">
              <b-form-input id="last_name" v-model="user.user_lastname" :disabled="view" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Customer Group*" label-for="group">
              <div class="d-flex">
                <b-form-input id="customer-group" v-model="user.customergroup" disabled="" class="mr-1"/>
                <img src="@/assets/images/icons/customerGroup.svg" alt="">
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Contact person" label-for="contact-person">
              <b-form-select id="contact-person" v-model="user.contactperson_id" :disabled="view"
                             placeholder="Please select ..." :options="contactPersonListItems"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Shortname" label-for="short_name">
              <b-form-input id="short_name" :value="selectedContactPerson.contactperson_short_name" disabled
                            type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Function" label-for="function">
              <b-form-input id="function" :value="selectedContactPerson.contactperson_function" disabled type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Salutation" label-for="salutation">
              <b-form-radio-group id="radio-group-1" :value="selectedContactPerson.contactperson_salutation_name"
                                  disabled :options="[{text:'Mr.',value:1}, {text:'Mrs.', value: 2}]"
                                  :aria-describedby="ariaDescribedby" name="radio-options"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="Title" label-for="title">
              <b-form-input id="title" v-model="user.contactperson_title" disabled type="text"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab title="Roles" active>
          <databases entity="user_role_grp" :fields="columnRoles"/>
        </b-tab>
        <b-tab title="Customers">
          <!--          <databases :items="items" :fields="fields"/>-->
        </b-tab>
        <b-tab title="Equipe">
          <!--          <databases :items="items" :fields="fields"/>-->
        </b-tab>
        <b-tab title="Point de vente">
          <!--          <databases :items="items" :fields="fields"/>-->
        </b-tab>
        <b-tab title="Partner">
          <!--          <databases :items="items" :fields="fields"/>-->
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
    <b-modal id="modal-role" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
             title="Create new user" size="lg">
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
    <b-modal id="modal-user" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
             title="Create new user" size="lg">
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
  BTab, BFormCheckbox, BFormRadioGroup,
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
    BFormRadioGroup,
  },
  props: ['id'],
  data() {
    return {
      view: this.$route.query.edit !== 'true',
      perPage: 10,
      pageOptions: [3, 5, 10],
      user: this.$route.params.user || {},
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
        { key: 'role_id', label: 'Role-ID', sortable: true },
        { key: 'role_name', label: 'Role name', sortable: true },
        { key: 'role_permission', label: 'Role permission', sortable: true },
        { key: 'user_role_valid_from', label: 'Valid From', sortable: true },
        { key: 'user_role_valid_to', label: 'Valid To', sortable: true },
        'Action',
      ],
      userTypeList: [],
      contactPersonList: [],
    }
  },
  computed: {
    contactPersonListItems() {
      return this.contactPersonList.map(item => ({
        text: `${item.contactperson_firstname} ${item.contactperson_lastname}`,
        value: item.contactperson_id,
      }))
    },
    userTypeListItems() {
      return this.userTypeList.map(item => ({
        text: item.usertype_name,
        value: item.usertype_id,
      }))
    },
    selectedContactPerson() {
      return this.contactPersonList.find(item => item.contactperson_id === this.user.contactperson_id) ?? {}
    },
  },
  watch: {
    'user.contactperson_id': function (value) {
      this.$api({
        action: 'read',
        entity: 'contactperson_title_salutation_customergroup_group',
        attributes: ['salutation_name', 'salutation_title', 'customergroup_name'],
        filter: {
          contactperson_id: value,
        },
      }).then(data => {
        console.log(data)
      })
    },
  },
  async created() {
    if (!this.$route.params.user) {
      this.user = await this.$store.dispatch('table/fetchSingleItem', {
        entity: 'user',
        primaryKey: 'user_id',
        id: this.$route.params.id,
      })
    }
    this.userTypeList = await this.$store.dispatch('table/fetchList', 'usertype')
    this.contactPersonList = await this.$store.dispatch('table/fetchList', 'contactperson')
  },
  methods: {
    update() {

    },
    changeMode() {
      this.view = !this.view
    },
    Edit() {
    },
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
