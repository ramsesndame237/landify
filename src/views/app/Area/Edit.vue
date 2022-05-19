<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_new_area') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button size="sm" variant="primary" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/icons/sort.svg" alt="">
            </b-button>
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex align-items-center">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_new_area') }}</b-button>
            <b-button size="sm" class="d-flex align-items-center" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('app.btn.cancel') }}
            </b-button>
            <div size="sm" class="pl-1 d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
              <b-form-input
                  v-model="filter"
                  id="filterInput"
                  type="search"
                  size="md"
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
          <b-col cols="12" >
           <b-row>
             <b-col cols="12" md="2">
              <b-form-group :label="$t('app.form.label.area_id')" label-for="area_id">
                <b-form-input id="area_id" :placeholder="$t('app.form.placeholder.default')"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="4">
              <b-form-group :label="$t('app.form.label.name_area')" label-for="name_area">
                <b-form-input id="name_area"  :placeholder="$t('app.form.placeholder.default')" type="text"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="3">
              <b-form-group :label="$t('app.form.label.area_id')" label-for="area_id">
                <b-form-input id="area_id" :placeholder="$t('app.form.placeholder.default')"/>
              </b-form-group>
            </b-col>
            <b-col cols="12" md="3">
              <b-form-group :label="$t('app.form.label.name_area')" label-for="name_area">
                <b-form-input id="name_area" :placeholder="$t('app.form.placeholder.default')" type="text"/>
              </b-form-group>
            </b-col>
             <b-col cols="12" md="6">
              <b-form-group :label="$t('app.form.label.location')" label-for="location">
                <b-form-select id="location" :placeholder="$t('app.form.placeholder.default')"/>
              </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.location_name')" label-for="location_name">
                  <div class="d-flex align-items-center justify-content-between">
                    <b-form-input id="location_name"  :placeholder="$t('app.form.placeholder.automatic')" v-model="user.name" type="text"/>
                    <b-button v-b-modal.modal-primary size="sm" variant="default" class="ml-1 d-flex align-items-center ">
                      <img src="@/assets/images/icons/Group.png" alt="" />
                    </b-button>
                  </div>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.street')" label-for="street">
                  <b-form-input id="street" :placeholder="$t('app.form.placeholder.default')"/>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="`${$t('app.form.label.post_code')} / ${$t('app.form.label.place')}`" label-for="customer_group">
                  <b-row>
                    <b-col cols="4">
                      <b-form-input  id="customer_group" :placeholder="$t('app.form.placeholder.default')"/>
                    </b-col>
                    <b-col  cols="8">
                      <b-form-input  id="customer_group" :placeholder="$t('app.form.placeholder.default')"/>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.address')" label-for="address">
                  <b-form-input id="address" :placeholder="$t('app.form.placeholder.default')" />
                </b-form-group>
              </b-col>
              <b-col cols="12" md="6">
                <b-form-group :label="$t('app.form.label.land')" label-for="land">
                  <b-form-select id="land" v-model="selected"/>
                </b-form-group>
              </b-col>
           </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab :title="$t('app.tab.contract')" active>
          <databases :actions="true" modal="modal-primary" :items="rowsCompany" :fields="contractFields" />
        </b-tab>
        <b-tab :title="$t('app.tab.pos')">
          <databases modal="modal-primary" :items="rowsPerson" :fields="posFields" />
        </b-tab>
        <b-tab :title="`${$t('app.tab.service_object')}`">
          <databases modal="modal-primary" :items="rowsTicketPackage" :fields="servicesFields" />
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
    <!--modal-->
    <b-modal
        id="modal-primary"
        :ok-title="$t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_new_area')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.location_id') "
                label-for="location_id"
                label-cols-md="4"
            >
              <b-form-select
                  id="location_id"
                  type="text"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.area_id') "
                label-for="area_id"
                label-cols-md="4"
            >
              <b-form-input
                  id="area_id"
                  type="text"
                  :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.name_area') "
                label-for="area_name"
                label-cols-md="4"
            >
              <b-form-input
                  id="area_name"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.name_area_ext') "
                label-for="name_area_ext"
                label-cols-md="4"
            >
              <b-form-input
                  id="name_area_ext"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.space') "
                label-for="space"
                label-cols-md="4"
            >
              <b-form-input
                  id="space"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.area_type') "
                label-for="area_type"
                label-cols-md="4"
            >
              <b-form-select
                  id="area_type"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.main_usage') "
                label-for="main_usage"
                label-cols-md="4"
            >
              <b-form-select
                  id="main_usage"
                  type="text"
              />
            </b-form-group>
          </b-col>
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

      contractFields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Contract ID ', sortable: true },
        { key: 'fuame', label: 'Mietfläche ', sortable: true },
        { key: 'll_name', label: 'Umlagefläche ', sortable: true },
        { key: 'l_name', label: 'Einheit (qm/Stk) ', sortable: true },
        { key: 'l_name', label: 'Area Name ', sortable: true },
        { key: 'fulme', label: 'Contract Area Description ', sortable: true },
        { key: 'l_name', label: 'Nutzungsart (Vertrag)', sortable: true },
        { key: 'fuame', label: 'Haupt- oder Nebennutzung ', sortable: true },
        { key: 'full_n', label: 'Ende Datum ', sortable: true },
        { key: 'sdf', label: 'Gültig von Datum ', sortable: true },
        { key: 'sdfsdf', label: 'Gültig bis Datum ', sortable: true },
        { key: 'dfvdf', label: 'Umlage-fläche ', sortable: true },
        'Action',
      ],
      posFields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'PoS ID ', sortable: true },
        { key: 'fuame', label: 'PoS Name ', sortable: true },
        { key: 'll_name', label: 'Company name ', sortable: true },
        { key: 'l_name', label: 'Tag (Vertriebslinie/OrgStruktur)', sortable: true },
        { key: 'fulme', label: 'Gültig von Datum', sortable: true },
        { key: 'l_name', label: 'Gültig bis Datum', sortable: true },
        'Action',
      ],
      servicesFields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'Service Object ID', sortable: true },
        { key: 'fuame', label: 'Service Object name ', sortable: true },
        { key: 'll_name', label: 'Service Object description ', sortable: true },
        { key: 'l_name', label: 'Service Object type', sortable: true },
        'Action',
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
