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
      <Databases :filter="filter" link="company-edit" :currentPage="currentPage" :pageOptions="pageOptions" :perPage="perPage" :items="items" :fields="fields" ref="datatable" />
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
          <b-col cols="12">
            <b-form-group
              label="Customer group ID"
              label-for="customer-group-id"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-select
                  id="customer-group-id"
                   
                  v-model="newCompany.customerGroupId"
                  :options="customerGroupOptions"
                >
                </b-form-select>
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Company ID"
              label-for="companyId"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="companyId"
                   
                  v-model="newCompany.companyId"
                  placeholder="Company_ID (automatically)"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Company Name"
              label-for="companyName"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="companyName"
                   
                  v-model="newCompany.companyName"
                  placeholder="Company Name..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Address"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="address"
                     
                    v-model="newCompany.companyAddres"
                    :options="customerGroupOptions"
                    placeholder="Company Name..."
                  />
                </b-col>
                <b-button   variant="info" class="-pl-3">
                  new 
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="" id="">
          <b-col cols="12">
            <b-form-group
              label="Company Name"
              label-for="companyName"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="companyName"
                   
                  v-model="newCompany.companyName"
                  placeholder="Street..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Address suffix"
              label-for="address_suffix"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="address_suffix"
                   
                  v-model="newCompany.companyName"
                  placeholder="Street..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Postcode, place"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="2">
                <b-form-input
                  id="postcode"
                   
                  v-model="newCompany.companyName"
                  placeholder="Street..."
                />
              </b-col>
              <b-col cols="4">
               <b-form-input
                  id="addressPlace"
                   
                  v-model="newCompany.companyName"
                  placeholder="Street..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Land"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                  id="land"
                   
                  v-model="newCompany.companyName"
                  placeholder="Land..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          
        </div>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Address"
              label-for="address"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="address"
                     
                    v-model="newCompany.companyAddres"
                    :options="customerGroupOptions"
                    placeholder="Company Name..."
                  />
                </b-col>
                <b-button   variant="info" class="-pl-3">
                  new 
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="" id="">
          <b-col cols="12">
            <b-form-group
              label="Email"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                   
                  placeholder="E-mail..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Phone"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                   
                  placeholder="Phone..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Mobile/cell phone number"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                   
                  placeholder="Type here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Tax"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="5">
                <b-form-select
                   
                  v-model="newCompany.companyAddres"
                  :options="customerGroupOptions"
                />
              </b-col>
              <b-button   variant="info" class="-pl-3">
                new 
              </b-button>
            </b-row>
            </b-form-group>

          </b-col>
        </div>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Company details"
              label-for="companyDetails"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="companyDetails"
                   
                  v-model="newCompany.companyDetails"
                  placeholder="companydetails_ID (select or automatically if new)"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="" id="">
          <b-col cols="12">
            <b-form-group
              label="Tax ID"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                   
                  placeholder="Enter here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="HRA/HRB no."
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
               <b-form-input
                  placeholder="Type here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </div>
        <b-row> 
          <b-col cols="12">
            <b-form-group
              label="Bankdata"
              label-for="bankData"
              label-cols-md="12"
            >
              <b-row>
                <b-col cols="5">
                  <b-form-select
                    id="bankData"
                    :options="customerGroupOptions"
                    placeholder="Type here..."
                  />
                </b-col>
                <b-button   variant="info" class="-pl-3">
                  new 
                </b-button>
              </b-row>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="" id="">
          <b-col cols="12">
            <b-form-group
              label="IBAN account"
              label-for="ibanAccount"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="ibanAccount"
                  v-model="newCompany.companyName"
                  placeholder="Type here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="BIC"
              label-for="bic"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="bic"
                   
                  placeholder="Type here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Bank Name"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  placeholder="Type here..."
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
        </div>
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
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: "Something",
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: "Something",
        },
        {
          id: 1,
          company_id: '213',
          company_name: 'Fictive Copany',
          group_name: 'Fictive Group',
          city: 'Yaoundé',
          phone: '+237 132 645 987',
          mail: 'johndoe@gmail.com',
          contact_partner: "Something",
        },
        
      ],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'company_id', label: 'Company ID', sortable: true },
        { key: 'company_name', label: 'Name Company', sortable: true },
        { key: 'group_name', label: 'Group Name', sortable: true },
        { key: 'city', label: 'City', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'mail', label: 'E-mail', sortable: true },
        { key: 'contact_partner', label: '# Contact partner', sortable: true },
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
