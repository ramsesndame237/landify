<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_team') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_team') }}</b-button>
            <b-button size="sm" class="d-flex" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('app.btn.cancel') }}</b-button>
          </div>
        </div>
      </div>
    </b-card>
    <b-card class="">
      <b-form>
        <b-row>
          <!-- Field: email -->
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.team_id')" label-for="username">
              <b-form-input :placeholder="$t('app.form.placeholder.default')" id="username" v-model="user.name"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="('app.form.label.name')" label-for="full-name">
              <b-form-input :placeholder="$t('app.form.placeholder.default')" id="full-name" v-model="user.name" type="email"/>
            </b-form-group>
          </b-col>

          <!-- Field: Name -->
          <b-col cols="12" md="12">
            <label for="textarea-default"> {{ $t('app.form.label.description') }} </label>
            <b-form-textarea
                id="textarea-default"
                :placeholder="$t('app.form.placeholder.default')"
                rows="3"
            />
          </b-col>

        </b-row>
      </b-form>
    </b-card>

    <b-modal
        id="modal-primary"
        :ok-title="$t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_team')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.team_id')"
                label-for="team-id"
                label-cols-md="4"
            >
              <b-form-input
                  id="team-id"
                  type="text"
                  :label=" $t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.name')"
                label-for="name-team"
                label-cols-md="4"
            >
              <b-form-input
                  id="name-team"
                  type="text"
                  :label=" $t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.description')"
                label-for="description"
                label-cols-md="4"
            >
              <div class="d-flex">
                <b-form-input
                    class="mr-1"
                    id="description"
                    type="text"
                  :label=" $t('app.form.placeholder.default')"
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
    BFormTextarea
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
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
