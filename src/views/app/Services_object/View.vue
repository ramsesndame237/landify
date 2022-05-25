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
          <span>{{ $t('app.content.service_view') }}</span>
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
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.service.id') "
                  label-for="service_object_id"
                >
                  <b-form-input
                    id="service_object_id"
                    type="text"
                    readonly
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.service.id')"
                  />

                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.service.name') "
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.service.name')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.service.description') "
                  label-for="desc"
                >
                  <b-form-input
                    id="desc"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.service.description')"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.service.object') "
                  label-for="object"
                >
                  <b-form-select
                    id="object"
                    size="sm"
                    :disabled="view"
                    :options="serviceObjectOptions"
                    class="w-10 mr-3"
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
          :title="$t('app.tab.services.area')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsArea"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.services.location')">
          <databases
            :items="users"
            :fields="rowsLocation"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.services.contract')}`">
          <databases
            :items="users"
            :fields="rowsContract"
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
  BTab, BFormCheckbox, BFormRadio, BInputGroup,
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
          full_name: 'Archile',
          first_name: 'Dev',
          email: 'dev.arc@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      selected: 'first',
      filter: null,

      rowsArea: [
        { key: 'id', label: 'Area Id', sortable: true },
        { key: 'name', label: 'Area Name', sortable: true },
        { key: 'area', label: 'Area Space(proposed)', sortable: true },
        { key: 'name', label: 'Pos ID', sortable: true },
        { key: 'company_id', label: 'Company ID', sortable: true },
        { key: 'group_id', label: 'Customer group id', sortable: true },
        'Action',
      ],
      rowsLocation: [
        { key: 'id', label: 'Location Id' },
        { key: 'name', label: 'Location Name' },
        { key: 'space', label: 'Location total space' },
        { key: 'date', label: 'Location start date' },
        { key: 'city', label: 'Location city' },
        { key: 'country', label: 'Location country' },
        { key: 'location', label: 'Current owner of location(partner company)' },
        { key: 'area_id', label: 'current facility manager of location (partner company)', sortable: true },
        'Action',
      ],
      rowsContract: [
        { key: 'id', label: 'Id' },
        { key: 'criteria_id', label: 'Contract ID', sortable: true },
        { key: 'criteria_name', label: 'Contract Name', sortable: true },
        { key: 'valid_from', label: 'Begin date', sortable: true },
        { key: 'valid_to', label: 'End date', sortable: true },
        { key: 'type_criteria', label: 'Location city', sortable: true },
        { key: 'comment', label: 'Location country', sortable: true },
        { key: 'criteria_value', label: 'current owner of location (partner company)', sortable: true },
        { key: 'criteria_value2', label: 'current facility manager of location (partner company)', sortable: true },
        'Action',
      ],
      serviceObjectOptions: [
        { value: null, text: 'Please select the Contract Service' },
        { value: 'object1', text: 'Object 1' },
        { value: 'type2', text: 'Object 2' },
        { value: 'type3', text: 'Object 3' },
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
