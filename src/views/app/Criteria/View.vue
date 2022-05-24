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
          <span>{{ $t('app.content.criteria_view') }}</span>
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
              {{ $t('app.btn.new') }}</b-button>
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
          <b-col
            cols="12"
            md="6"
          >
            <b-row>
              <b-col cols="8">
                <b-form-group
                  :label=" $t('app.form.label.criteria.id') "
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    type="text"
                    readonly
                    :placeholder="$t('app.form.placeholder.service.id')"
                  />

                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  :label=" $t('app.form.label.criteria.has') "
                  label-for="object"
                >
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.criteria.name') "
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    type="text"
                    :placeholder="$t('app.form.placeholder.criteria.name')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.criteria.type') "
                  label-for="contract"
                >
                  <b-form-select
                    id="contract"
                    size="sm"
                    :options="typeOptions"
                    class="w-10 mr-3"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            cols="12"
            md="6"
          >

            <b-row>
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.criteria.description') "
                  label-for="desc"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="text"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                  />
                </b-form-group>
              </b-col>
            </b-row>

          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab
          :title="$t('app.tab.criteria.contract')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsContract"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.criteria.choice')">
          <databases
            :items="users"
            :fields="rowsChoice"
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
      status: null,
      filter: null,
      text: null,

      rowsChoice: [
        { key: 'id', label: 'Choice Id' },
        { key: 'criteria_id', label: 'Choice Name', sortable: true },
        'Action',
      ],

      rowsContract: [
        { key: 'id', label: 'Id' },
        { key: 'criteria_id', label: 'Contract ID', sortable: true },
        { key: 'criteria_name', label: 'Contract Name', sortable: true },
        { key: 'comment', label: 'Criteria Comment', sortable: true },
        { key: 'value', label: 'Value', sortable: true },
        { key: 'unit', label: 'Unit', sortable: true },
        { key: 'exits', label: 'Exists', sortable: true },
        { key: 'valid_from', label: 'valid from date', sortable: true },
        { key: 'valid_to', label: 'valid to date', sortable: true },
        { key: 'choice_id', label: 'Choice Id', sortable: true },
        { key: 'choice_name', label: 'Choice Name', sortable: true },
        { key: 'type_criteria', label: 'Location city', sortable: true },
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
