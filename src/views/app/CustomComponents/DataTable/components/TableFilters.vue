<template>
  <b-overlay
    class="rounded-sm z-100"
    :show="tableStore.pagination.isLoading"
  >
    <div class="d-flex align-items-center">
      <div
        v-for="(tab, index) in tableStore.tabs.list"
        :key="`data-table-tab-${index}`"
        class="d-flex justify-content-center align-items-center px-2 py-50"
        :class="{'font-weight-bold': tableStore.tabs.activeTabIndex === index}"
        :style="`border-bottom: 4px solid ${tableStore.tabs.activeTabIndex === index ? 'var(--primary)' : 'transparent'};`"
        role="button"
        @click="tableStore.tabs.activeTabIndex = index; tableStore.tabs.value = tab.value"
      >
        <span class="block mr-50">
          {{ tab.name }}
        </span>
        <b-badge v-if="!!tab.badgeText" variant="danger" style="padding: 3px 6px;">
          {{ tab.badgeText }}
        </b-badge>
      </div>
    </div>
    <b-card class="custom-card-body-padding">
      <div
        class="d-flex align-items-center justify-content-between w-100 flex-wrap"
        style="row-gap: 8px;"
      >
        <b-form-group
          class="mb-0 d-flex align-items-center pr-50"
          style="flex-shrink: 0;"
        >
          <label
            v-if="!hideEntriesText"
            class="d-inline-block text-sm-left mr-50"
          >
            {{ $t('headline~general~subframe~show') }} {{ $t('headline~general~subframe~entries') }}
          </label>
          <b-form-select
            id="perPageSelect"
            v-model="tableStore.pagination.size"
            style="width: 60px"
            :options="pageOptions"
            class="w-8 h-100"
          />
        </b-form-group>
        <div class="flex-shrink-0" style="min-width: 200px;">
          <search-input :value.sync="tableStore.pagination.search"/>
        </div>
        <div class="flex-grow-1 flex-shrink-0 ml-1">
          <transition name="fade">
            <b-button
              v-if="tableStore.rows.selected.length > 0"
              id="table-filters-delete-btn"
              v-b-tooltip.hover
              v-b-toggle.table-filters-delete-btn
              variant="danger"
              class="p-50 btn-outline"
              title="Delete"
              @click="showDeleteConfirm"
            >
              <feather-icon icon="Trash2Icon" size="14"/>
            </b-button>
          </transition>
          <b-tooltip target="table-filters-delete-btn" triggers="hover">
            Delete selected items
          </b-tooltip>
        </div>
        <div
          class="d-flex align-items-center justify-content-end"
          style="column-gap: 0px; flex-wrap: wrap; row-gap: 10px;"
        >
          <button
            id="refresh-btn"
            class="btn p-0"
            @click="refresh"
          >
            <img
              :src="refreshIcon"
              height="24"
              alt="Refresh"
            >
          </button>
          <b-tooltip target="refresh-btn" triggers="hover">
            Refresh data
          </b-tooltip>
          <div class="ml-1">
            <b-dropdown
              id="dropdown-text"
              variant="dark"
              class="settings-dropdown btn-outline"
              no-caret
              dropleft
            >
              <template #button-content>
                <div class="position-relative">
                  <feather-icon icon="SlidersIcon" size="14"/>
                  <b-badge v-if="tableStore.columns.hided.length" variant="danger" class="position-absolute"
                           style="padding: 3px 6px; top: -14px; right: -15px;">
                    {{ tableStore.columns.hided.length }}
                    <span class="sr-only">hided columns</span>
                  </b-badge>
                </div>
              </template>
              <b-dropdown-text class="p-0" style="width: 240px;">
                Show/hide columns
              </b-dropdown-text>
              <b-dropdown-divider/>
              <b-dropdown-item
                v-for="col in tableStore.columns.list"
                :key="col.key || col.id"
                @click="toggleColumn(col.key || col.id)"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-truncate block"
                        style="max-width: 180px">{{ (col.header && col.header.name) || col.key || col.id }}</span>
                  <feather-icon
                    v-if="!tableStore.columns.hided.includes(col.key || col.id)"
                    size="16"
                    icon="CheckIcon"
                  />
                </div>
              </b-dropdown-item>
            </b-dropdown>
            <b-tooltip target="dropdown-text" triggers="hover">
              Columns
            </b-tooltip>
          </div>
          <div
            v-if="!!filters && filters.length > 0"
            class="ml-1"
          >
            <table-side-filters
              :extra-filters="filters"
              :extra-filters-values="tableStore.pagination.filtersValues"
            />
          </div>
          <b-button
            v-for="(action, index) in (barActions || [])"
            :key="`table-bar-action-${index}-${action.key || ''}-${action.label || ''}`"
            class="p-50 btn-outline mx-50"
            variant="dark"
            @click="action.onClick"
          >
            <div
              class="d-flex align-items-center"
              style="gap: 16px;"
              :title="$tc(action.label)"
            >
              <feather-icon
                v-if="action.icon"
                size="16"
                :icon="action.icon"
              />
              <span v-if="action.label" class="text-truncate block" style="max-width: 180px">{{
                  $tc(action.label)
                }}</span>
            </div>
          </b-button>
          <div
            v-if="actions && actions.length > 0"
            class="ml-1"
          >
            <b-dropdown
              id="more-dropdown"
              variant="light"
              class="settings-dropdown btn-outline"
              no-caret
              dropleft
            >
              <template #button-content>
                <div class="position-relative">
                  <feather-icon icon="MoreVerticalIcon" size="14"/>
                  <b-badge v-if="tableStore.columns.hided.length" variant="danger" class="position-absolute"
                           style="padding: 3px 6px; top: -14px; right: -15px;">
                    {{ tableStore.columns.hided.length }}
                    <span class="sr-only">hided columns</span>
                  </b-badge>
                </div>
              </template>
              <b-dropdown-text class="p-0" style="width: 240px;">
                Additional actions
              </b-dropdown-text>
              <b-dropdown-divider/>
              <b-dropdown-item
                v-for="(action, index) in (actions || [])"
                :key="`table-more-action-${index}-${action.key || ''}-${action.label || ''}`"
                @click="action.onClick"
              >
                <div
                  class="d-flex align-items-center"
                  style="gap: 16px;"
                  :title="$tc(action.label)"
                >
                  <feather-icon
                    v-if="action.icon"
                    size="18"
                    :icon="action.icon"
                  />
                  <span class="text-truncate block" style="max-width: 180px">{{ $tc(action.label) }}</span>
                </div>
              </b-dropdown-item>
            </b-dropdown>
            <b-tooltip target="dropdown-text" triggers="hover">
              Columns
            </b-tooltip>
            <b-tooltip target="more-dropdown" triggers="hover">
              More actions
            </b-tooltip>
          </div>
        </div>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
