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
      <Databases :filter="filter" link="salutation-edit" :currentPage="currentPage" :pageOptions="pageOptions" :perPage="perPage" :items="items" :fields="fields" ref="datatable" />
    </b-card>

    <!--modal-->
    <b-modal
        id="modal-primary"
        :ok-title="$t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_new_salutation')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row> 
          <b-col cols="12" md="10">
            <b-form-group
              :label="`${$t('app.form.label.id')}`"
              label-for="group-id"
              label-cols-md="3"
            >
            <b-form-input
              id="group-id"
              :placeholder="$t('app.form.placeholder.automatic')"
                
              v-model="newCompany.customerGroupId"
           />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="10">
            <b-form-group
              :label="$t('app.form.label.salutation')"
              label-for="salutation"
              label-cols-md="3"
            >
            <b-form-input
              id="salutation"
              v-model="newCompany.customerGroupId"
              :placeholder="$t('app.form.placeholder.default')"
            />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="10">
            <b-form-group
              :label="$t('app.form.label.salutation_text')"
              label-for="salutation_text"
              label-cols-md="3"
            >
            <b-form-textarea
              id="salutation_text"
              v-model="newCompany.customerGroupId"
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
  BFormDatepicker,
  BFormTextarea
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
    BFormDatepicker,
    BFormTextarea
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
        { key: 'group', label: "Salutation", sortable: true },
        { key: 'last_name', label: "Salutation Text", sortable: true },
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
