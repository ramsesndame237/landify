<template>
  <fragment>
    <b-button
      id="filters-trigger"
      v-b-toggle.table-side-filters-sidebar-right
      v-b-tooltip.hover
      variant="dark"
      class="p-50 btn-outline"
      title="Filters"
    >
      <feather-icon icon="FilterIcon" size="14" />
    </b-button>
    <b-tooltip target="filters-trigger" triggers="hover">
      Filters
    </b-tooltip>
    <b-sidebar id="table-side-filters-sidebar-right" right shadow>
      <div v-if="extraFilters" class="px-2">
        <div class="mb-2">
          <h2>Filters</h2>
          <small class="text-secondary">
            This is were you can make additional filters to precise data you want to get
          </small>
        </div>
        <div
          v-for="col in extraFilters"
          :key="col.field.key"
          v-bind="col.props || {}"
        >
          <field
            :field="col.field"
            :entity="extraFiltersValues || {}"
          />
          <small
            class="text-secondary d-block"
            style="margin-bottom: 30px;"
          >
            {{ col.helper ? $t(col.helper) : `This is to filter data base on a specific ${$t(col.field.key)}` }}
          </small>
        </div>
      </div>
    </b-sidebar>
  </fragment>
</template>

<script>
import { BSidebar, BTooltip } from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'

export default {
  name: 'TableSideFilters',
  components: {
    BSidebar,
    Field,
    BTooltip,
  },
  props: {
    extraFilters: {
      type: Array,
      required: true,
    },
    extraFiltersValues: {
      type: Object,
      required: true,
    },
  },
}
</script>
