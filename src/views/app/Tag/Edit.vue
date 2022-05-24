<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex">
          <img src="@/assets/images/icons/team.svg" alt="" class="mr-1">
          <span>{{ $t('app.content.create_new_tag') }}</span>
        </div> 
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-if="view" v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.content.create_new_tag') }}</b-button>
            <b-button v-if="!view" size="sm" variant="info" class="mr-1 d-flex">
              {{ $t('app.btn.save') }}
            </b-button>
            <b-button v-if="view" @click="changeMode()" size="sm" variant="warning" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              {{ $t('app.btn.edit') }}
            </b-button>
            <b-button v-if="!view" @click="changeMode()"  size="sm" class="d-flex" variant="primary">
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
          <b-col cols="12" md="6">
           <b-row>
             <b-col cols="12" >
              <b-form-group :label="$t('app.form.label.id')" label-for="id">
                <b-form-input :disabled="view" id="id"/>
              </b-form-group>
              </b-col>
              <b-col cols="12" >
                <b-form-group :label="$t('app.form.label.name')" label-for="name">
                  <b-form-input :disabled="view" id="name"  type="text"/>
                </b-form-group>
              </b-col>
           </b-row>
          </b-col>
          <b-col cols="12" md="6">
          <b-form-group :label="$t('app.form.label.description')" label-for="description">
            <b-form-textarea :disabled="view" size="lg" id="description" :placeholder="$t('app.form.placeholder.default')" v-model="user.name"/>
          </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-card>
      <b-tabs pills>
        <b-tab :title="$t('app.tab.pos')" active>
          <databases :actions="true" modal="modal-primary" :items="rowsCompany" :fields="columnFields" />
        </b-tab>
        <template #tabs-end>
          <div class="first-bloc ml-auto d-flex align-items-center">
            <b-button v-b-modal.modal-primary class="mr-1" size="sm" variant="info">{{$t('app.btn.new')}}</b-button>
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
        :ok-title="ok || $t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        :ok-only="view"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_new_tag')"
        size="lg"
        @hide="quitViewMode()" 
    >
      <b-form @submit.prevent>
        <b-row>
        <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.id') "
                label-for="id"
                label-cols-md="4"
            >
              <b-form-input
                  id="name_area_ext"
                  type="text"
                  readonly
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.name') "
                label-for="name"
                label-cols-md="4"
            >
              <b-form-input
                  id="name"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.description') "
                label-for="description"
                label-cols-md="4"
            >
              <b-form-textarea
                id="description"
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
  BFormTextarea,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal, BFormDatepicker, 
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
    BFormDatepicker,
    BFormTextarea
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      view: true,
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
      columnFields: [
        { key: 'id', label: 'Id' },
        { key: 'full_name', label: 'PoS Branch Nr ', sortable: true },
        { key: 'fuame', label: 'PoS Name ', sortable: true },
        { key: 'll_name', label: 'Company', sortable: true },
        { key: 'l_name', label: '# of areas', sortable: true },
        'Action',
      ],
    }
  },
  methods: {
    changeMode() {
      this.view = !this.view
    }
  }
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
