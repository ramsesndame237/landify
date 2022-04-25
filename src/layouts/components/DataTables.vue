<template>
  <div>

<!--    <b-card>-->
<!--      <b-row>-->
<!--        <b-col md="2" sm="4" class="my-1">-->
<!--          <b-form-group class="mb-0">-->
<!--            <label class="d-inline-block text-sm-left mr-50">Per page</label>-->
<!--            <b-form-select-->
<!--                id="perPageSelect"-->
<!--                v-model="perPage"-->
<!--                size="sm"-->
<!--                :options="pageOptions"-->
<!--                class="w-50"-->
<!--            />-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col md="3" sm="8" class="my-1">-->
<!--          <b-form-group-->
<!--              label="Sort"-->
<!--              label-cols-sm="3"-->
<!--              label-align-sm="right"-->
<!--              label-size="sm"-->
<!--              label-for="sortBySelect"-->
<!--              class="mb-0"-->
<!--          >-->
<!--            <b-input-group size="sm">-->
<!--              <b-form-select-->
<!--                  id="sortBySelect"-->
<!--                  v-model="sortBy"-->
<!--                  :options="sortOptions"-->
<!--                  class="w-75"-->
<!--              >-->
<!--                <template v-slot:first>-->
<!--                  <option value="">-->
<!--                    &#45;&#45; none &#45;&#45;-->
<!--                  </option>-->
<!--                </template>-->
<!--              </b-form-select>-->
<!--              <b-form-select-->
<!--                  v-model="sortDesc"-->
<!--                  size="sm"-->
<!--                  :disabled="!sortBy"-->
<!--                  class="w-25"-->
<!--              >-->
<!--                <option :value="false">-->
<!--                  Asc-->
<!--                </option>-->
<!--                <option :value="true">-->
<!--                  Desc-->
<!--                </option>-->
<!--              </b-form-select>-->
<!--            </b-input-group>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--        <b-col md="3" class="my-1">-->
<!--          <b-button size="sm" v-b-modal.modal-primary class="mr-1" variant="gradient-info">New-->
<!--          </b-button>-->
<!--          <b-button size="sm" class="mr-1" variant="gradient-secondary">Edit-->
<!--          </b-button>-->
<!--          <b-button size="sm" class="mr-1" variant="gradient-primary">Delete-->
<!--          </b-button>-->
<!--        </b-col>-->
<!--        <b-col md="3" class="my-1">-->
<!--          <b-form-group-->
<!--              label-cols-sm="3"-->
<!--              label-align-sm="right"-->
<!--              label-size="sm"-->
<!--              label-for="filterInput"-->
<!--              class="mb-0"-->
<!--          >-->
<!--            <b-input-group size="sm">-->
<!--              <b-form-input-->
<!--                  id="filterInput"-->
<!--                  v-model="filter"-->
<!--                  type="search"-->
<!--                  placeholder="Type to Search"-->
<!--              />-->
<!--            </b-input-group>-->
<!--          </b-form-group>-->
<!--        </b-col>-->
<!--      </b-row>-->
<!--    </b-card>-->

    <b-card>
      <b-row>
        <b-col cols="12">
          <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
          >
            <!--        <template #cell(avatar)="data">-->
            <!--          <b-avatar :src="data.value" />-->
            <!--        </template>-->

            <template #cell(...)="data" v-if="actions">
              <b-badge class="mr-1" variant="secondary">
                <feather-icon
                    class="cursor-pointer"
                    icon="EditIcon"
                /> <b-link :to="{name: 'user-edit', params: { user: data.item }}">Edit</b-link> </b-badge>
              <b-badge variant="primary">
                <feather-icon
                    class="cursor-pointer mr-1"
                    icon="Trash2Icon"
                />Delete</b-badge>
            </template>
          </b-table>
        </b-col>
        <b-col cols="12">
          <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="center"
              size="sm"
              class="my-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
          />
        </b-col>
      </b-row>
    </b-card>
    <!--modal-->
    <b-modal
        id="modal-primary"
        ok-title="Save"
        cancel-title="Cancel"
        modal-class="modal-primary"
        centered
        title="Create new user"
        size="lg"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
                label="Name Company*"
                label-for="company-name"
                label-cols-md="4"
            >
              <b-form-input
                  id="company-name"
                  type="text"
                  placeholder="Please select ..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="eMail"
                label-for="h-email"
                label-cols-md="4"
            >
              <b-form-input
                  id="h-email"
                  type="email"
                  placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Name / First name"
                label-for="h-name"
                label-cols-md="4"
            >
              <div class="d-flex">
                <b-form-input
                    class="mr-1"
                    id="h-name"
                    type="text"
                    placeholder="Enter here..."
                />
                <b-form-input
                    md="4"
                    id="h-firstname"
                    type="text"
                    placeholder="Enter here..."
                />
              </div>

            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Mobile"
                label-for="h-mobile"
                label-cols-md="4"
            >
              <b-form-input
                  id="h-mobile"
                  type="number"
                  placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Fax"
                label-for="h-fax"
                label-cols-md="4"
            >
              <b-form-input
                  id="h-fax"
                  type="text"
                  placeholder="Enter here..."
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Deputy"
                label-for="h-deputy"
                label-cols-md="4">
              <b-form-select
                  v-model="selected"
                  :options="options"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
                label="Type"
                label-for="h-deputy"
                label-cols-md="4">
              <b-form-select
                  v-model="selected"
                  :options="options"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
const partners = () => import('@/views/app/Users/PartnerTab.vue')
import {
  BCard, BTab, BTabs, BForm, BLink, BTable, BBadge, BRow, BCol, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton,
} from 'bootstrap-vue'

export default {
  props: ['actions', 'displayOption', 'items', 'fields'],
  components: {
    BTable,
    BForm,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BCard,
    BLink,
    BTab,
    BTabs,
    partners,
  },
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Simple Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'Please select', disabled: true },
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
    // Set the initial number of items
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
