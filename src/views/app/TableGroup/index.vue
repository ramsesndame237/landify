<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('create-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
    </b-card>
    <b-card>
      <DataTables ref="table" entity="tablegroup" :fields="fields"/>
    </b-card>
    <!--modal-->
    <b-modal id="create-modal" :ok-title="$t('app.btn.save')" :cancel-title="$t('app.btn.cancel')"
             modal-class="modal-primary" centered :title="$t('app.content.create_user')" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.company_name')" label-for="company-name" label-cols-md="4">
              <b-form-input id="company-name" type="text" :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.email')" label-for="h-email" label-cols-md="4">
              <b-form-input id="h-email" type="email" :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="`${$t('app.form.label.name')} / ${$t('app.form.label.firstname')}`" label-for="h-name"
                          label-cols-md="4">
              <div class="d-flex">
                <b-form-input id="h-name" class="mr-1" type="text" :placeholder="$t('app.form.placeholder.default')"/>
                <b-form-input id="h-firstname" md="4" type="text" :placeholder="$t('app.form.placeholder.default')"/>
              </div>

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.mobile')" label-for="h-mobile" label-cols-md="4">
              <b-form-input id="h-mobile" type="number" :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.fax')" label-for="h-fax" label-cols-md="4">
              <b-form-input id="h-fax" type="text" :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.deputy')" label-for="h-deputy" label-cols-md="4">
              <b-form-select v-model="selected" :options="options"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.type')" label-for="h-deputy" label-cols-md="4">
              <b-form-select v-model="selected" :options="options"/>
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
import DataTables from "@/layouts/components/DataTables";


export default {
  components: {
    DataTables,
    TablePagination,
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
      fields: [
        { key: 'tablegroup_id', label: 'ID', sortable: true },
        { key: 'tablegroup_name', label: 'Name', sortable: true },
        { key: 'tablegroup_description', label: 'Description', sortable: true },
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
