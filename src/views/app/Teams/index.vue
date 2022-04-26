<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex justify-content-between" style="padding: 10px">
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">Show</label>
          <b-form-select style="width: 60px"
                         id="perPageSelect"
                         v-model="perPage"
                         size="sm"
                         :options="pageOptions"
                         class="w-10"
          />
          <label class="d-inline-block text-sm-left ml-50">Entries</label>
        </b-form-group>

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

        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              new </b-button>
            <b-button size="sm" class="d-flex" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              Delete</b-button>
          </div>

          <b-input-group size="sm" class="d-flex align-items-center">
            <label class="d-inline-block text-sm-left mr-50">Search</label>
            <b-form-input
                id="filterInput"
                type="search"
                placeholder="AJAX data source"
            />
          </b-input-group>
        </div>

      </div>
    </b-card>
    <Databases link="teams-edit" :currentPage="currentPage" :pageOptions="pageOptions" :perPage="perPage" :items="items" :fields="fields" ref="datatable" />

    <!--modal-->
    <b-modal
        id="modal-primary"
        ok-title="Save"
        cancel-title="Cancel"
        modal-class="modal-primary"
        centered
        title="CREATE NEW TEAM"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
                label="Team ID:"
                label-for="company-name"
                label-cols-md="4"
            >
              <b-form-input
                  id="team-id"
                  type="text"
                  placeholder="enter here ..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Name Team:"
                label-for="name-team"
                label-cols-md="4"
            >
              <b-form-input
                  id="name-team"
                  type="text"
                  placeholder="enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Team Description"
                label-for="description"
                label-cols-md="4"
            >
              <div class="d-flex">
                <b-form-input
                    class="mr-1"
                    id="description"
                    type="text"
                    placeholder="enter here..."
                />
              </div>

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
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
        {
          id: 1,
          // eslint-disable-next-line global-require
          role_id: 1,
          role_name: 'ADMIN',
          permission: 'ADMIN',
        },
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'role_id', label: 'Team ID', sortable: true },
        { key: 'role_name', label: 'Name Team', sortable: true },
        { key: 'permission', label: 'Team Description', sortable: true },
        'Action',
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
