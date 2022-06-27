<template>
  <div :key="table">
    <b-card body-class="p-0">
      <table-pagination :on-new-element="()=> $bvModal.show('generic-modal')"
                        :on-delete-elements="()=> $refs.table.deleteSelected()"/>
    </b-card>
    <b-card>
      <Datatable ref="table" link="table-user-edit" :entity="table" :default-sort-field="definition.defaultSortField"
                 :fields="definition.fields" :primary-key-column="definition.primaryKey"/>
    </b-card>
    <generic-modal :table="table" :title="'create '+table" ref="modal"/>
  </div>
</template>

<script>

import {
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
} from 'bootstrap-vue'
import TablePagination from '@/layouts/components/TablePagination.vue'
import GenericModal from '@/views/app/Generic/modal';
import Tables from '../../../table'

const Datatable = () => import('@/layouts/components/DataTables.vue')

export default {
  components: {
    GenericModal,
    TablePagination,
    Datatable,
    BFormGroup,
    BCard,
    BFormSelect,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
  },
  data() {
    return {}
  },
  computed: {
    table() {
      return this.$route.params.table
    },
    definition() {
      return Tables[this.table]
    },
  },
  methods: {},
  beforeRouteEnter(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    next()
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.pageTitle = `List of ${to.params.table}`
    next()
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
