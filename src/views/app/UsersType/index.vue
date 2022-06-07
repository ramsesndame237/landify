<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between"
        style="padding: 10px"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">{{ $t('app.content.show') }}</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            style="width: 60px"
            size="sm"
            :options="pageOptions"
            class="w-10"
          />
          <label class="d-inline-block text-sm-left ml-50">{{ $t('app.content.entries') }}</label>
        </b-form-group>

        <div class="d-flex align-items-center">

          <span class="mr-1">{{ $t('app.content.show') }} 1 {{ $t('app.content.to') }} {{ perPage }} {{ $t('app.content.of') }} {{ totalRows }} {{ $t('app.content.entries') }}</span>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="center"
            class="my-0"
            first-number
            last-number
            prev-class="prev-item"
            next-class="next-item"
          />
        </div>

        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
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
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.delete') }}</b-button>
          </div>

          <div
            size="sm"
            class="d-flex align-items-center"
          >
            <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              :placeholder="$t('app.search.palceholder')"
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link="user-edit"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
      />
    </b-card>

    <!--modal-->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_user_type')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.user_type_id')"
              label-for="type-id"
              label-cols-md="4"
            >
              <b-form-input
                id="type-id"
                type="email"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.name')"
              label-for="type-name"
              label-cols-md="4"
            >
              <b-form-input
                id="type-name"
                :placeholder="$t('app.form.placeholder.default')"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.description')"
              label-for="description"
              label-cols-md="4"
            >
              <b-form-input
                id="description"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import {
  BButton,
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
  BPagination,
  BInputGroup,
} from 'bootstrap-vue'

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    Databases,
    BButton,
    BFormGroup,
    BPagination,
    BCard,
    BFormSelect,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
  },
  data() {
    return {
      filter: null,
      currentPage: 1,
      totalRows: 1,
      perPage: 10,
      pageOptions: [3, 5, 10],
      sortDirection: 'asc',
      sortBy: '',
      sortDesc: false,
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
        {
          id: 6,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 11,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 12,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 13,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 14,
          // eslint-disable-next-line global-require
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
        {
          id: 15,
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
      ],
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
