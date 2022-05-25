<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex align-items-center justify-content-between"
        style="padding: 10px"
      >
        <div class="d-flex">
          <img
            src="@/assets/images/icons/team.svg"
            alt=""
            class="mr-1"
          >
          <span>{{ $t('app.content.create_customer_group') }}</span>
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
          <!-- Field: group id -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.id')"
              label-for="id"
            >
              <b-form-input
                id="id"
                v-model="user.name"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>

          <!-- Field: customer group name -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.partner_type')"
              label-for="full-name"
            >
              <b-form-input
                id="full-name"
                v-model="user.name"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

          <!-- Field: Name -->
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.partner_group_name')"
              label-for="name"
            >
              <b-form-input
                id="nameu"
                v-model="user.email"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>
          <!-- Field: Name -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              :label="$t('app.form.label.description')"
              label-for="name"
            >
              <b-form-input
                id="nameu"
                v-model="user.email"
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
          :title="$t('app.tab.company')"
          active
        >
          <databases
            :actions="true"
            :items="rowsCompany"
            :fields="columnCompany"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.contact_person')">
          <databases
            :items="rowsPerson"
            :fields="columnPerson"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.users')">
          <databases
            :items="rowsUsers"
            :fields="columnUsers"
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
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              class="mr-1"
              size="sm"
              variant="primary"
            >
              {{ $t('app.btn.cancel') }}
            </b-button>
            <div
              size="sm"
              class="d-flex align-items-center"
            >
              <label class="d-inline-block text-sm-left mr-50">{{ $t('app.search.label') }}</label>
              <b-form-input
                id="filterInput"
                type="search"
                :placeholder="$t('app.search.placeholder')"
              />
            </div>
          </div>
        </template>
      </b-tabs>
    </b-card>

    <!--  user modal -->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_user')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.company_name')} *`"
              label-for="company-name"
              label-cols-md="4"
            >
              <b-form-input
                id="company-name"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.email')} *`"
              label-for="h-email"
              label-cols-md="4"
            >
              <b-form-input
                id="h-email"
                type="email"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.name')} / ${$t('app.form.label.firstname')}`"
              label-for="h-name"
              label-cols-md="4"
            >
              <div class="d-flex">
                <b-form-input
                  id="h-name"
                  class="mr-1"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
                />
                <b-form-input
                  id="h-firstname"
                  md="4"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </div>

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.mobile')}`"
              label-for="h-mobile"
              label-cols-md="4"
            >
              <b-form-input
                id="h-mobile"
                type="number"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.fax')}`"
              label-for="h-fax"
              label-cols-md="4"
            >
              <b-form-input
                id="h-fax"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.deputy')}`"
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
              :label="`${$t('app.form.label.type')}`"
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
        'Action',
      ],

      /* Rows placeholders's values */
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
          id: 1,
          name: ' Doe',
          first_name: ' John',
          address: ' 123 street',
          title: ' Somthing',
          department: ' ICT',
          email: ' johndoe@gmail.com',
          phone: ' +237 123 465 789',
          mobile: ' +237 123 465 789',
          address_city: ' Bp 123 Yde',
        },
        {
          id: 1,
          name: ' Doe',
          first_name: ' John',
          address: ' 123 street',
          title: ' Somthing',
          department: ' ICT',
          email: ' johndoe@gmail.com',
          phone: ' +237 123 465 789',
          mobile: ' +237 123 465 789',
          address_city: ' Bp 123 Yde',
        },
        {
          id: 1,
          name: ' Doe',
          first_name: ' John',
          address: ' 123 street',
          title: ' Somthing',
          department: ' ICT',
          email: ' johndoe@gmail.com',
          phone: ' +237 123 465 789',
          mobile: ' +237 123 465 789',
          address_city: ' Bp 123 Yde',
        },
        {
          id: 1,
          name: ' Doe',
          first_name: ' John',
          address: ' 123 street',
          title: ' Somthing',
          department: ' ICT',
          email: ' johndoe@gmail.com',
          phone: ' +237 123 465 789',
          mobile: ' +237 123 465 789',
          address_city: ' Bp 123 Yde',
        },
        {
          id: 1,
          name: ' Doe',
          first_name: ' John',
          address: ' 123 street',
          title: ' Somthing',
          department: ' ICT',
          email: ' johndoe@gmail.com',
          phone: ' +237 123 465 789',
          mobile: ' +237 123 465 789',
          address_city: ' Bp 123 Yde',
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
