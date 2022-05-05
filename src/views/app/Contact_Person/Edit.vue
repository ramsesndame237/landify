<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_contact_person') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_contact_person') }}</b-button>
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
          <b-col cols="12" >
            <b-form-group 
              :label="`${$t('app.form.label.customer_group')} / ${$t('app.form.label.partner_group')} *`"
              label-for="group"
            >
              <b-row class="">
                <b-col cols="12" md="9" class="">
                  <b-row>
                    <b-col cols="11">
                      <b-form-input id="group" :placeholder="$t('app.form.placeholder.default')"  />
                    </b-col>
                      <b-button size="sm" class="d-flex align-items-center border" variant="light">
                        <img src="@/assets/images/icons/team.svg" alt="">
                      </b-button>
                  </b-row>
                </b-col>
                <b-col cols="12" md="3" >
                  <b-form-group :label="$t('app.form.label.salutation')" label-cols="5" content-cols="7" class="bg-light px-2 rounded">
                       <b-form-radio-group
                        v-model="salutation.selected"
                        :options="salutation.options"
                        class="align-items-center sm:m-0 justify-content-end d-flex"
                        style="margin-top: 7px"
                        value-field="item"
                        text-field="name"
                        disabled-field="notEnabled"
                      ></b-form-radio-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.title')"  label-for="title">
              <b-form-input id="title" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.surname')"  label-for="surname">
              <b-form-input id="surname" :placeholder="$t('app.form.placeholder.default')"  />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.shortname')"  label-for="shortname">
              <b-form-input id="shortname" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.firstname')" label-for="firstname">
              <b-form-input id="firstname" :placeholder="$t('app.form.placeholder.default')"  />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.function')"  label-for="function">
              <b-form-input id="function" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.department')"  label-for="department">
              <b-form-input id="department" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.type')"  label-for="type">
              <b-form-tags id="type" :placeholder="$t('app.form.placeholder.default')" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.user_id')"  label-for="user_id">
              <b-form-select id="user_id" :placeholder="$t('app.form.placeholder.default')" type="text" />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="`${$t('app.form.label.post_code')}, ${$t('app.form.label.place')}`">
              <b-row>
                <b-col cols="3" md="3">
                  <b-form-input id="f" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
                </b-col>
                <b-col cols="9" md="9">
                  <b-form-input id="full-name" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.country')"  label-for="country">
              <b-form-select id="country" :placeholder="$t('app.form.placeholder.default')"   />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.phone')" label-for="phone">
              <b-form-input id="phone" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.mobile')" label-for="mobile">
              <b-form-input id="mobile" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group  :label="$t('app.form.label.email')" label-for="email">
              <b-form-input id="email" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group :label="$t('app.form.label.fax')" label-for="fax">
              <b-form-input id="fax" :placeholder="$t('app.form.placeholder.default')"   type="text"/>
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>
    <!--  New Contact Person modal -->
    <b-modal
        id="modal-user"
        :ok-title="$t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_contact_person')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>

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
    BFormTags
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
        selected: 'male',
        options: [
          { item: 'male', name: this.$t('app.form.label.gender.male') },
          { item: 'female', name: this.$t('app.form.label.gender.female') },
        ]
      } 

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

</style>
