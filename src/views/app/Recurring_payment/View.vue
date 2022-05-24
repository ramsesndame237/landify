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
          <span>{{ $t('app.content.right_view') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="primary"
              class="mr-1 d-flex justify-content-center align-items-center"
            >
              <img
                src="@/assets/images/icons/sort.svg"
                alt=""
              >
            </b-button>
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="info"
              class="mr-1 d-flex justify-content-center align-items-center"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              size="sm"
              class="d-flex justify-content-center align-items-center"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.cancel') }}
            </b-button>
            <div
              size="sm"
              class="ml-4 d-flex align-items-center"
            >
              <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
              <b-form-input
                id="search"
                v-model="filter"
                type="search"
                :placeholder="$t('app.search.palceholder')"
              />
            </div>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.id') "
              label-for="id"
            >
              <b-form-input
                id="id"
                type="text"
                readonly
                :placeholder="$t('app.form.placeholder.pay.id')"
              />

            </b-form-group>
          </b-col>
          <b-col cols="9">
            <b-form-group
              :label=" $t('app.form.label.pay.description') "
              label-for="desc"
            >
              <b-form-textarea
                id="textarea"
                v-model="text"
                :placeholder="$t('app.form.placeholder.right.description')"
                rows="3"
                max-rows="6"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.type') "
              label-for="type"
            >
              <b-form-select
                id="type"
                size="sm"
                :options="typeOptions"
                class="w-10 mr-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.sum') "
              label-for="sum"
            >
              <b-form-input
                id="sum"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.sum')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.cond') "
              label-for="cond"
            >
              <b-form-input
                id="cond"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.cond')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.percent') "
              label-for="percent"
            >
              <b-form-input
                id="percent"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.percent')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.begin') "
              label-for="begin"
            >
              <b-form-input
                id="begin"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.begin')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.end') "
              label-for="end"
            >
              <b-form-input
                id="end"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.end')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.value') "
              label-for="value"
            >
              <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                {{ $t('app.form.placeholder.pay.value') }}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col
            cols="3"
          >
            <b-form-group
              :label=" $t('app.form.label.pay.m_type') "
              label-for="m_type"
            >
              <b-form-select
                id="m_type"
                size="sm"
                :options="typeOptions"
                class="w-10"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.m_date') "
              label-for="m_date"
            >
              <b-form-input
                id="m_date"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_date')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.m_at') "
              label-for="m_at"
            >
              <b-form-input
                id="m_at"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_at')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.m_range') "
              label-for="m_range"
            >
              <b-form-input
                id="m_range"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.m_range')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3">
            <b-form-group
              :label=" $t('app.form.label.pay.index') "
              label-for="index"
            >
              <b-form-input
                id="index"
                type="text"
                :placeholder="$t('app.form.placeholder.pay.index')"
              />
            </b-form-group>
          </b-col>
        </b-row>

      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab
          :title="$t('app.tab.right_contract')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsContract"
            link=""
          />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
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
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio, BInputGroup, BFormTextarea,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormDatepicker,
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
    BFormTextarea,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
    BFormDatepicker,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      users: [
        {
          id: 1,
          full_name: 'Dev',
          first_name: 'MAG',
          email: 'gael.meli@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 1,
          full_name: 'Archille',
          first_name: 'Dev',
          email: 'dev.arc@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      selected: 'first',
      filter: null,
      text: null,

      rowsContract: [
        {
          key: 'id',
          label: 'Contract Id',
        },
        {
          key: 'group_name',
          label: 'Contract Name',
          sortable: true,
        },
        {
          key: 'comment',
          label: 'Criteria Comment',
          sortable: true,
        },
        {
          key: 'value',
          label: 'Value',
          sortable: true,
        },
        {
          key: 'unit',
          label: 'Unit',
          sortable: true,
        },
        {
          key: 'exits',
          label: 'Exits',
          sortable: true,
        },
        {
          key: 'grouphf_name',
          label: 'Valid from date',
          sortable: true,
        },
        {
          key: 'grour_name',
          label: 'Valid to date',
          sortable: true,
        },
        {
          key: 'groh_name',
          label: 'Choice ID',
          sortable: true,
        },
        {
          key: 'grop_name',
          label: 'Choice Name',
          sortable: true,
        },
        'Action',
      ],
      typeOptions: [
        { value: null, text: 'Please select the Contract Service' },
        { value: 'type1', text: 'Type 1' },
        { value: 'type2', text: 'Type 2' },
        { value: 'type3', text: 'Type 3' },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
