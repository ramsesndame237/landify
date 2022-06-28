<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('create-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
    </b-card>
    <b-card>
      <DataTables ref="table" entity="tablename" :fields="fields" :with-view="false" :with-edit="false"/>
    </b-card>
    <!--modal-->
    <b-modal id="modal-primary" :ok-title="$t('app.btn.save')" :cancel-title="$t('app.btn.cancel')"
             modal-class="modal-primary" centered :title="$t('app.content.create_user_type')" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.user_type_id')" label-for="type-id" label-cols-md="4">
              <b-form-input id="type-id" type="email" :placeholder="$t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.name')" label-for="type-name" label-cols-md="4">
              <b-form-input id="type-name" :placeholder="$t('app.form.placeholder.default')" type="text"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="4">
              <b-form-input id="description" type="text" :placeholder="$t('app.form.placeholder.default')"/>
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

const Databases = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    DataTables,
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
      fields: [
        { key: 'table_name', label: 'Table Name', sortable: true },
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
