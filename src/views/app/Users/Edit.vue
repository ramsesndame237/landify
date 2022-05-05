<template>
<div>
  <b-card body-class="p-0">
    <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
      <div class="d-flex align-items-center">
        <img class="mr-1" src="@/assets/images/icons/people.svg" alt="">
        <span>{{ $t('app.content.create_user') }}</span>
      </div>
      <div class="d-flex align-items-center">
        <div class="mr-1 d-flex">
          <b-button v-b-modal.modal-user size="sm" variant="info" class="mr-1 d-flex">
            <img src="@/assets/images/pages/plusIcons.svg" alt="">
            {{ $t('app.content.create_user') }}  
          </b-button>
          <b-button size="sm" class="d-flex" variant="primary">
            <img src="@/assets/images/pages/deleteIcons.svg" alt="">
            {{ $t('app.btn.cancel') }}  
          </b-button>
        </div>
      </div>
    </div>
  </b-card>

  <b-card class="">
    <b-form>
      <b-row>
        <!-- Field: email -->
        <b-col cols="12" md="6">
          <b-form-group :label="`${ $t('app.form.label.email')}*`" label-for="username" >
            <b-form-input id="username" :placeholder="$t('app.form.placeholder.email')" />
          </b-form-group>
        </b-col>

        <!-- Field: password -->
        <b-col cols="12" md="6">
          <b-form-group :label="`${ $t('app.form.label.password')} *`" label-for="full-name">
            <b-form-input id="full-name" v-model="user.name" type="email" :placeholder="$t('app.form.placeholder.password')"  />
          </b-form-group>
        </b-col>

<!--        check box -->
        <b-col cols="12" md="7" class="d-flex mb-1">
          <div class="d-flex">
            <span class="mr-1">{{ $t('app.form.label.user_must_change_pass') }}</span>
            <b-form-checkbox />
          </div>
          <div class="d-flex ml-auto">
            <span class="mr-1"> {{ $t('app.form.label.user_locked') }} </span>
            <b-form-checkbox />
          </div>
        </b-col>

        <b-col cols="12" md="5" class="d-flex mb-1">
          <b-col cols="5" md-2><span>{{ $t('app.form.label.address') }}</span></b-col>
          <div class="d-flex">
            <span class="mr-1">{{ $t('app.form.label.gender.male') }}</span>
            <b-form-radio name="some-radios" />
          </div>
          <div class="d-flex ml-auto">
            <span class="mr-1">{{ $t('app.form.label.gender.female') }}</span>
            <b-form-radio name="some-radios" />
          </div>

        </b-col>

        <!-- Field: Name -->
        <b-col cols="12" md="6">
          <b-form-group :label="`${ $t('app.form.label.name') } *`" label-for="name">
            <b-form-input id="nameu" v-model="user.email" type="text" :placeholder="$t('app.form.placeholder.default')" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="`${ $t('app.form.label.firstname') }`" label-for="firstname">
            <b-form-input id="firstname" v-model="user.email" type="text" :placeholder="$t('app.form.placeholder.default')" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.name_abreviation')" label-for="abreviation">
            <b-form-input id="abbreviation" v-model="user.email" type="text" :placeholder="$t('app.form.placeholder.default')" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.function')" label-for="function">
            <b-form-input id="function" v-model="user.email" type="text" :placeholder="$t('app.form.placeholder.default')" />
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="`${$t('app.form.label.customer_group')} * `" label-for="customer-group">
            <div class="d-flex">
              <b-form-input class="mr-1" id="customer-group" v-model="user.email" type="text" :placeholder="$t('app.form.placeholder.default')"  />
              <img src="@/assets/images/icons/customerGroup.svg" alt="">
            </div>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.contact_person')" label-for="contact-person">
            <b-form-input id="contact-person" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.type')" label-for="user-type">
            <b-form-input id="user-type" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.title')" label-for="title">
            <b-form-input id="title" v-model="user.email" type="text"/>
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
  </b-card>

  <b-card>
    <b-tabs pills>
      <b-tab :title="$t('app.form.label.roles')" active>
        <databases :actions="true" :items="rowsRoles" :fields="columnRoles" />
      </b-tab>
      <b-tab :title="$t('app.form.label.customers')">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab :title="$t('app.form.label.team')">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab :title="$t('app.form.label.pos')">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <b-tab :title="$t('app.form.label.partner')">
        <databases :items="items" :fields="fields" />
      </b-tab>
      <template #tabs-end>
        <div class="first-bloc ml-auto d-flex align-items-center">
          <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">{{ $t('app.btn.new') }}</b-button>
          <b-button class="mr-1" size="sm" variant="primary">{{ $t('app.btn.cancel') }}</b-button>
          <div size="sm" class="d-flex align-items-center">
            <label class="d-inline-block text-sm-left mr-50">{{ $t('app.search.label') }}</label>
            <b-form-input
                id="filterInput"
                type="search"
                :aria-invalid="$t('app.search.label')"
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
              :label="$t('app.form.label.role_id')"
              label-for="role-id"
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
              :label="$t('app.form.label.email')"
              label-for="h-email"
              label-cols-md="4"
          >
            <b-form-input
                id="h-email"
                type="mail"
                :placeholder="$t('app.form.placeholder.email')"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
              :label="`${$t('app.form.label.name')} / ${$t('app.form.label.firstname')}`"
              label-cols-md="4"
          >
            <div class="d-flex">
              <b-form-input
                  class="mr-1"
                  id="h-name"
                  type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
              <b-form-input
                  md="4"
                  id="h-firstname"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
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
                :placeholder="$t('app.form.placeholder.email')"
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
                  class="mr-1"
                  id="h-name"
                  type="text"
                 :placeholder="$t('app.form.placeholder.default')"
              />
              <b-form-input
                  md="4"
                  id="h-firstname"
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
              label-cols-md="4">
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
          last_name: 'NYA',
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
        { text: this.$t('app.form.label.gender.male'), value: 'first2', disabled: false },
        { text: this.$t('app.form.label.gender.male'), value: 'second2', disabled: false },
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 11,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 12,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 13,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 14,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 15,
          // eslint-disable-next-line global-require
          last_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      fields: [
        { key: 'id', label: this.$t('app.form.label.id') },
        { key: 'last_name', label: this.$t('app.form.label.last_name'), sortable: true },
        { key: 'first_name', label: this.$t('app.form.label.firstname'), sortable: true },
        { key: 'email', label: this.$t('app.form.label.email'), sortable: true },
        { key: 'last_login', label: this.$t('app.form.label.last_login'), sortable: true },
        { key: 'user_type', label: this.$t('app.form.label.user_type'), sortable: true },
        { key: 'company', label: this.$t('app.form.label.company'), sortable: true },
        this.$t('app.form.label.action'),
      ],
      columnRoles: [
        { key: 'id', label: this.$t('app.form.label.id') },
        { key: 'role_id', label: this.$t('app.form.label.role_id'), sortable: true },
        { key: 'role_name', label: this.$t('app.form.label.role_name'), sortable: true },
        { key: 'role_permission', label: this.$t('app.form.label.role_permission'), sortable: true },
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
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
