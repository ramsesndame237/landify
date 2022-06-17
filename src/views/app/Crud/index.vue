<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('create-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"
      />
    </b-card>
    <b-card>
      <DataTables ref="table" entity="crud" primary-key-column="crud" :fields="fields" :with-view="false" :with-edit="false" />
    </b-card>
    <!--modal-->
    <b-modal id="modal-primary" :ok-title="$t('app.btn.save')" :cancel-title="$t('app.btn.cancel')"
             modal-class="modal-primary" centered :title="$t('app.content.create_user_type')" size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.user_type_id')" label-for="type-id" label-cols-md="4">
              <b-form-input id="type-id" type="email" :placeholder="$t('app.form.placeholder.default')" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.name')" label-for="type-name" label-cols-md="4">
              <b-form-input id="type-name" :placeholder="$t('app.form.placeholder.default')" type="text" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label="$t('app.form.label.description')" label-for="description" label-cols-md="4">
              <b-form-input id="description" type="text" :placeholder="$t('app.form.placeholder.default')" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import {
  BFormGroup,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
} from 'bootstrap-vue'
import DataTables from '@/layouts/components/DataTables.vue'
import TablePagination from '@/layouts/components/TablePagination.vue'

export default {
  components: {
    TablePagination,
    DataTables,
    BFormGroup,
    BCard,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
  },
  data() {
    return {
      fields: [
        { key: 'crud', label: 'Crud', sortable: true },
      ],
    }
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
