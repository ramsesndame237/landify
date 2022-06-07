<template>
  <div>
    <b-card body-class="p-0">
      <div
        class="d-flex justify-content-between"
        style="padding: 10px"
      >
        <b-form-group class="mb-0">
          <label class="d-inline-block text-sm-left mr-50">{{ $t('app.content.show') }}</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            style="width: 60px"
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
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="info"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/plusIcons.svg"
                alt=""
              >
              {{ $t('app.btn.new') }}
            </b-button>
            <b-button
              size="sm"
              class="d-flex"
              variant="primary"
            >
              <img
                src="@/assets/images/pages/deleteIcons.svg"
                alt=""
              >
              {{ $t('app.btn.delete') }}</b-button>
          </div>
          <div
            size="sm"
            class="d-flex align-items-center"
          >
            <label class="d-inline-block text-sm-left mr-50"> {{ $t('app.search.label') }}</label>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              :placeholder="$t('app.search.palceholder')"
            />
          </div>
        </div>

      </div>
    </b-card>
    <b-card>
      <Databases
        ref="datatable"
        :filter="filter"
        link_view="area-edit"
        :current-page="currentPage"
        :page-options="pageOptions"
        :per-page="perPage"
        :items="items"
        :fields="fields"
      />
    </b-card>

    <!--modal-->
    <b-modal
      id="modal-primary"
      :ok-title="$t('app.btn.save')"
      :cancel-title="$t('app.btn.cancel')"
      modal-class="modal-primary"
      centered
      :title="$t('app.content.create_new_area')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.location_id') "
              label-for="location_id"
              label-cols-md="4"
            >
              <b-form-select
                id="location_id"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.area_id') "
              label-for="area_id"
              label-cols-md="4"
            >
              <b-form-input
                id="area_id"
                type="text"
                :placeholder="$t('app.form.placeholder.automatic')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.name_area') "
              label-for="area_name"
              label-cols-md="4"
            >
              <b-form-input
                id="area_name"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.name_area_ext') "
              label-for="name_area_ext"
              label-cols-md="4"
            >
              <b-form-input
                id="name_area_ext"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.space') "
              label-for="space"
              label-cols-md="4"
            >
              <b-form-input
                id="space"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.area_type') "
              label-for="area_type"
              label-cols-md="4"
            >
              <b-form-select
                id="area_type"
                type="text"
                :placeholder="$t('app.form.placeholder.default')"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.main_usage') "
              label-for="main_usage"
              label-cols-md="4"
            >
              <b-form-select
                id="main_usage"
                type="text"
              />
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

const Databases = () => import('@/layouts/components/DataTables.vue')

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
      items: ['', '', ''],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'group_id', label: 'Area Name', sortable: true },
        { key: 'group_name', label: 'Area ID', sortable: true },
        { key: 'group_fname', label: 'Location Name', sortable: true },
        { key: 'grouphf_name', label: 'City', sortable: true },
        { key: 'grohupf_name', label: 'Country', sortable: true },
        { key: 'grouphf_nhame', label: 'Area Type', sortable: true },
        { key: 'groufp_na me', label: 'Space(qm)', sortable: true },
        { key: 'groufp_na fme', label: 'PoS Name', sortable: true },
        'Action',
      ],
      selected: null,
      filter: null,
      navOptions: [
        { value: null, text: 'Tickets mit Zuordnung' },
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
</style>