import refreshIcon from '@/assets/images/icons/refresh.svg'
import {BDropdownDivider, BDropdownText, BTooltip} from 'bootstrap-vue'
import TableSideFilters from './TableSideFilters.vue'
import {handleDelete, toggleColumn, useTableStore} from '../state/data-table-store'
import SearchInput from './SearchInput.vue'

const tableStore = useTableStore()

export default {
  name: 'TableFilters',
  components: {
    TableSideFilters,
    BDropdownDivider,
    BDropdownText,
    BTooltip,
    SearchInput,
  },
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Array,
      default: () => [],
    },
    barActions: {
      type: Array,
      default: () => [],
    },
    refresh: {
      type: Function,
      required: true,
    },
    deleteUrl: {
      type: String,
      default: '',
    },
    hideEntriesText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      refreshIcon,
      tableStore,
      pageOptions: [10, 30, 100],
      extraFiltersValues: {},
    }
  },
  created() {
    tableStore.pagination.search = ''
  },
  watch: {
    perPage(val) {
      this.$emit('update:per-page', val)
    },
    search(val) {
      this.$emit('update:search', val)
    },
  },
  methods: {
    toggleColumn,
    showDeleteConfirm() {
      if (this.deleteUrl) {
        handleDelete({
          swal: this.$swal,
          http: this.$http,
          url: this.deleteUrl,
          isDeleteBulk: true,
        })
      }
    },
  },
}
</script>

<style>
.form-group-padding .form-group {
  margin-bottom: 0 !important;
  min-width: 135px;
}

.custom-card-body-padding {
  margin-bottom: 16px;
}

.custom-card-body-padding .card-body {
  padding: 10px 20px;
}

.settings-dropdown .btn {
  padding: 7px;
}

.table-filters-toolbar {
  display: flex;
}
</style>
