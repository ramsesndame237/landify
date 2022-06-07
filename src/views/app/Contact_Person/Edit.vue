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
          <span>{{ $t('app.content.create_contact_person') }}</span>
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
          <b-col cols="12">
            <b-form-group
              :label="`${$t('app.form.label.customer_group')} / ${$t('app.form.label.partner_group')} *`"
              label-for="group"
            >
              <b-row class="">
                <b-col
                  cols="12"
                  md="9"
                  class=""
                >
                  <b-row>
                    <b-col cols="11">
                      <b-form-input
                        id="group"
                        :disabled="view"
                        :placeholder="$t('app.form.placeholder.default')"
                      />
                    </b-col>
                    <b-button
                      size="sm"
                      class="d-flex align-items-center border"
                      variant="light"
                      :disabled="view"
                    >
                      <img
                        src="@/assets/images/icons/team.svg"
                        alt=""
                      >
                    </b-button>
                  </b-row>
                </b-col>
                <b-col
                  cols="12"
                  md="3"
                >
                  <b-form-group
                    :label="$t('app.form.label.salutation')"
                    label-cols="5"
                    content-cols="7"
                    class="bg-light px-2 rounded"
                  >
                    <b-form-radio-group
                      v-model="salutation.selected"
                      :options="salutation.options"
                      class="align-items-center sm:m-0 justify-content-end d-flex"
                      style="margin-top: 7px"
                      value-field="item"
                      text-field="name"
                      :disabled="view"
                      disabled-field="notEnabled"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            md="6"
          >
            <b-form-group
              :label="$t('app.form.label.title')"
              label-for="title"
            >
              <b-form-input
                id="title"
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
              :label="$t('app.form.label.surname')"
              label-for="surname"
            >
              <b-form-input
                id="surname"
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
              :label="$t('app.form.label.shortname')"
              label-for="shortname"
            >
              <b-form-input
                id="shortname"
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
              :label="$t('app.form.label.firstname')"
              label-for="firstname"
            >
              <b-form-input
                id="firstname"
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
              :label="$t('app.form.label.function')"
              label-for="function"
            >
              <b-form-input
                id="function"
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
              :label="$t('app.form.label.department')"
              label-for="department"
            >
              <b-form-input
                id="department"
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
              :label="$t('app.form.label.type')"
              label-for="type"
            >
              <b-form-tags
                id="type"
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
              :label="$t('app.form.label.user_id')"
              label-for="user_id"
            >
              <b-form-select
                id="user_id"
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
              :label="$t('app.form.label.country')"
              label-for="country"
            >
              <b-form-select
                id="country"
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
              :label="$t('app.form.label.phone')"
              label-for="phone"
            >
              <b-form-input
                id="phone"
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
              :label="$t('app.form.label.mobile')"
              label-for="mobile"
            >
              <b-form-input
                id="mobile"
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

        </b-row>
      </b-form>
    </b-card>
    <!--modal-->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_contact_person')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="6">
            <b-form-group
              :label="`${$t('app.form.label.partner_group_id')} / ${$t('app.form.label.customer_group_id')}`"
              label-for="group-id"
              label-cols-md="12"
            >
              <b-form-select
                id="group-id"
                :options="customerGroupOptions"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="`${$t('app.form.label.partner_group_name')} / ${$t('app.form.label.customer_group_name')}`"
              label-for="group-name"
              label-cols-md="12"
            >
              <b-form-input
                id="group-name"
                :placeholder="$t('app.form.placeholder.automatic_based_on_id')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.contact_person_id')"
              label-for="Contactperson_ID"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-select
                    id="Contactperson_ID"
                    :placeholder="$t('app.form.placeholder.automatic')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.last_name')"
              label-for="group-id"
              label-cols-md="12"
            >
              <b-form-input
                id="group-id"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.title')"
              label-for="group-name"
              label-cols-md="12"
            >
              <b-form-select
                id="group-name"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.firstname')"
              label-for="Firstname"
              label-cols-md="12"
            >
              <b-form-input
                id="Firstname"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.salutation')"
              label-for="Salutation"
              label-cols-md="12"
            >
              <b-form-select
                id="Salutation"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.shortname')"
              label-for="Shortname"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="6">
                  <b-form-input
                    id="Shortname"
                    :placeholder="$t('app.form.placeholder.default')"
                  />
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.function')"
              label-for="Function"
              label-cols-md="12"
            >
              <b-form-select
                id="Function"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.department')"
              label-for="Department"
              label-cols-md="12"
            >
              <b-form-select
                id="Department"
                :placeholder="$t('app.form.placeholder.default')"
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
        selected: 'male',
        options: [
          { item: 'male', name: this.$t('app.form.label.gender.male') },
          { item: 'female', name: this.$t('app.form.label.gender.female') },
        ],
      },

    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

</style>
