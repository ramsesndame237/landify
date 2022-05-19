<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_new_pos') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="primary" class="mr-1 d-flex">
              <img src="@/assets/images/icons/sort.svg" alt="">
            </b-button>
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_new_pos') }}</b-button>
            <b-button size="sm" class="d-flex" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('app.btn.cancel') }}
            </b-button>
            <div size="sm" class="pl-1 d-flex align-items-center">
              <b-form-datepicker
                  size="sm"
                  id="filterInput"
              />
            </div>
          </div>
        </div>
      </div>
    </b-card>

    <b-card class="">
      <b-form>
        <b-row>
          <b-col cols="12" md="5">
           <b-row>
             <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.customer_group')" label-for="customer_group">
                <b-form-select id="customer_group" v-model="selected"/>
              </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.company')" label-for="company">
                  <b-form-select id="company"  v-model="selected" type="text"/>
                </b-form-group>
              </b-col>

             <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.customer_pos_no')" label-for="customer_pos_no">
                <b-form-input id="customer_pos_no" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
              </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.first_year')" label-for="first_year">
                  <b-form-input id="first_year"  :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
                </b-form-group>
              </b-col>
             <b-col cols="12">
              <b-form-group :label="$t('app.form.label.pos_name')" label-for="pos_name">
                <b-form-input id="pos_name" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
              </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group :label="$t('app.form.label.pos_branch_no')" label-for="pos_branch_no">
                  <b-form-input id="pos_branch_no"  :placeholder="$t('app.form.placeholder.default')" v-model="user.name" type="text"/>
                </b-form-group>
              </b-col>
           </b-row>
          </b-col>
          <b-col cols="12" md="7">
            <b-row>
              <b-col cols="12" class="mb-2">
                <databases :items="[1,2,3,4]" :fields="columnForm" />
              </b-col>
            <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.address')" label-for="address">
                <b-form-input id="address" v-model="selected"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.street')" label-for="street">
                <b-form-select id="street" v-model="selected"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group :label="`${$t('app.form.label.post_code')} / ${$t('app.form.label.place')}`" label-for="customer_group">
                <b-row>
                  <b-col cols="4">
                    <b-form-input  id="customer_group" v-model="selected"/>
                  </b-col>
                  <b-col  cols="8">
                    <b-form-input  id="customer_group" v-model="selected"/>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.land')" label-for="land">
                <b-form-input id="land" v-model="selected"/>
              </b-form-group>
            </b-col>
          </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab :title="$t('app.tab.area')" active>
          <databases :actions="true" :items="rowsCompany" :fields="columnFields" />
        </b-tab>
        <b-tab :title="$t('app.tab.contract')">
          <databases :items="rowsPerson" :fields="columnFields" />
        </b-tab>
        <b-tab :title="`${$t('app.tab.service_object')}`">
          <databases :items="rowsTicketPackage" :fields="columnFields" />
        </b-tab>
        <b-tab :title="$t('app.tab.tickects_and_groups')">
          <databases :items="rowsUsers" :fields="columnFields" />
        </b-tab>
        <b-tab :title="$t('app.tab.contradictions_package')">
          <databases :items="rowsUsers" :fields="columnFields" />
        </b-tab>
        <b-tab :title="$t('app.tab.nk_accounts')">
          <databases :items="rowsUsers" :fields="columnFields" />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-role class="mr-1" size="sm" variant="info">{{$t('app.btn.new')}}</b-button>
            <b-button class="mr-1" size="sm" variant="primary">{{$t('app.btn.cancel')}}</b-button>
            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50">{{$t('app.search.label')}}</label>
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
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio,BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormDatepicker
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
    BFormDatepicker
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
      columnForm: [
        { key: 'id', label: '' },
        { key: 'location', label: 'Location name' },
        { key: 'group', label: 'Gruppe' },
        { key: 'aze', label: 'Verwal-ter' },
        { key: 'azer', label: 'Eigen-tümer' },
        { key: 'eza', label: 'Name Fläche + Hauptnutzung' },
        { key: 'ifred', label: 'Miet-fläche' },
        { key: 'mlk', label: 'Umlage-fläche' },

      ],

      columnFields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Contract ID ', sortable: true },
        { key: 'fuame', label: 'Name Contract ', sortable: true },
        { key: 'll_name', label: 'Vertrags-typ ', sortable: true },
        { key: 'l_name', label: 'Area ID ', sortable: true },
        { key: 'l_name', label: 'Area Name ', sortable: true },
        { key: 'fulme', label: 'Contract Area Description ', sortable: true },
        { key: 'l_name', label: 'Haupt-nutzung ', sortable: true },
        { key: 'fuame', label: 'Beginn Datum ', sortable: true },
        { key: 'full_n', label: 'Ende Datum ', sortable: true },
        { key: 'sdf', label: 'Nächstes Ende ', sortable: true },
        { key: 'sdfsdf', label: 'Miet-fläche ', sortable: true },
        { key: 'dfvdf', label: 'Umlage-fläche ', sortable: true },
        { key: 'sd', label: 'Vertrags-dokumente ', sortable: true },
        'Action',
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
