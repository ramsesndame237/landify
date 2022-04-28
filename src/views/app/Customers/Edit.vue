<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
          <span>Create Group</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-user size="sm" variant="info" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/icons/group.svg" alt="">
              Create new group </b-button>
            <b-button size="sm" class="d-flex align-items-center" variant="primary">
              <img src="@/assets/images/icons/cancel.svg" alt="">
              Cancel</b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <!-- Field: group id -->
          <b-col cols="12" md="6">
            <b-form-group label="ID" label-for="id">
              <b-form-input id="id" placeholder="Enter here..." v-model="user.name"/>
            </b-form-group>
          </b-col>

          <!-- Field: customer group name -->
          <b-col cols="12" md="6">
            <b-form-group label="CUSTOMER GROUP NAME" label-for="full-name">
              <b-form-input id="full-name" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <!-- Field: Name -->
          <b-col cols="12" md="12">
            <b-form-group label="Brief description" label-for="name">
              <b-form-input placeholder="Enter here..." id="nameu" v-model="user.email" type="text"/>
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab title="Company" active>
          <databases :actions="true" :items="rowsCompany" :fields="columnCompany" />
        </b-tab>
        <b-tab title="Contact Person">
          <databases :items="rowsPerson" :fields="columnPerson" />
        </b-tab>
        <b-tab title="Group Ticket/Package">
          <databases :items="rowsTicketPackage" :fields="columnTicketPackage" />
        </b-tab>
        <b-tab title="Users">
          <databases :items="rowsUsers" :fields="columnUsers" />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">New</b-button>
            <b-button class="mr-1" size="sm" variant="primary">Delete</b-button>
            <div size="sm" class="d-flex align-items-center">
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
  BTab, BFormCheckbox, BFormRadio,BInputGroup,
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
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
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
      columnCompany: [
        { key: 'id', label: 'Company Id' },
        { key: 'company_name', label: 'Company Name', sortable: true },
        { key: 'company_address_zip', label: 'Company Address ZIP', sortable: true },
        { key: 'company_address_city', label: 'Company Address City', sortable: true },
        { key: 'company_address_country', label: 'Company Address Country', sortable: true },
        { key: 'pos_filial', label: 'PoS/Filiale', sortable: true },
        'Action',
      ],
      columnPerson: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'first_name', label: 'First name', sortable: true },
        { key: 'address', label: 'Address', sortable: true },
        { key: 'title', label: 'Title', sortable: true },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'email', label: 'E-Mail', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'mobile', label: 'Mobile', sortable: true },
        { key: 'address_city', label: 'Address city', sortable: true },
        'Action',
      ],

      columnTicketPackage: [
        { key: 'id', label: 'Group ticket ID' },
        { key: 'deadline', label: 'Deadline', sortable: true },
        { key: 'group_ticket_name', label: 'Group ticket name', sortable: true },
        { key: 'group_ticket_description', label: 'Group ticket description', sortable: true },
        { key: 'contradiction_packages_including', label: 'Contradiction Packages including', sortable: true },
        { key: 'sum', label: 'Sum', sortable: true },
        { key: 'ticket_id_with_ticket_name', label: 'Ticket ID with Ticket name', sortable: true },
        'Action',
      ],
      columnUsers: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Last Name', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'user_team', label: 'User team', sortable: true },
        { key: 'last_role', label: 'User Role', sortable: true },
        { key: 'user_pos', label: 'User PoS', sortable: true },
        'Action',
      ],
      

      /*Rows placeholders's values */
      rowsUsers: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          user_team: 'josue.nya@gohze.org',
          last_role: 'Admin',
          user_pos: 'sdfs sdf',
        },
  
      ],
      rowsCompany: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          company_name: 'Fictive Enterprise',
          company_address_zip: 'Bp 123 Test',
          company_address_city: 'Yaoundé',
          company_address_country: 'Cameroon',
          pos_filial: 'Something',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          company_name: 'Fictive Enterprise',
          company_address_zip: 'Bp 123 Test',
          company_address_city: 'Yaoundé',
          company_address_country: 'Cameroon',
          pos_filial: 'Something',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          company_name: 'Fictive Enterprise',
          company_address_zip: 'Bp 123 Test',
          company_address_city: 'Yaoundé',
          company_address_country: 'Cameroon',
          pos_filial: 'Something',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          company_name: 'Fictive Enterprise',
          company_address_zip: 'Bp 123 Test',
          company_address_city: 'Yaoundé',
          company_address_country: 'Cameroon',
          pos_filial: 'Something',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          company_name: 'Fictive Enterprise',
          company_address_zip: 'Bp 123 Test',
          company_address_city: 'Yaoundé',
          company_address_country: 'Cameroon',
          pos_filial: 'Something',
        },

      ],
      rowsPerson: [
        {
          id:1,
          name: " Doe",
          first_name: " John",
          address: " 123 street",
          title: " Somthing",
          department: " ICT",
          email: " johndoe@gmail.com",
          phone: " +237 123 465 789",
          mobile: " +237 123 465 789",
          address_city: " Bp 123 Yde",
        },
                {
          id:1,
          name: " Doe",
          first_name: " John",
          address: " 123 street",
          title: " Somthing",
          department: " ICT",
          email: " johndoe@gmail.com",
          phone: " +237 123 465 789",
          mobile: " +237 123 465 789",
          address_city: " Bp 123 Yde",
        },
                {
          id:1,
          name: " Doe",
          first_name: " John",
          address: " 123 street",
          title: " Somthing",
          department: " ICT",
          email: " johndoe@gmail.com",
          phone: " +237 123 465 789",
          mobile: " +237 123 465 789",
          address_city: " Bp 123 Yde",
        },
                {
          id:1,
          name: " Doe",
          first_name: " John",
          address: " 123 street",
          title: " Somthing",
          department: " ICT",
          email: " johndoe@gmail.com",
          phone: " +237 123 465 789",
          mobile: " +237 123 465 789",
          address_city: " Bp 123 Yde",
        },
                {
          id:1,
          name: " Doe",
          first_name: " John",
          address: " 123 street",
          title: " Somthing",
          department: " ICT",
          email: " johndoe@gmail.com",
          phone: " +237 123 465 789",
          mobile: " +237 123 465 789",
          address_city: " Bp 123 Yde",
        },

      ],
      rowsTicketPackage: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          group_ticket_id: '1',
          deadline: '12 Nov 2022',
          group_ticket_name: 'somthing',
          group_ticket_description: 'A little description here',
          contradiction_packages_including: 'Something',
          sum: '15',
          ticket_id_with_ticket_name: '12',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          group_ticket_id: '1',
          deadline: '12 Nov 2022',
          group_ticket_name: 'somthing',
          group_ticket_description: 'A little description here',
          contradiction_packages_including: 'Something',
          sum: '15',
          ticket_id_with_ticket_name: '12',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          group_ticket_id: '1',
          deadline: '12 Nov 2022',
          group_ticket_name: 'somthing',
          group_ticket_description: 'A little description here',
          contradiction_packages_including: 'Something',
          sum: '15',
          ticket_id_with_ticket_name: '12',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          group_ticket_id: '1',
          deadline: '12 Nov 2022',
          group_ticket_name: 'somthing',
          group_ticket_description: 'A little description here',
          contradiction_packages_including: 'Something',
          sum: '15',
          ticket_id_with_ticket_name: '12',
        },
                {
          id: 1,
          // eslint-disable-next-line global-require
          group_ticket_id: '1',
          deadline: '12 Nov 2022',
          group_ticket_name: 'somthing',
          group_ticket_description: 'A little description here',
          contradiction_packages_including: 'Something',
          sum: '15',
          ticket_id_with_ticket_name: '12',
        },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
