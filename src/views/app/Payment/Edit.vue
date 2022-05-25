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
          <span>{{ $t('app.content.create_payment') }}</span>
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
            cols="4"
            md="4"
          >
            <b-form-group
              :label="$t('app.form.label.payment_id')"
              label-for="payment_info"
            >
              <b-form-input
                id="id"
                readonly
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-group
              :label="`${$t('app.form.label.payment_info')}`"
              label-for="group"
            >
              <b-row class="">
                <b-col
                  cols="12"
                  class=""
                >
                  <b-form-input
                    id="group"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.default')"
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
              :label="$t('app.form.label.debitor')"
              label-for="debitor"
            >
              <b-form-select
                id="debitor"
                :options="options"
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
              :label="$t('app.form.label.company_name')"
              label-for="company_name"
            >
              <b-form-select
                id="company_name"
                :disabled="view"
                :options="options"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.object_reference')"
              label-for="object_reference"
            >
              <b-form-input
                id="emaobject_referenceil"
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
              :label="$t('app.form.label.payment_type')"
              label-for="payment_type"
            >
              <b-form-input
                id="payment_type"
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
              :label="$t('app.form.label.date')"
              label-for="date"
            >
              <b-form-datepicker
                id="date"
                :disabled="view"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.value')"
              label-for="value"
            >
              <b-form-input
                id="value"
                :disabled="view"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>

        </b-row>
      </b-form>
    </b-card>
    <!--modal-->
  </div>
</template>

<script>
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio, BInputGroup,
  BFormDatepicker,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormRadioGroup, BFormTags,
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
    BFormRadioGroup,
    BFormDatepicker,
    BFormTags,
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
      salutation: {
        selected: 'mr',
        options: [
          { item: 'mr', name: 'Mr' },
          { item: 'ms', name: 'Ms' },
        ],
      },

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

</style>
