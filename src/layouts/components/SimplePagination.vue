<template>
  <div
    class="d-flex justify-content-between flex-wrap align-items-center"
    style="padding: 10px"
  >
    <span class="mr-1">
      {{
        $t('headline~general~subframe~pagination').replace('x', ((currentPage || 1) - 1) * (perPage || - 1) + 1).replace('y', Math.min((perPage * currentPage) || 0, totalRows || 0)).replace('z', totalRows || 0)
      }}
    </span>
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
</template>

<script>
import {
  BPagination,
} from 'bootstrap-vue'

export default {
  name: 'TablePagination',
  components: {
    BPagination,
  },
  props: {
    onNewElement: Function,
    onDeleteElements: Function,
    withFilter: Boolean,
    perPage: Number,
    currentPage: Number,
    search: String,
    totalRows: Number,
    entity: String,
    actions: Array,
    filterBadge: Number,
    inlineFilter: Boolean, // Indique s'il s'agit d'un filtre en ligne, afin de masquer l'icône de filtre
  },
  data() {
    return { internalSearch: this.search }
  },
  computed: {
    canDelete() {
      return this.$can('delete', this.entity)
    },
    canCreate() {
      return this.$can('create', this.entity)
    },
  },
  watch: {
    perPage() {
      this.$emit('update:perPage', this.perPage)
    },
    currentPage() {
      this.$emit('update:currentPage', this.currentPage)
    },
  },
}
</script>

<style>
.page-link {
  border-radius: 5px !important;
  background-color: var(--white);
}

.page-item.disabled .page-link {
  background-color: transparent;
}

.page-item.prev-item ~ .page-item .page-link,
.page-item.active .page-link,
.page-item.prev-item ~ .page-item:nth-child(2) .page-link  {
  border-radius: 5px !important;
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;
}

.page-item.prev-item ~ .page-item:nth-last-child(2) .page-link {
  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}

.page-item:not(:nth-last-child(2)) {
  margin-right: 5px;
}
</style>
