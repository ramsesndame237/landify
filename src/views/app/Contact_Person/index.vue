<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('create-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
    </b-card>
    <b-card>
      <Databases ref="table" link="contactperson-edit" entity="contactperson" :default-sort-field="defaultSortField" :fields="fields"
                 :primary-key="primaryKey"
                 :on-view-element="(user)=> $router.push({name: 'contactperson-edit', params: {id: user.user_id, user}})"
                 :on-edit-element="(user)=> $router.push({name: 'contactperson-edit', params: {id: user.user_id, user}, query: {edit: 'true'}})"/>
    </b-card>
    <!--modal-->
    <b-modal id="create-modal" :ok-title="$t('app.btn.save')" :cancel-title="$t('app.btn.cancel')"
             modal-class="modal-primary" centered :title="$t('app.content.create_contact_person')" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="6">
            <b-form-group
              :label="`${$t('app.form.label.partner_group_id')} / ${$t('app.form.label.customer_group_id')}`"
              label-for="group-id" label-cols-md="12">
              <b-form-select id="group-id" v-model="newCompany.customerGroupId" :options="customerGroupOptions"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :label="`${$t('app.form.label.partner_group_name')} / ${$t('app.form.label.customer_group_name')}`"
              label-for="group-name" label-cols-md="12">
              <b-form-input id="group-name"

                            v-model="newCompany.companyId"
                            :placeholder="$t('app.form.placeholder.automatic_based_on_id')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.contact_person_id')" label-for="Contactperson_ID"
                          label-cols-md="12">
              <b-row>
                <b-col cols="6">
                  <b-form-select id="Contactperson_ID"

                                 v-model="newCompany.companyName" :placeholder="$t('app.form.placeholder.automatic')"/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.last_name')" label-for="group-id" label-cols-md="12">
              <b-form-input id="group-id" v-model="newCompany.customerGroupId"
                            :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.title')" label-for="group-name" label-cols-md="12">
              <b-form-select id="group-name" v-model="newCompany.companyId"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.firstname')" label-for="Firstname" label-cols-md="12">
              <b-form-input id="Firstname" v-model="newCompany.customerGroupId"
                            :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.salutation')" label-for="Salutation" label-cols-md="12">
              <b-form-select id="Salutation" v-model="newCompany.companyId"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.shortname')" label-for="Shortname" label-cols-md="12">
              <b-row>
                <b-col cols="6">
                  <b-form-input id="Shortname"

                                v-model="newCompany.companyName" :placeholder="$t('app.form.placeholder.default')"/>
                </b-col>
              </b-row>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.function')" label-for="Function" label-cols-md="12">
              <b-form-select id="Function" v-model="newCompany.customerGroupId"
                             :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group :label="$t('app.form.label.department')" label-for="Department" label-cols-md="12">
              <b-form-select id="Department" v-model="newCompany.companyId"
                             :placeholder="$t('app.form.placeholder.default')"/>
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
import TablePagination from "@/layouts/components/TablePagination";

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    TablePagination,
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
      defaultSortField: 'contactperson_id',
      primaryKey: 'contactperson_id',
      fields: [
        { key: '__selected' },
        { key: 'contactperson_id', label: 'Id' },
        {
          key: 'group',
          label: `${this.$t('app.form.label.partner_group')} / ${this.$t('app.form.label.customer_group')}`,
          sortable: true,
        },
        { key: 'contactperson_firstname', label: this.$t('app.form.label.firstname'), sortable: true },
        { key: 'contactperson_lastname', label: 'Last name', sortable: true },
        { key: 'city_name', label: this.$t('app.form.label.city'), sortable: true },
        { key: 'contactdetails_phone', label: this.$t('app.form.label.phone'), sortable: true },
        { key: 'contactdetails_mail', label: this.$t('app.form.label.email'), sortable: true },
        { key: 'contactperson_function', label: this.$t('app.form.label.function'), sortable: true },
        { key: 'user_id', label: this.$t('app.form.label.user_id'), sortable: true },
        'Actions',
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
      },
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

<style scoped></style>
