<template>
  <b-thead class="position-relative" style="z-index: 120;">
    <b-tr>
      <b-th v-if="!noCheckbox" style="max-width: 10px;">
        <b-form-checkbox
          v-model="tableStore.rows.allSelected"
          :indeterminate="tableStore.rows.indeterminate"
          @change="toggleAllSelectedRows(selectRowFn)"
        />
      </b-th>
      <fragment
        v-for="col in columns"
        :key="col.id"
      >
        <b-th
          v-if="!tableStore.columns.hided.includes(col.id)"
          v-bind="col.header && (col.header.props || {})"
          class="table-th"
        >
          <b-dropdown
            class="d-inline-block"
            :disabled="!!(col && col.disabled)"
            size="lg"
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <div
                class="d-flex align-items-center w-100 btn btn-light th-btn"
                style="
                padding: 6px;
                column-gap: 8px;
                max-width: 240px;
                border-right-color: transparent !important;
                border-left-color: transparent !important;"
              >
                <feather-icon
                  v-if="col.header && typeof col.header.icon === 'string'"
                  size="16"
                  :icon="col.header.icon"
                />
                <component
                  :is="col.header.icon"
                  v-else-if="col.header && col.header.icon"
                />
                <span class="text-truncate" :title="$t(col.header ? col.header.name : '')">
                  {{ $t(col.header ? col.header.name : '') }}
                </span>
                <fragment v-if="!(col && col.disabled)">
                  <div v-if="tableStore.pagination.orderField !== col.id" class="d-flex flex-column">
                    <feather-icon size="10" icon="ChevronUpIcon" style="margin-bottom: -2px;" />
                    <feather-icon size="10" icon="ChevronDownIcon" style="margin-top: -2px;" />
                  </div>
                  <feather-icon
                    v-else
                    size="16"
                    icon="ArrowUpIcon"
                    :style="`transform: rotate(${tableStore.pagination.order === 'asc' ? '0deg' : '180deg'}); transition: transform 0.2s ease;`"
                  />
                </fragment>
              </div>
            </template>
            <b-dropdown-item @click="orderByColumn(col.id, 'asc')">
              <feather-icon size="14" icon="ArrowUpIcon" /> Asc
            </b-dropdown-item>
            <b-dropdown-item @click="orderByColumn(col.id, 'desc')">
              <feather-icon size="14" icon="ArrowDownIcon" /> Desc
            </b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item @click="hideColumn(col.id)">
              <feather-icon size="14" icon="EyeOffIcon" /> Hide
            </b-dropdown-item>
          </b-dropdown>
        </b-th>
      </fragment>
    </b-tr>
  </b-thead>
</template>

<script>
import { BDropdownDivider } from 'bootstrap-vue'
import {
  useTableStore,
  hideColumn,
  orderByColumn,
  toggleAllSelectedRows,
} from '../state/data-table-store'

const tableStore = useTableStore()

export default {
  name: 'TableHead',
  components: {
    BDropdownDivider,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    noCheckbox: {
      type: Boolean,
      default: false,
    },
    selectRowFn: {
      type: Function,
      default: row => row?.id,
    },
  },
  data() {
    return { tableStore, isChecked: false, indeterminate: false }
  },
  methods: {
    orderByColumn,
    hideColumn,
    toggleAllSelectedRows,
  },
}
</script>

<style>
.table-th {
  max-width: 250px;
}
.table-th .dropdown-toggle, .table-th .dropdown-menu {
  color: var(--secondary);
  font-size: 12px;
  text-transform: capitalize;
  padding: 0;
}

.table-th .th-btn:not(:hover) {
  background: transparent;
  border-color: transparent !important;
  box-shadow: none;
}
</style>
