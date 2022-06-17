<template>
  <div>
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('create-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
    </b-card>
    <b-card>
      <DataTables ref="table" entity="team" :fields="fields"/>
    </b-card>

    <!--modal-->
    <b-modal id="modal-primary" :ok-title="$t('app.btn.save')" :cancel-title="$t('app.btn.cancel')"
             modal-class="modal-primary" centered :title="$t('app.content.create_team')" size="lg">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group :label=" $t('app.form.label.team_id')" label-for="team-id" label-cols-md="4">
              <b-form-input id="team-id" type="text" :label=" $t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label=" $t('app.form.label.name')" label-for="name-team" label-cols-md="4">
              <b-form-input id="name-team" type="text" :label=" $t('app.form.placeholder.default')"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group :label=" $t('app.form.label.description')" label-for="description" label-cols-md="4">
              <div class="d-flex">
                <b-form-input id="description" class="mr-1" type="text" :label=" $t('app.form.placeholder.default')"/>
              </div>

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
import TablePagination from "@/layouts/components/TablePagination";
import DataTables from "@/layouts/components/DataTables";


export default {
  components: {
    DataTables,
    TablePagination,
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
        { key: 'team_id', label: this.$t('app.form.label.team_id'), sortable: true },
        { key: 'team_name', label: this.$t('app.form.label.name'), sortable: true },
        { key: 'team_description', label: this.$t('app.form.label.description'), sortable: true },
      ],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {},
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
