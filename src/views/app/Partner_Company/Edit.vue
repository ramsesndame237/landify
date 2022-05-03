<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <span>{{ $t('app.content.company_detail_view') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-user size="sm" variant="info" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button v-b-modal.modal-user size="sm" variant="warning" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              {{ $t('app.btn.edit') }}
            </b-button>
            <b-button size="sm" class="d-flex align-items-center" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('app.btn.delete') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group  :label="$t('app.form.label.company_name')" label-for="name_company">
              <b-form-input id="name_company" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.customer_group_name')"  label-for="group-name">
              <b-form-input id="group-name" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.street')"  label-for="street">
              <b-form-input id="street" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.email')" label-for="email">
              <b-form-input id="email" :placeholder="$t('app.form.placeholder.email')" v-model="user.name" type="mail"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.address_addition')" label-for="address_addition">
              <b-form-input id="address_addition" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.phone')" label-for="full-name">
              <b-form-input id="full-name" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="`${$t('app.form.label.post_code')}, ${$t('app.form.label.place')}`" >
              <b-row>
                <b-col cols="3" md="3">
                  <b-form-input id="f" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
                </b-col>
                <b-col cols="9" md="9">
                  <b-form-input id="full-name" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.fax')"  label-for="tax">
              <b-form-input id="tax" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group  :label="$t('app.form.label.land')" label-for="land">
              <b-form-input id="land" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.land')" label-for="preservation">
              <b-form-input id="preservation" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.hra_hrb')" label-for="hraNo">
              <b-form-input id="hraNo" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.tax_id')"  label-for="taxID">
              <b-form-input id="taxID" :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-card>
      <b-tabs pills>
        <b-tab :title="$t('app.tab.tickets')" active>
          <databases :actions="true" :items="rowsTickets" :fields="columnTicket" />
        </b-tab>
        <b-tab  :title="$t('app.tab.contradictions')" >
          <databases :items="rowsContradictions" :fields="columnContradictions" />
        </b-tab>
        <b-tab :title="$t('app.tab.preview_invoices')" >
          <databases :items="rowsPreviewInvoices" :fields="columnPreviewInvoices" />
        </b-tab>
        <b-tab  :title="$t('app.tab.sales_order_sfm')" >
          <databases :items="rowsSalesOrders" :fields="columnSalesOrders" />
        </b-tab>
        <b-tab :title="$t('app.tab.contact_person')" >
          <databases :items="rowsContactPersons" :fields="columnContactPersons" />
        </b-tab>
        <b-tab :title="$t('app.tab.tickets')" >
          <databases :items="rowsAppointment" :fields="columnAppointment" />
        </b-tab>
        <b-tab  :title="$t('app.form.label.bankdata')" >
          <databases :items="rowsBankdata" :fields="columnBankdata" />
        </b-tab>
        <b-tab  :title="$t('app.sidebar.pos')" >
          <databases :items="rowsPointOfSales" :fields="columnPointOfSales" />
        </b-tab>
        <b-tab  :title="$t('app.tab.payments')" >
          <databases :items="rowsPayments" :fields="columnPayments" />
        </b-tab>
        <b-tab  :title="$t('app.tab.users')" >
          <databases :items="rowsUsers" :fields="columnUsers" />
        </b-tab>

        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">{{ $t('app.btn.new') }}</b-button>
            <b-button class="mr-1" size="sm" variant="primary">{{ $t('app.btn.delete') }}</b-button>
            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">{{ $t('app.search.label') }}</label>
              <b-form-input
                  id="filterInput"
                  type="search"
                  :placeholder="$t('app.search.palceholder')"
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
