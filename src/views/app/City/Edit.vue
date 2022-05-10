<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.form.label.address') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_payment') }}</b-button>
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
            <b-form-group
              :label="`${$t('app.form.label.id')}`"
              label-for="group-id"
              label-cols-md="12"
            >
            <b-form-input
              id="group-id"
              :placeholder="$t('app.form.placeholder.automatic')"
                
              v 
           />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group
              :label="$t('app.form.label.name')"
              label-for="name"
              label-cols-md="12"
            >
            <b-form-input
              id="name"
              v 
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group
              :label="$t('app.form.label.zip_code')"
              label-for="zip_code"
              label-cols-md="12"
            >
            <b-form-input
              id="zip_code"
              v 
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group
              :label="$t('app.form.label.country')"
              label-for="country"
              label-cols-md="12"
            >
            <b-form-select
              id="country"
              v 
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
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
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

</style>
