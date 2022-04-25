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
            <template #cell(Action)="data" v-if="actions">
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
              class="my-0"
              first-number
              last-number
              prev-class="prev-item"
              next-class="next-item"
          />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BLink, BTable, BBadge, BRow, BCol, BPagination,
} from 'bootstrap-vue'

export default {
  props: ['actions', 'items', 'fields'],
  components: {
    BTable,
    BBadge,
    BRow,
    BCol,
    BPagination,
    BCard,
    BLink,
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
