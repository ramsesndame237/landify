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

        <div class="d-flex align-items-center">
          <span class="mr-1">show 1 to {{ perPage }} of {{ totalRows }} entires</span>
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
            <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
              <img src="@/assets/images/pages/plusIcons.svg" alt="">
              new </b-button>
            <b-button size="sm" variant="secondary" class="mr-1 d-flex">
              <img src="@/assets/images/pages/editIcons.svg" alt="">
              Edit</b-button>
            <b-button size="sm" class="d-flex" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              Delete</b-button>
          </div>

          <div size="sm" class="d-flex align-items-center">
            <label class="d-inline-block text-sm-left mr-50">Search</label>
            <b-form-input
                v-model="filter"
                id="filterInput"
                type="search"
                placeholder="rechercher.."
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases :filter="filter" link="contact-person-edit" :currentPage="currentPage" :pageOptions="pageOptions" :perPage="perPage" :items="items" :fields="fields" ref="datatable" />
    </b-card>

    <!--modal-->
    <b-modal
        id="modal-primary"
        ok-title="Save"
        cancel-title="Cancel"
        modal-class="modal-primary"
        centered
        title="Create new Company"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row> 
          <b-col cols="6">
            <b-form-group
              label="CUstomer group ID or Partner group ID"
              label-for="group-id"
              label-cols-md="12"
            >
            <b-form-select
              id="group-id"
                
              v-model="newCompany.customerGroupId"
              :options="customerGroupOptions"
            >
            </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Name Customer group or Name Partner group"
              label-for="group-name"
              label-cols-md="12"
            >
              <b-form-input
                id="group-name"
                  
                v-model="newCompany.companyId"
                placeholder="(automatically based on selected id)"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Contact person ID"
              label-for="Contactperson_ID"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="Contactperson_ID"
                   
                  v-model="newCompany.companyName"
                  placeholder="(automatically)"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Lastname"
              label-for="group-id"
              label-cols-md="12"
            >
            <b-form-input
              id="group-id"
              v-model="newCompany.customerGroupId"
              placeholder="Enter here..."
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Title"
              label-for="group-name"
              label-cols-md="12"
            >
              <b-form-select
                id="group-name"
                v-model="newCompany.companyId"
              >
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Firstname"
              label-for="Firstname"
              label-cols-md="12"
            >
            <b-form-input
              id="Firstname"
              v-model="newCompany.customerGroupId"
              placeholder="Enter here..."
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Salutation"
              label-for="Salutation"
              label-cols-md="12"
            >
              <b-form-select
                id="Salutation"
                v-model="newCompany.companyId"
              >
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Shortname"
              label-for="Shortname"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="Shortname"
                   
                  v-model="newCompany.companyName"
                  placeholder="Enter here"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Function"
              label-for="Function"
              label-cols-md="12"
            >
            <b-form-input
              id="Function"
              v-model="newCompany.customerGroupId"
              placeholder="Enter here..."
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Department"
              label-for="Department"
              label-cols-md="12"
            >
              <b-form-input
                id="Department"
                v-model="newCompany.companyId"
                placeholder="Enter here..."
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
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
        {
          id: 1,
          group: '213',
          company_name: 'Fictive Copany',
          last_name: 'Fictive Group',
          first_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          function: "Something",
          user_id: "1",
        },
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'group', label: 'Customer group/ Partner group', sortable: true },
        { key: 'last_name', label: 'Surname', sortable: true },
        { key: 'first_name', label: 'Firstname', sortable: true },
        { key: 'city', label: 'City', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'mail', label: 'E-mail', sortable: true },
        { key: 'function', label: 'Function', sortable: true },
        { key: 'user_id', label: 'User_id', sortable: true },
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
      filter: null,
      customerGroupOptions: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
      ],
      newCompany: {
        customerGroupId: null,
        companyId: null,
        companyName: null,
        addressId: null,
        contactDetailId: null,
        bankDataId: null,
      }
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
</style>
