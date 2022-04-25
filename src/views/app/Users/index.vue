<template>
  <div>
      <div class="header">
        <div class="first-bloc">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">Per page</label>
            <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="sm"
                :options="pageOptions"
                class="w-50"
            />
          </b-form-group>
          <b-form-group
            label="Trier"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-select
                id="sortBySelect"
                v-model="sortBy"
                :options="sortOptions"
                class="w-75"
            >
              <template v-slot:first>
                <option value="">
                  -- none --
                </option>
              </template>
            </b-form-select>
            <b-form-select
                v-model="sortDesc"
                size="sm"
                :disabled="!sortBy"
                class="w-25"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
        </div>
        <div>
          <b-button size="sm" variant="info" class="mr-1">
            <feather-icon
                class="cursor-pointer"
                icon="PlusIcon"
            />
            new </b-button>
          <b-button size="sm" variant="secondary" class="mr-1"><feather-icon
              class="cursor-pointer"
              icon="EditIcon"
          />Edit</b-button>
          <b-button size="sm" variant="primary"><feather-icon
              class="cursor-pointer"
              icon="Trash2Icon"
          />Delete</b-button>
        </div>
      </div>
    <Databases :items="items" :fields="fields" ref="datatable" :displayOption="true" :actions="true" />
  </div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BButton,
  BPagination,
  BFormGroup,
  BInputGroup,
  BFormSelect,
} from 'bootstrap-vue'

export default {
  components: {
    Databases,
    BCard,
    BButton,
    BPagination,
    BFormGroup,
    BInputGroup,
    BFormSelect,
  },
  data() {
    return {
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
        { key: 'full_name', label: 'Last Name', sortable: true },
        { key: 'first_name', label: 'First Name', sortable: true },
        { key: 'email', label: 'eMail', sortable: true },
        { key: 'last_login', label: 'Last login', sortable: true },
        { key: 'user_type', label: 'User type', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        '...',
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

  },
  methods: {
  },
}
</script>

<style scoped>
.header{
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
.first-bloc img {
  margin-right: 4px;
}
</style>
