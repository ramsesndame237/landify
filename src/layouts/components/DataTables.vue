<template>
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
    <template #cell(Action)="data">
      <b-badge v-if="modal" variant="info" class=" mr-1 mb-1" @click="$bvModal.show(modal)">
        <img src="@/assets/images/pages/plusIcons.svg" alt="">
        <span> &nbsp;
          {{ $t('app.btn.new') }}
        </span>
      </b-badge>
      <b-link :to="{name: link, params: {id: data.item.id}}">
        <b-badge
          class="mr-1"
          variant="secondary"
        >
          <img
            src="@/assets/images/pages/editIcons.svg"
            alt=""
          >
          <span>{{ $t('app.btn.edit') }}</span>
        <b-badge class="mr-1 mb-1" variant="secondary">
          <img src="@/assets/images/pages/editIcons.svg" alt="">
          <span> &nbsp;{{ $t('app.btn.edit') }}</span>
        </b-badge>
      </b-link>
      <b-badge
        variant="primary"
        @click="deleteUser(data.item.id)"
      >
        <img
          src="@/assets/images/pages/deleteIcons.svg"
          alt=""
        >
        <span>
          {{ $t('app.btn.delete') }}
        </span>
      <b-badge variant="primary">
        <img src="@/assets/images/pages/deleteIcons.svg" alt="">
          <span> &nbsp;{{ $t('app.btn.delete') }}</span>
      </b-badge>
    </template>

    <template #cell(id)>
      <b-form-checkbox />
    </template>
  </b-table>
</template>

<script>
import {
  BCard, BLink, BTable, BBadge, BRow, BCol, BFormCheckbox,
  BButton,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  props: ['items', 'fields', 'perPage', 'pageOptions', 'currentPage', 'link', 'filter', 'modal'],
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
  data () {
    return {
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
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
    ...mapActions('MockApi', ['deleteUser']),
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
