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
              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.right.id') "
                  label-for="id"
                >
                  <b-form-input
                    id="id"
                    :disabled="view"
                    type="text"
                    readonly
                    :placeholder="$t('app.form.placeholder.index.id')"
                  />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group
                  :label=" $t('app.form.label.right.name') "
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    :disabled="view"
                    type="text"
                    :placeholder="$t('app.form.placeholder.right.name')"
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
                  :label=" $t('app.form.label.right.description') "
                  label-for="desc"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="text"
                    :disabled="view"
                    :placeholder="$t('app.form.placeholder.right.description')"
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
              {{ $t('app.btn.new') }} </b-button>
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

      rowsContract: [
        { key: 'id', label: 'Contract Id' },
        { key: 'group_name', label: 'Contract Name', sortable: true },
        { key: 'group_id', label: 'Special right description', sortable: false },
        { key: 'group_fname', label: 'Special right date', sortable: true },
        { key: 'grouphf_name', label: 'is availed', sortable: true },
        { key: 'grohupf_name', label: 'is passive', sortable: true },
        { key: 'grouphf_nhame', label: 'prior notice date', sortable: true },
        { key: 'groufp_na me', label: 'termination date', sortable: true },
        'Action',
      ],
    }
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
