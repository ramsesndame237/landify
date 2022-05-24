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
              variant="primary"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/icons/sort.svg"
                alt=""
              >
            </b-button>
            <b-button
              v-b-modal.modal-primary
              size="sm"
              variant="success"
              class="mr-1 d-flex"
            >
              <img
                src="@/assets/images/pages/editIcons.svg"
                alt=""
              >
              {{ $t('app.btn.view') }} </b-button>

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
        link="criteria-view"
        link_view="criteria-view"
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
      :title="$t('app.content.create_new_criteria')"
      size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.criteria.id') "
              label-for="id"
              label-cols-md="4"
            >
              <b-form-input
                id="id"
                type="text"
                readonly
                :placeholder="$t('app.form.placeholder.service.id')"
              />

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.criteria.name') "
              label-for="name"
              label-cols-md="4"
            >
              <b-form-input
                id="name"
                type="text"
                :placeholder="$t('app.form.placeholder.criteria.name')"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.criteria.description') "
              label-for="desc"
              label-cols-md="4"
            >
              <b-form-input
                id="desc"
                type="text"
                :placeholder="$t('app.form.placeholder.criteria.description')"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.criteria.has') "
              label-for="object"
              label-cols-md="4"
            >
              <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group
              :label=" $t('app.form.label.criteria.type') "
              label-for="contract"
              label-cols-md="4"
            >
              <b-form-select
                id="contract"
                size="sm"
                :options="typeOptions"
                class="w-10 mr-3"
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
  BFormCheckbox,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
  BPagination,
  BInputGroup, BFormDatepicker,
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
    BFormCheckbox,
    BModal,
    BForm,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BFormDatepicker,
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
        { key: 'id', label: 'Criteria ID' },
        { key: 'group_id', label: 'Criteria name', sortable: false },
        { key: 'group_name', label: 'Criteria type', sortable: true },
        { key: 'group_fname', label: 'has value', sortable: true },
        { key: 'grouphf_name', label: '# of contracts', sortable: true },
        'Action',
      ],
      selected: null,
      filter: null,
      status: null,
      typeOptions: [
        { value: null, text: 'Please select the Contract Service' },
        { value: 'type1', text: 'Type 1' },
        { value: 'type2', text: 'Type 2' },
        { value: 'type3', text: 'Type 3' },
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
