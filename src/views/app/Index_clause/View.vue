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
          <span>{{ $t('app.content.index_view') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button
              v-if="view"
              size="sm"
              variant="info"
              class="mr-1 d-flex justify-content-center align-items-center"
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
              class="mr-1 d-flex justify-content-center align-items-center"
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
              class="d-flex justify-content-center align-items-center"
              variant="primary"
              @click="view = !view"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              Cancel</b-button>
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
                  :label=" $t('app.form.label.index.id') "
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    type="text"
                    readonly
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.index.id')"
                  />

                </b-form-group>
              </b-col>
              <b-col cols="4">
                <b-form-group
                  :label=" $t('app.form.label.index.year') "
                  label-for="contract"
                >
                  <b-form-select
                    id="contract"
                    size="sm"
                    :disabled="view"
                    :options="yearOptions"
                    class="w-10 mr-3"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.index.rule') "
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.index.rule')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.index.date') "
                  label-for="date"
                >
                  <b-form-datepicker
                    id="date"
                    size="sm"
                    :disabled="view"
                    class="w-10 mr-3"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.index.change_per') "
                  label-for="change_per"
                >
                  <b-form-input
                    id="changer_per"
                    type="text"
                    :disabled="view"
                    class="w-10 mr-3"
                    :placeholder="$t('app.form.placeholder.index.change_per')"
                  />
                </b-form-group>
              </b-col><b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.index.minimum') "
                  label-for="minimum"
                >
                  <b-form-input
                    id="minimum"
                    type="text"
                    :disabled="view"
                    class="w-10 mr-3"
                    :placeholder="$t('app.form.placeholder.index.minimum')"
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
                  :label=" $t('app.form.label.index.description') "
                  label-for="desc"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.index.description')"
                    rows="3"
                    max-rows="6"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="8">
                <b-form-group
                  :label=" $t('app.form.label.index.points') "
                  label-for="points"
                >
                  <b-form-input
                    id="points"
                    type="text"
                    :disabled="view"
                    class="w-10 mr-3"
                    :placeholder="$t('app.form.placeholder.index.points')"
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
          :title="$t('app.tab.index_pay')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsPayment"
          />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
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
      view: true,
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

      rowsPayment: [
        { key: 'id', label: 'Recurring payment ID' },
        { key: 'contract_id', label: 'Contract ID', sortable: true },
        { key: 'name', label: 'Contract name', sortable: true },
        { key: 'comment', label: 'Condition Comment', sortable: true },
        { key: 'year', label: 'Base year', sortable: true },
        { key: 'pay', label: 'Recurring Pay Type', sortable: true },
        { key: 'type', label: 'Maturity type', sortable: true },
        { key: 'date', label: 'Begin date', sortable: true },
        { key: 'percentage', label: 'Percentage', sortable: true },
        { key: 'sum', label: 'Sum per month', sortable: true },
        'Action',
      ],

      yearOptions: [
        { value: null, text: 'Please select the year' },
        { value: 'type1', text: 'Year 1' },
        { value: 'type2', text: 'Year 2' },
        { value: 'type3', text: 'Year 3' },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
