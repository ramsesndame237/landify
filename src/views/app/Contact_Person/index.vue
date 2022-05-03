<template>
  <div>
    <b-card body-class="p-0">
        <div class="d-flex justify-content-between" style="padding: 10px">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">{{ $t('app.content.show') }}</label>
            <b-form-select style="width: 60px"
                id="perPageSelect"
                v-model="perPage"
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
              <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
                <img src="@/assets/images/pages/plusIcons.svg" alt="">
                {{ $t('app.btn.new') }} </b-button>
              <b-button size="sm" variant="secondary" class="mr-1 d-flex">
                <img src="@/assets/images/pages/editIcons.svg" alt="">
                {{ $t('app.btn.edit') }}</b-button>
              <b-button size="sm" class="d-flex" variant="primary">
                <img src="@/assets/images/pages/deleteIcons.svg" alt="">
                {{ $t('app.btn.delete') }}</b-button>
            </div>

            <div size="sm" class="d-flex align-items-center">
              <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
              <b-form-input
                  v-model="filter"
                  id="filterInput"
                  type="search"
                  :placeholder="$t('app.search.palceholder')"
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
        :ok-title="$t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_contact_person')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row> 
          <b-col cols="6">
            <b-form-group
              :label="`${$t('app.form.label.partner_group_id')} / ${$t('app.form.label.customer_group_id')}`"
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
              :label="`${$t('app.form.label.partner_group_name')} / ${$t('app.form.label.customer_group_name')}`"
              label-for="group-name"
              label-cols-md="12"
            >
              <b-form-input
                id="group-name"
                  
                v-model="newCompany.companyId"
                :placeholder="$t('app.form.placeholder.automatic_based_on_id')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label="$t('app.form.label.contact_person_id')"
              label-for="Contactperson_ID"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="Contactperson_ID"
                   
                  v-model="newCompany.companyName"
                  :placeholder="$t('app.form.placeholder.automatic')"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.last_name')"
              label-for="group-id"
              label-cols-md="12"
            >
            <b-form-input
              id="group-id"
              v-model="newCompany.customerGroupId"
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.title')"
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
              :label="$t('app.form.label.firstname')"
              label-for="Firstname"
              label-cols-md="12"
            >
            <b-form-input
              id="Firstname"
              v-model="newCompany.customerGroupId"
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.salutation')"
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
              :label="$t('app.form.label.shortname')"
              label-for="Shortname"
              label-cols-md="12"
            >
            <b-row>
              <b-col cols="6">
                <b-form-input
                  id="Shortname"
                   
                  v-model="newCompany.companyName"
                  :placeholder="$t('app.form.placeholder.default')"
                />
              </b-col>
            </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.function')"
              label-for="Function"
              label-cols-md="12"
            >
            <b-form-input
              id="Function"
              v-model="newCompany.customerGroupId"
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="$t('app.form.label.department')"
              label-for="Department"
              label-cols-md="12"
            >
              <b-form-input
                id="Department"
                v-model="newCompany.companyId"
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
        { key: 'group', label: `${this.$t('app.form.label.partner_group')} / ${this.$t('app.form.label.customer_group')}`, sortable: true },
        { key: 'last_name', label: this.$t('app.form.label.surname'), sortable: true },
        { key: 'first_name', label: this.$t('app.form.label.firstname'), sortable: true },
        { key: 'city', label: this.$t('app.form.label.city'), sortable: true },
        { key: 'phone', label: this.$t('app.form.label.phone'), sortable: true },
        { key: 'mail', label: this.$t('app.form.label.email'), sortable: true },
        { key: 'function', label: this.$t('app.form.label.function'), sortable: true },
        { key: 'user_id', label: this.$t('app.form.label.user_id'), sortable: true },
        'Action',
      ],
      selected: null,
      options: [
        { value: null, text: this.$t('app.form.placeholder.select') },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
      ],
      filter: null,
      customerGroupOptions: [
        { value: null, text: this.$t('app.form.placeholder.select') },
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
