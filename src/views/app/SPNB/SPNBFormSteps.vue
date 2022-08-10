<template>
  <div class="mb-2">



<!--    <b-row v-if="currentStep == 4" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_area') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <entity-form table="area" :definition="Table.area" table-definition-key="area" create :initial-data="{}"-->
<!--                     cols="12"/>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_location') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 5" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_pos') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <entity-form table="pos" :definition="Table.pos" table-definition-key="pos" create :initial-data="{}"-->
<!--                     cols="12"/>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_location') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--        <div class="bg-light mt-2 p-1 text-sm">-->
<!--          <small>-->
<!--            {{ $t('app.content.new_busness_text_pos_msg') }}-->
<!--          </small>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 6" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_contract') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <entity-form table="contract" :definition="Table.contract" table-definition-key="contract" create-->
<!--                     :initial-data="{}" cols="12"/>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 7" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_contract') }} - {{ $t('app.content.contract_areas') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_id')" label-for="contract_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_name')" label-for="contract_name" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_name" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.pos_id')" label-for="pos_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="pos_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.area_id')" label-for="area_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col>-->
<!--                <b-form-select id="area_id"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="12">-->
<!--            <b-form-select id="description"/>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.usage_type')" label-for="usage_type" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-select id="usage_type" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.main_usage')" label-for="main_usage" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-select id="main_usage" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.rental_space_unit')" label-for="rental_space_unit"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="rental_space_unit" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.allocation_space_unit')" label-for="allocation_space_unit"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="allocation_space_unit" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.unit')" label-for="unit" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-select id="unit" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.valid_from')" label-for="valid_from" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="valid_from" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.valid_to')" label-for="valid_to" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="valid_to" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_contact') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 8" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_contract') }} - {{ $t('app.content.contract_criteria') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_id')" label-for="contract_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_name')" label-for="contract_name" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_name" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_criteria')" label-for="contract_criteria"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_criteria" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="12">-->
<!--            <b-form-select id="description"/>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.valid_from')" label-for="valid_from" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="valid_from" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.valid_to')" label-for="valid_to" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="valid_to" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.exists')" label-for="exists" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="exists" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.value')" label-for="value" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="value" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_contact_cirteria') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 9" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_contract') }} - {{ $t('app.content.contract_special_rights') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_id')" label-for="contract_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_name')" label-for="contract_name" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_name" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_special_rights')" label-for="contract_special_rights"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_special_rights" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="12">-->
<!--            <b-form-select id="description"/>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.valid_to')" label-for="valid_to" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="valid_to" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.prior_notice_date')" label-for="prior_notice_date"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="prior_notice_date" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.passive')" label-for="passive" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="passive" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.availed')" label-for="availed" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="availed" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_contact_special_right') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row v-if="currentStep == 10" class="">-->
<!--      <b-col cols="12" class="bg-light pt-1 pb-1 mb-2">-->
<!--        {{ $t('app.content.create_contract') }} - {{ $t('app.content.contract_recurring_payments') }}-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_id')" label-for="contract_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_name')" label-for="contract_name" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="contract_name" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.contract_recurring_payment_id')"-->
<!--                        label-for="contract_recurring_payment_id" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-select id="contract_recurring_payment_id" :placeholder="$t('app.form.placeholder.automatic')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="12">-->
<!--            <b-form-select id="description"/>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.recurring_payments_type')" label-for="recurring_payments_type"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-select id="recurring_payments_type" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.sum_per_moth')" label-for="sum_per_moth" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="sum_per_moth" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.condition_percentage')" label-for="condition_percentage"-->
<!--                        label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="condition_percentage" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.percentage')" label-for="percentage" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="percentage" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col cols="12">-->
<!--          <b-form-group :label="$t('app.form.label.index_clause')" label-for="index_clause" label-cols-md="12">-->
<!--            <b-row>-->
<!--              <b-col cols="12">-->
<!--                <b-form-input id="index_clause" :placeholder="$t('app.form.placeholder.default')"/>-->
<!--              </b-col>-->
<!--            </b-row>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--      <b-col cols="12" md="6" class="p-0">-->
<!--        <Databases ref="datatable" :filter="filter" link="user-edit" :current-page="1" :page-options="[3, 5, 10]"-->
<!--                   :items="items" :fields="fields"/>-->
<!--        <div class="d-flex justify-content-center">-->
<!--          <b-button size="md" class="d-flex align-items-center mt-2" variant="info">-->
<!--            {{ $t('app.btn.save_add_contact_recuring_payment') }}-->
<!--          </b-button>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
  </div>
</template>

<script>

import {
  BCard,
  BTab, BFormCheckbox, BFormRadio, BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'
import EntityForm from "@/views/app/Generic/EntityForm";
import Table from '@/table'
import Field from "@/views/app/Generic/Field";

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  name: 'SPNBFormSteps',
  components: {
    Field,
    EntityForm,
    Databases,
    BCard,
    BTab,
    BTabs,
    BRow,
    BFormGroup,
    BCol,
    BForm,
    BFormInput,
    BButton,
    BModal,
    BFormSelect,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
  },
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      Table,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
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
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'name', label: this.$t('app.form.label.name'), sortable: true },
        { key: 'description', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'fd', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'fgf', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'description', label: this.$t('app.form.label.description'), sortable: true },
        { key: 'description', label: this.$t('app.form.label.description'), sortable: true },
        this.$t('app.form.label.action'),
      ],
      address: null,
      contact: null,
      company: null,

      showAddress: false,
      showContact: false,
      showCompany: false,

      addressOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      contactOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      companyOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
    }
  },
}
</script>
