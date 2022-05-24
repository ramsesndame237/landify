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
          <span>{{ $t('app.content.location.view_title') }}</span>
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
                  :label=" $t('app.form.label.location.location_id') "
                  label-for="location_id"
                >
                  <b-form-input
                    id="location_id"
                    type="text"
                    :disabled="view"
                    readonly
                    :placeholder="$t('app.form.placeholder.location.location_id')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.total_space') "
                  label-for="total_space"
                >
                  <b-form-input
                    id="total_space"
                    :disabled="view"
                    type="text"
                    :placeholder="$t('app.form.placeholder.location.total_space')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.opening_day') "
                  label-for="opening_date"
                >
                  <b-form-datepicker
                    id="opening_date"
                    :disabled="view"
                    size="sm"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.location_name') "
                  label-for="location_name"
                >
                  <b-form-input
                    id="location_name"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.location.location_name')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.standorttyp') "
                  label-for="standorttyp"
                >
                  <b-form-input
                    id="standorttyp"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.location.standorttyp')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.object_description') "
                  label-for="location_description"
                >
                  <b-form-input
                    id="location_description"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.location.object_description')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.strabe') "
                  label-for="strabe"
                >
                  <b-form-input
                    id="strabe"
                    type="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.location.strabe')"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.address_location') "
                  label-for="h-name"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <b-form-select
                      id=""
                      size="sm"
                      :disabled="view"
                      :options="addressOptions"
                      class="w-10 mr-3"
                    />
                    <b-button variant="info">
                      {{ $t('app.btn.new') }}
                    </b-button>
                  </div>
                </b-form-group>
              </b-col>

              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.plz_ort') "
                  label-for="plz_ort"
                >
                  <div class="row">
                    <div class="col-4">
                      <b-form-input
                        type="text"
                        :disabled="view"
                        class="mr-3"
                      />
                    </div>
                    <div class="col-8">
                      <b-form-input
                        id="plz_ort"
                        type="text"
                        :disabled="view"
                        :placeholder="$t('app.form.placeholder.location.plz_ort')"
                      />
                    </div>

                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group
                  :label=" $t('app.form.label.location.land') "
                  label-for="land"
                >
                  <b-form-select
                    id="land"
                    size="sm"
                    :disabled="view"
                    :options="landOptions"
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
              <b-col
                cols="12"
                class="mb-2"
              >
                <!--                <databases
                  :items="[1,2,3,4]"
                  :fields="columnForm"
                />-->
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab
          :title="$t('app.tab.location_tab.tab1')"
          active
        >
          <databases
            :actions="true"
            :items="users"
            :fields="rowsAreas"
          />
        </b-tab>
        <b-tab :title="$t('app.tab.location_tab.tab2')">
          <databases
            :items="users"
            :fields="rowsObject"
          />
        </b-tab>
        <b-tab :title="`${$t('app.tab.location_tab.tab3')}`">
          <databases
            :items="users"
            :fields="rowsOwner"
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
      rowsAreas: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Area Name', sortable: true },
        { key: 'area_id', label: 'Area ID', sortable: true },
        { key: 'space', label: 'Proposed Space (qm)', sortable: true },
        { key: 'pos_name', label: 'PoS name', sortable: true },
        { key: 'contract_name', label: 'Contract name', sortable: true },
        { key: 'rental_space', label: 'Rental space (contract)', sortable: true },
        { key: 'apportionment', label: 'Apportionment area (contract)', sortable: true },
        { key: 'unit', label: 'Unit (sqm/pc) (contract)', sortable: true },
        { key: 'type', label: 'Type of use (contract)', sortable: true },
        { key: 'valid_from', label: 'Valid from date (contract)', sortable: true },
        { key: 'valid_until', label: 'Valid until date (contract)', sortable: true },
        'Action',
      ],
      rowsObject: [
        { key: 'id', label: 'Id' },
        { key: 'area_id', label: 'Service Object ID', sortable: true },
        { key: 'space', label: 'Service Object Name', sortable: true },
        { key: 'pos_name', label: 'Service Object type', sortable: true },
        { key: 'name', label: 'Area Name', sortable: true },
        'Action',
      ],
      rowsOwner: [
        { key: 'id', label: 'Id' },
        { key: 'partner', label: 'Partner ID', sortable: true },
        { key: 'partner_group', label: 'Partner group', sortable: true },
        { key: 'partner_company', label: 'Partner company name', sortable: true },
        { key: 'partner_type', label: 'Partner Type ', sortable: true },
        { key: 'city', label: 'City', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'valid_till', label: 'Valid from date', sortable: true },
        { key: 'valid_until', label: 'Valid until date', sortable: true },
        'Action',
      ],
      addressOptions: ['Address 1', 'Address 2', 'Address 3'],
      landOptions: ['Land 1', 'Land 2', 'Land 3'],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
