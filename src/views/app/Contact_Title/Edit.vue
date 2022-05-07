<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_new_contact_title') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_new_contact_title') }}</b-button>
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
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.street')" label-for="street">
              <b-form-select id="street" :placeholder="$t('app.form.placeholder.default')"   />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.title')" label-for="title">
              <b-form-input id="title" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab :title="$t('app.tab.company')" active>
          <databases :actions="true" :items="items" :fields="fields" />
        </b-tab>
        <b-tab :title="$t('app.tab.customer_group')">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <b-tab :title="`${$t('app.tab.partner_company')}`">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <b-tab :title="$t('app.form.label.partner_company_group')">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <b-tab :title="$t('app.tab.contact_person')">
          <databases :items="items" :fields="fields" />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">{{$t('app.btn.new')}}</b-button>
            <b-button class="mr-1" size="sm" variant="primary">{{$t('app.btn.cancel')}}</b-button>
            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">{{$t('app.search.label')}}</label>
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
  </div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio,BInputGroup,
  BFormDatepicker,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormRadioGroup,BFormTags,
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
    BFormRadioGroup,
    BFormDatepicker,
    BFormTags,
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
      salutation:{
        selected: 'mr',
        options: [
          { item: 'mr', name: 'Mr' },
          { item: 'ms', name: 'Ms' },
        ]
      },
      items: [
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'company_name', label: "Name", sortable: true },
        'Action',
      ], 

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

</style>
