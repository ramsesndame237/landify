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
              <!-- <b-button v-b-modal.modal-primary size="sm" variant="primary" class="mr-1 d-flex">
                <img src="@/assets/images/icons/sort.svg" alt="">
              </b-button> -->
              <!-- <b-button v-b-modal.modal-primary size="sm" variant="success" class="mr-1 d-flex">
                <img src="@/assets/images/pages/editIcons.svg" alt="">
                {{ $t('app.btn.view') }} 
              </b-button> -->
              <b-button v-b-modal.modal-primary size="sm" variant="info" class="mr-1 d-flex">
                <img src="@/assets/images/pages/plusIcons.svg" alt="">
                {{ $t('app.btn.new') }} 
              </b-button>
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
      <Databases :filter="filter" link="cost-type-edit" :currentPage="currentPage" :pageOptions="pageOptions" :perPage="perPage" :items="items" :fields="fields" ref="datatable" />
    </b-card>

    <!--modal-->
    <b-modal
        id="modal-primary"
        :ok-title="ok || $t('app.btn.save')"
        :cancel-title="$t('app.btn.cancel')"
        :ok-only="view"
        modal-class="modal-primary"
        centered
        :title="$t('app.content.create_new_invoice_criteria_type')"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
        <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.id') "
                label-for="id"
                label-cols-md="4"
            >
              <b-form-input
                  id="name_area_ext"
                  type="text"
                  readonly
                  :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.name') "
                label-for="name"
                label-cols-md="4"
            >
              <b-form-select
                  id="name"
                  type="text"
                  :placeholder="$t('app.form.placeholder.default')"
                  :disabled="view"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                :label=" $t('app.form.label.description') "
                label-for="description"
                label-cols-md="4"
            >
              <b-form-textarea
                id="description"
                :disabled="view"
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
      items: ['', '', ''],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'costtype_ID ', label: 'Id' },
        { key: 'group_id', label: 'Type', sortable: true },
        { key: 'group_name', label: 'Description', sortable: true },
        { key: 'invoice_id', label: '# of Invoice_id **', sortable: true },
        'Action',
      ],
      selected: null,
      filter: null,
      navOptions: [
        { value: null, text: 'Tickets mit Zuordnung' },
      ],
      view: false
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
    openViewModal() {
      this.view = true
      this.ok = 'ok'
    },
    quitViewMode() {
      this.ok = false
      this.view = false
    }
  },
}
</script>

<style scoped>
</style>
