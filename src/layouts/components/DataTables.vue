<template>
  <b-table
    ref="selectableTable"
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
    select-mode="multi"
    selectable
    :filter-included-fields="filterOn"
    @filtered="onFiltered"
    @row-selected="onRowSelected"
  >
    <template #cell(Action)="data">
      <b-badge
        v-if="modal"
        variant="info"
        class=" mr-1 mb-1"
        @click="$bvModal.show(modal)"
      >
        <img
          src="@/assets/images/pages/plusIcons.svg"
          alt=""
        >
        <span> &nbsp;
          {{ $t('app.btn.new') }}
        </span>
      </b-badge>
      <b-link
        v-if="link!==undefined"
        :to="{name: link, params: {id: data.item.id}}"
      >
        <b-badge
          v-if="viewModal"
          variant="success"
          class=" mr-1 mb-1"
          @click="$bvModal.show(viewModal); $emit('openViewModal')"
        >
          <img
            src="@/assets/images/pages/plusIcons.svg"
            alt=""
          >
          <span> &nbsp;
            {{ $t('app.btn.view') }}
          </span>
        </b-badge>
      </b-link>

      <b-badge
        v-if="editModal"
        variant="warning"
        class=" mr-1 mb-1"
        @click="$bvModal.show(editModal); $emit('openEditModal')"
      >
        <img
          src="@/assets/images/pages/plusIcons.svg"
          alt=""
        >
        <span> &nbsp;
          {{ $t('app.btn.edit') }}
        </span>
      </b-badge>
      <b-link
        v-if="link"
        :to="{name: link, params: {id: data.item.id}}"
      >
        <b-badge
          class=" mr-1 mb-1"
          variant="secondary"
        >
          <img
            src="@/assets/images/pages/editIcons.svg"
            alt=""
          >
          <span>{{ $t('app.btn.edit') }}</span>
        </b-badge>
      </b-link>
      <b-link
        v-if="link_view!==undefined"
        :to="{name: link_view, params: {id: data.item.id}}"
      >
        <b-badge
          class=" mr-1 mb-1"
          variant="info"
        >
          <img
            src="@/assets/images/pages/plusIcons.svg"
            alt=""
            style="margin-right: 5px"
          >
          <span>{{ $t('app.btn.view') }}</span>
        </b-badge>
      </b-link>
      <b-badge
        variant="primary"
        @click="deleteButton(data.item.id)"
      >
        <img
          src="@/assets/images/pages/deleteIcons.svg"
          alt=""
        >
        <span>
          {{ $t('app.btn.delete') }}
        </span>
      </b-badge>
    </template>

    <template #cell(id)="{ rowSelected }">
      <b-form-checkbox v-model="rowSelected" />
    </template>
    <template #head(id)>
      <b-form-checkbox
        v-model="select"
        @change="selectAll"
      />
    </template>
  </b-table>
</template>

<script>
import {
  BCard, BLink, BTable, BBadge, BRow, BCol, BFormCheckbox,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BButton,
    BBadge,
    BRow,
    BCol,
    BCard,
    BLink,
    BFormCheckbox,
  },
  props: ['items', 'fields', 'perPage', 'pageOptions', 'currentPage', 'link', 'filter', 'modal', 'viewModal', 'editModal', 'link_view'],
  data() {
    return {
      select: false,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      selected: [],
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
    onRowSelected(items) {
      this.selected = items
      console.log(items)
    },
    selectAll() {
      if (this.select) {
        this.$refs.selectableTable.selectAllRows()
      } else {
        this.$refs.selectableTable.clearSelected()
      }
    },
    deleteButton(id) {
      this.$emit('deleteButton', id)
    },
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
