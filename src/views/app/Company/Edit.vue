<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <span>company detail view</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-user size="sm" variant="info" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              New
            </b-button>
            <b-button v-b-modal.modal-user size="sm" variant="warning" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              Edit
            </b-button>
            <b-button size="sm" class="d-flex align-items-center" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="NAME COMPANY" label-for="name_company">
              <b-form-input id="name_company" placeholder="Enter here..." v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="CUSTOMER GROUP NAME" label-for="group-name">
              <b-form-input id="group-name" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="STREET" label-for="street">
              <b-form-input id="street" placeholder="Enter here..." v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="EMAIL" label-for="email">
              <b-form-input id="email" placeholder="Enter here..." v-model="user.name" type="mail"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="ADDRESS ADDITION" label-for="address_addition">
              <b-form-input id="address_addition" placeholder="Enter here..." v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="PHONE" label-for="full-name">
              <b-form-input id="full-name" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="POSTCODE, PLACE">
              <b-row>
                <b-col cols="3" md="3">
                  <b-form-input id="f" placeholder="Enter here..." v-model="user.name" type="text"/>
                </b-col>
                <b-col cols="9" md="9">
                  <b-form-input id="full-name" placeholder="Enter here..." v-model="user.name" type="text"/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="TAX" label-for="tax">
              <b-form-input id="tax" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="LAND" label-for="land">
              <b-form-input id="land" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group label="PRESERVATION" label-for="preservation">
              <b-form-input id="preservation" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="HRA/HRB no." label-for="hraNo">
              <b-form-input id="hraNo" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Tax ID" label-for="taxID">
              <b-form-input id="taxID" placeholder="Enter here..." v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab title="Tickets" active>
          <databases :actions="true" :items="rowsTickets" :fields="columnTicket" />
        </b-tab>
        <b-tab title="Contradictions">
          <databases :items="rowsContradictions" :fields="columnContradictions" />
        </b-tab>
        <b-tab title="Priview invoices">
          <databases :items="rowsPreviewInvoices" :fields="columnPreviewInvoices" />
        </b-tab>
        <b-tab title="Sales Orders SFM">
          <databases :items="rowsSalesOrders" :fields="columnSalesOrders" />
        </b-tab>
        <b-tab title="Contact Persons">
          <databases :items="rowsContactPersons" :fields="columnContactPersons" />
        </b-tab>
        <b-tab title="Appointment track">
          <databases :items="rowsAppointment" :fields="columnAppointment" />
        </b-tab>
        <b-tab title="Bankdata">
          <databases :items="rowsBankdata" :fields="columnBankdata" />
        </b-tab>
        <b-tab title="Point of sales">
          <databases :items="rowsPointOfSales" :fields="columnPointOfSales" />
        </b-tab>
        <b-tab title="Payments">
          <databases :items="rowsPayments" :fields="columnPayments" />
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

      columnTicket: [
        { key: 'id', label: 'Ticket ID' },
        { key: 'ticket_name', label: 'Ticket name', sortable: true },
        { key: 'link_to_ticket', label: 'Link to ticket', sortable: true },
        { key: 'ticket_board', label: 'Ticket board', sortable: true },
        { key: 'deadline', label: 'deadline', sortable: true },
        { key: 'planed_treatment_week', label: 'planned Treatment Weekl', sortable: true },
        { key: 'progress', label: 'Progress', sortable: true },
        'Action',
      ],
      columnContradictions: [
        { key: 'id', label: 'ID'},
      ],
      columnPreviewInvoices: [
        { key: 'id', label: 'ID'},
      ],
      columnSalesOrders: [
        { key: 'id', label: 'ID'},
      ],
      columnContactPersons: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: ' Surename', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'user_team', label: 'City', sortable: true },
        { key: 'last_role', label: 'E-Mail', sortable: true },
        { key: 'user_pos', label: 'Mobile', sortable: true },
        { key: 'user_pos', label: 'Department', sortable: true },
        'Action',
      ],
      columnAppointment: [
        { key: 'id', label: 'ID'},
      ],
      columnBankdata: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: 'Name ', sortable: true },
        { key: 'iban', label: 'IBAN', sortable: true },
        { key: 'bic', label: 'BIC', sortable: true },
        { key: 'vat', label: 'VAT', sortable: true },
        { key: 'active', label: 'active', sortable: true },
        { key: 'misc1', label: 'Misc1', sortable: true },
        { key: 'misc2', label: 'Misc2', sortable: true },
        'Action',
      ],
      columnPointOfSales: [
        { key: 'id', label: 'ID'},
      ],
      columnPayments: [
        { key: 'id', label: 'ID'},
      ],
      columnUsers: [
        { key: 'id', label: 'Id' },
        { key: 'surename', label: 'Surename', sortable: true },
        { key: 'name', label: 'First Name', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'team', label: 'Team', sortable: true },
        'Action',
      ],
      
      /*Rows placeholders's values */
      rowsUsers: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          surename: 'NYA',
          name: 'Josue',
          type: 'Admin',
          team: 'josue.nya@gohze.org',
        },
  
      ],
      rowsPayments: [],
      rowsPointOfSales: [],
      rowsBankdata: [
        {
          id : 1,
          name: "Fictive Banck",
          iban:"",
          bic:"",
          vat:"",
          active:"",
          misc1:"",
          misc2:"",
        },
      ],
      rowsAppointment: [],
      rowsContactPersons: [
      {     
         id: 1,
        full_name: 'John',
        first_name: 'Doe',
        user_team: 'Team_1',
        last_role: 'E-Mail',
        user_pos: 'Mobile',
        user_pos: 'Department',
        },
      ],
      rowsSalesOrders: [],
      rowsPreviewInvoices: [],
      rowsContradictions: [],
      rowsTickets: [
        {       
          id: 1,
          ticket_name: 'Fictive Name',
          link_to_ticket: 'http://balbalba',
          ticket_board: '',
          deadline: '',
          planed_treatment_week: '',
          progress : '',
        }
      ],

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
