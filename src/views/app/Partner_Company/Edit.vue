<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex align-items-center justify-content-between"
        style="padding: 10px"
      >
        <div class="d-flex align-items-center">
          <span>{{ $t('app.content.partner_company_detail_view') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-if="view"
              size="sm"
              variant="info"
              class="mr-1 d-flex"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              Edit
            </b-button>
            <b-button
              v-else
              size="sm"
              variant="info"
              class="mr-1 d-flex"
              @click.prevent="view = !view"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >

              Save
            </b-button>
            <b-button
              v-if="!view"
              size="sm"
              class="d-flex"
              variant="primary"
              @click="view = !view"
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
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.company_name')"
              label-for="name_company"
            >
              <b-form-input
                id="name_company"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.partner_company_group')"
              label-for="group-name"
            >
              <b-form-select
                id="group-name"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.street')"
              label-for="street"
            >
              <b-form-input
                id="street"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.partner_type')"
              label-for="partner-type"
            >
              <b-form-select
                id="partner-type"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.address_addition')"
              label-for="partner-address_addition"
            >
              <b-form-input
                id="partner-address_addition"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.email')"
              label-for="email"
            >
              <b-form-input
                id="email"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.email')"
                type="mail"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group :label="`${$t('app.form.label.post_code')}, ${$t('app.form.label.place')}`">
              <b-row>
                <b-col
                  cols="3"
                  md="3"
                >
                  <b-form-input
                    id="f"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.default')"
                    type="text"
                  />
                </b-col>
                <b-col
                  cols="9"
                  md="9"
                >
                  <b-form-input
                    id="full-name"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.default')"
                    type="text"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.phone')"
              label-for="full-phone"
            >
              <b-form-input
                id="full-phone"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.land')"
              label-for="land"
            >
              <b-form-input
                id="land"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.fax')"
              label-for="fax"
            >
              <b-form-input
                id="fax"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.land')"
              label-for="preservation"
            >
              <b-form-input
                id="preservation"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.hra_hrb')"
              label-for="hraNo"
            >
              <b-form-input
                id="hraNo"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.tax_id')"
              label-for="taxID"
            >
              <b-form-select
                id="taxID"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
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
          :title="$t('app.tab.tickets')"
          active
        >
          <databases
            :actions="true"
            link_view="modal-primary"
            :items="rowsTickets"
            :fields="columnTicket"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.contradictions')">
          <databases
            link_view="link_view-primary"
            :items="rowsContradictions"
            :fields="columnContradictions"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.preview_invoices')">
          <databases
            link_view="link_view-primary"
            :items="rowsPreviewInvoices"
            :fields="columnPreviewInvoices"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.contact_person')">
          <databases
            link_view="link_view-primary"
            :items="rowsContactPersons"
            :fields="columnContactPersons"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.appointment_track')">
          <databases
            link_view="link_view-primary"
            :items="rowsAppointment"
            :fields="columnAppointment"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.location')">
          <databases
            link_view="link_view-primary"
            :items="[]"
            :fields="[]"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.users')">
          <databases
            link_view="link_view-primary"
            :items="rowsUsers"
            :fields="columnUsers"
          />
        </b-tab>

        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button
              v-b-modal.modal-primary
              class="mr-1"
              size="sm"
              variant="info"
            >
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              class="mr-1"
              size="sm"
              variant="primary"
            >
              {{ $t('app.btn.delete') }}
            </b-button>
            <div
              size="sm"
              class="d-flex align-items-center"
            >
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
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_customer')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.customer_group_id')"
              label-for="customer-group-id"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="customer-group-id"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_id')"
              label-for="companyId"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="companyId"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_name')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.partner_type')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="companyName"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.address')"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="address"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                >
                  {{ $t('app.btn.new') }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          id=""
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.street')"
              label-for="companyName"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="companyName"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.address_suffix')"
              label-for="address_suffix"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="address_suffix"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.post_code')}, ${$t('app.form.label.place')} `"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="2">
                  <b-form-input
                    id="postcode"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
                <b-col cols="4">
                  <b-form-input
                    id="addressPlace"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.land')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="land"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

        </div>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.contact_details')"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="address"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                >
                  {{ $t(('app.btn.new')) }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          id=""
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.email')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.email')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.phone')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.mobile')} / ${$t('app.form.label.cell_phone_num')}`"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.fax')"
              label-cols-md="12"
            >
              <b-form-select
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-form-group>

          </b-col>
        </div>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.company_details')"
              label-for="companyDetails"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="companyDetails"
                  />
                </b-col>
                <b-button
                  variant="info"
                  class="-pl-3"
                >
                  {{ $t('app.btn.new') }}
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          id=""
          class=""
        >
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.tax_id')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.hra_hrb')"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
        </div>
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
  data() {
    return {
      view: true,
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
        { key: 'id', label: 'ID' },
      ],
      columnPreviewInvoices: [
        { key: 'id', label: 'ID' },
      ],
      columnSalesOrders: [
        { key: 'id', label: 'ID' },
      ],
      columnContactPersons: [
        { key: 'id', label: 'User Id' },
        { key: 'full_name', label: ' Surname', sortable: true },
        { key: 'user_mail', label: 'E-Mail', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'last_name', label: 'Last Name', sortable: true },
        { key: 'user_team', label: 'User Type', sortable: true },
        { key: 'user_pos', label: 'User Last Login', sortable: true },
        { key: 'mobile', label: 'Mobile', sortable: true },
        { key: 'departement', label: 'Department', sortable: true },
        'Action',
      ],
      columnAppointment: [
        { key: 'id', label: 'ID' },
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
        { key: 'id', label: 'ID' },
      ],
      columnPayments: [
        { key: 'id', label: 'ID' },
      ],
      columnUsers: [
        { key: 'id', label: 'Id' },
        { key: 'surename', label: 'Surename', sortable: true },
        { key: 'name', label: 'First Name', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'team', label: 'Team', sortable: true },
        'Action',
      ],

      /* Rows placeholders's values */
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
          id: 1,
          name: 'Fictive Banck',
          iban: '',
          bic: '',
          vat: '',
          active: '',
          misc1: '',
          misc2: '',
        },
      ],
      rowsAppointment: [],
      rowsContactPersons: [
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
          progress: '',
        },
      ],

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
