<template>
  <div class="data-table">
    <table-filters
      v-if="!hiddeFilterBar"
      :filters="filters"
      :search.sync="search"
      :per-page.sync="perPage"
      :refresh="getData"
      :delete-url="deleteBulkUrl"
      :actions="moreTableActions"
      :bar-actions="barActions"
    >
      <template #customFilter>
        <slot name="customTabFilter"/>
      </template>
    </table-filters>
    <slot
      :tableStore="tableStore"
      :getData="getData"
      name="beforeTableHead"
    />
    <vue-perfect-scrollbar
      class="main-menu-content scroll-area px-50"
      tagname="div"
    >
      <b-skeleton-table
        v-if="tableStore.pagination.isLoading"
        :rows="tableStore.pagination.size || 5"
        :columns="columns.length || 4"
        :table-props="{ bordered: true, striped: true }"
      />
      <b-table-simple
        v-else
        ref="table"
        striped
        hover
        responsive
        class="position-relative"
        style="z-index: 1"
      >
        <table-head
          :columns="columns"
          :no-checkbox="!withCheckbox"
          :select-row-fn="selectRowFn"
        />
        <b-tbody>
          <b-tr
            v-if="!tableStore.rows.list || tableStore.rows.list.length === 0"
          >
            <b-td
              :colspan="(columns || []).length + 1"
              class="py-3 no-data-td"
            >
              <no-data @refresh="getData" />
            </b-td>
          </b-tr>
          <b-tr
            v-for="(row, i) in tableStore.rows.list"
            :key="row.id || selectRowFn(row)"
            :style="`z-index: ${tableStore.rows.list.length - i}`"
            class="table-tr"
            @click="onRowClick && onRowClick(row, tableStore, i)"
          >
            <b-td v-if="withCheckbox">
              <b-form-checkbox
                :checked="tableStore.rows.selected.includes(selectRowFn(row))"
                @change="toggleRowSelection(selectRowFn(row))"
              />
            </b-td>
            <fragment
              v-for="({component: cmp, ...col}, j) in columns"
              :key="`${col.id}-${row.id}`"
            >
              <b-td
                v-if="!tableStore.columns.hided.includes(col.id)"
                v-bind="col.props"
                class="position-relative"
              >
                <div >
                  <b-spinner v-if="j === 0 && row.read === 'NOT_READ'" variant="primary" small type="grow" class="position-absolute" style="left: 5px"/>
                  <div
                    :class="`td-first-div${
                      (buttons.concat(moreActions).length > 0 && !col.hideActions)
                        ? ` shrink-${Math.min(4, buttons.concat(moreActions).length)}`
                        : ''
                    }`"
                    class="flex-shrink-0"
                  >
                    <div>
                      <div v-if="cmp">
                        <component
                          :is="cmp"
                          :col="col"
                          :data="row"
                          :index="j"
                        />
                      </div>
                      <date-col
                        v-else-if="col.type === 'date'"
                        :col="col"
                        :data="row"
                        :index="j"
                      />
                      <status-col
                        v-else-if="col.type === 'status'"
                        :col="col"
                        :data="row"
                        :index="j"
                      />
                      <default-col
                        v-else
                        :col="col"
                        :data="row"
                        :index="j"
                        :bold="col && col.props && col.props.bold"
                      />
                    </div>
                  </div>
                  <div
                    v-if="!col.hideActions"
                    class="d-flex align-items-center position-absolute"
                    style="column-gap: 8px;
                      transform: translateY(-50%);
                      top: 50%;
                      right: 0;
                      max-width: 100%;
                      flex-wrap: wrap;
                    "
                  >
                    <fragment
                      v-for="(btn, btnIdx) in buttons"
                      :key="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
                    >
                      <b-button
                        :id="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
                        :title="$t(btn.label)"
                        class="show-btn"
                        @click.stop="(e) => btn.onClick(row, tableStore, e)"
                      >
                        <feather-icon
                          :icon="btn.icon"
                          size="17"
                        />
                      </b-button>
                      <b-tooltip
                        v-if="btn.label"
                        :target="`data-table-${typeof btn.icon === 'string' ? btn.icon : ''}${btnIdx}${i}${j}`"
                        triggers="hover"
                      >
                        {{ $t(btn.label) }}
                      </b-tooltip>
                    </fragment>
                    <b-dropdown
                      v-if="moreActions.length > 0"
                      :id="`more-${buttons.concat(moreActions).length}${i}${j}`"
                      v-b-tooltip.hover
                      v-b-toggle.[`more-${buttons.concat(moreActions).length}${i}${j}`]
                      class="rounded-circle show-btn flex-shrink-0"
                      no-caret
                      dropleft
                    >
                      <template #button-content>
                        <feather-icon icon="MoreHorizontalIcon" size="14" />
                      </template>

                      <b-dropdown-item
                        v-for="btn in moreActions"
                        :key="btn.key || btn.id"
                        :title="$t(btn.label)"
                        @click.stop="(e) => btn.onClick(row, tableStore, e)"
                      >
                        <div class="d-flex justify-content-between align-items-center">
                          <feather-icon
                            v-if="typeof btn.icon === 'string'"
                            size="16"
                            :icon="btn.icon"
                          />
                          <component :is="btn.icon" v-else />
                          <span
                            v-if="btn.label"
                            class="text-truncate block ml-1"
                            style="max-width: 180px"
                          >
                            {{ $t(btn.label) }}
                          </span>
                        </div>
                      </b-dropdown-item>
                    </b-dropdown>

                    <b-tooltip
                      :target="`more-${buttons.concat(moreActions).length}${i}${j}`"
                      triggers="hover"
                    >
                      {{ $t('more actions') }}
                    </b-tooltip>
                  </div>
                </div>
              </b-td>
            </fragment>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </vue-perfect-scrollbar>
    <div>
      <simple-pagination
        :search.sync="tableStore.pagination.search"
        :per-page.sync="tableStore.pagination.size"
        :current-page.sync="tableStore.pagination.page"
        :entity="table"
        :total-rows="tableStore.pagination.total"
      />
    </div>
    <b-sidebar
      id="data-table-sidebar-details"
      v-model="sidebarVisible"
      aria-controls="data-table-sidebar-details"
      :aria-expanded="sidebarVisible"
      right
      class="bg-white"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <slot
          :tableStore="tableStore"
          :hide="hide"
          :on-close="() => { hide(); tableStore.rows.rowToShow = null}"
          :getData="getData"
          name="drawer"
        />
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSkeletonTable,
  BTableSimple,
  BSidebar,
  BTooltip,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import SimplePagination from '@/layouts/components/SimplePagination'

import TableFilters from './components/TableFilters.vue'
import TableHead from './components/TableHead.vue'
import DefaultCol from './components/columns/DefaultCol.vue'
import DateCol from './components/columns/DateCol.vue'
import {
  useTableStore,
  toggleRowSelection,
  listData,
  handleDelete,
  initDataTable,
} from './state/data-table-store'
import NoData from '../NoData/NoData.vue'
import { toastError } from './utils'
import StatusCol from './components/columns/StatusCol.vue'

const tableStore = useTableStore()

export default {
  name: 'DataTable',
  components: {
    TableHead,
    DefaultCol,
    TableFilters,
    BTableSimple,
    VuePerfectScrollbar,
    SimplePagination,
    BSkeletonTable,
    BSidebar,
    DateCol,
    BTooltip,
    NoData,
    StatusCol,
  },
  props: {
    method: {
      type: String,
      default: 'get',
    },
    url: {
      type: String,
      default: '',
    },
    deleteUrl: {
      type: String,
      default: '',
    },
    deleteBulkUrl: {
      type: String,
      default: '',
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    data: {
      type: Array,
      default: null,
    },
    filters: {
      type: Array,
      default: () => [],
    },
    hiddeFilterBar: {
      type: Boolean,
      default: false,
    },
    withCheckbox: {
      type: Boolean,
      default: false,
    },
    detailsOnSidebar: {
      type: Boolean,
      default: false,
    },
    resolveData: {
      type: Function,
      default: data => data.data || [],
    },
    fetchFn: {
      type: Function,
      default: () => null,
    },
    onDetailsClick: {
      type: Function,
      default: null,
    },
    onUpdateClick: {
      type: Function,
      default: null,
    },
    onDeleteClick: {
      type: Function,
      default: null,
    },
    onRowClick: {
      type: Function,
      default: null,
    },
    defaultHiddenCols: {
      type: Array,
      default: () => [],
    },
    selectRowFn: {
      type: Function,
      default: row => row?.id,
    },
    customActions: {
      type: Array,
      default: () => [],
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    moreTableActions: {
      type: Array,
      default: () => [],
    },
    barActions: {
      type: Array,
      default: () => [],
    },
    includeInQuery: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      search: '',
      loading: false,
      perPage: 10,
      currentPage: 1,
      table: null,
      totalRows: 0,
      tableStore,
      sidebarVisible: false,
      buttons: [],
      moreActions: [],
    }
  },
  watch: {
    'tableStore.rows.rowToShow': function (val) {
      if (tableStore.rows.rowToShow && this.detailsOnSidebar) {
        this.sidebarVisible = !!val
      }
    },
    // includeInQuery() {
    //   if (this.url) this.getData()
    // },
  },
  created() {
    initDataTable()
    tableStore.columns.list = this.columns || []
    tableStore.tabs.list = this.tabs?.items || []
    tableStore.tabs.key = this.tabs?.key || ''
    tableStore.tabs.value = this.tabs?.items?.[0]?.value || ''
    tableStore.pagination.method = this.method
    tableStore.rows.list = []
    tableStore.columns.list = this.columns
    tableStore.columns.hided = this.defaultHiddenCols || []
    tableStore.pagination.lang = this.$i18n.locale
    if (this.data) {
      tableStore.rows.list = this.data
    }
    if (this.onDeleteClick || this.deleteUrl) {
      this.buttons = [
        ...this.buttons,
        {
          icon: 'Trash2Icon',
          label: this.$t('delete'),
          onClick: this.onDeleteClick || (row => {
            if (this.deleteUrl) {
              console.dir(this.$http)
              handleDelete({
                swal: this.$swal,
                http: this.$http,
                url: this.deleteUrl,
                rowId: this.selectRowFn(row),
              })
            }
          }),
        },
      ]
    }
    if (this.onUpdateClick) {
      this.buttons = [
        ...this.buttons,
        {
          icon: 'Edit2Icon',
          label: this.$t('edit'),
          onClick: this.onUpdateClick,
        },
      ]
    }
    if (this.onDetailsClick) {
      this.buttons = [
        ...this.buttons,
        {
          icon: 'EyeIcon',
          label: this.$t('Details'),
          onClick: this.onDetailsClick,
        },
      ]
    }
    (this.customActions || []).forEach(action => (this.buttons.length < 3
      ? this.buttons.push(action)
      : this.moreActions.push(action)))
    if (this.filters) {
      this.filters.forEach(({ field }) => {
        tableStore.pagination.filtersValues = {
          ...tableStore.pagination.filtersValues,
          [field.key]: '',
        }
      })
      this.filters.map(({ field }) => this.$watch(
        `tableStore.pagination.filtersValues.${field.key}`,
        val => {
          this.getData()
          this.$emit('on-extra-value-change', { [field.key]: val })
        },
      ))
    }
    if (this.tabs?.items) {
      this.$watch(
        'tableStore.tabs.activeTabIndex',
        val => {
          this.getData()
          this.$emit('on-tab-value-change', tableStore.tabs.list[val])
        },
      )
    }
    Object.keys(tableStore.pagination)
      .filter(key => !['isLoading'].includes(key))
      .forEach(key => this.$watch(
        `tableStore.pagination.${key}`,
        () => this.getData(),
      ))
  },
  async mounted() {
    if (this.url) this.getData()
  },
  methods: {
    toggleRowSelection,
    getData(params) {
      if (this.url) {
        listData({
          api: this.$http,
          url: this.url,
          resolveData: data => this.resolveData?.(data),
          extra: this.filters,
          toastError: () => toastError(this.$toast),
          params: { ...(this.includeInQuery || {}), ...(params || {}) },
        })
      }
    },
  },
}
</script>

<style lang="scss">

body {
  position: relative;
}

.data-table {
  .table-tr {
    position: relative;
  }

  .table-tr .show-btn, .table-tr .show-btn button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    opacity: 0;
    overflow: hidden;
    flex-shrink: 0;
    aspect-ratio: 1;
    border-radius: 999px;
    padding: 0;
    border: none;
    color: var(--gray-dark);
    justify-content: center;
    align-items: center;
    background: var(--white) !important;
    border-color: transparent !important;
    color: var(--gray-dark) !important;
    transition: none;

    button {
      padding: 0;
      margin: 0 !important;
      height: 100%;
      width: 100%;
      border-radius: 999px;

      &:hover {
        background: inherit !important;
        border-color: transparent !important;
        color: var(--gray-dark) !important;
      }
    }
  }

  .table-tr td {
    position: relative;
    max-width: 260px;
  }

  .table-tr td:hover .show-btn {
    width: 30px;
    transform: translateX(-20px);
    overflow: visible;
  }

  .table-tr td:hover .show-btn {
    opacity: 1;
    transform: translateX(-20px);
    overflow: visible;
  }

  .table-tr td:hover .td-first-div.shrink-4 {
    max-width: calc(100% - 106px - 35px);
    min-width: calc(100% - 106px - 35px);
  }

  .table-tr td:hover .td-first-div.shrink-3 {
    max-width: calc(100% - 106px);
    min-width: calc(100% - 106px);
  }

  .table-tr td:hover .td-first-div.shrink-2 {
    max-width: calc(100% - 106px + 35px);
    min-width: calc(100% - 106px + 35px);
  }

  .table-tr td:hover .td-first-div.shrink-1 {
    max-width: calc(100% - 106px + 53px + 28px);
    min-width: calc(100% - 106px + 53px + 28px);
  }

  .table-tr:hover .show-btn:hover {
    box-shadow: 0 2px 8px #5556;
    color: var(--white);
  }

  .table-tr:hover .show-btn:hover:nth-child(1) {
    background-color: var(--danger) !important;
    color: var(--white) !important;
  }

  .table-tr:hover .show-btn:hover:nth-child(2) {
    background-color: var(--warning) !important;
    color: var(--white) !important;
  }

  .table-tr:hover .show-btn:hover:nth-child(3) {
    background-color: var(--info) !important;
    color: var(--white) !important;
  }

  .table-tr:hover .show-btn:hover:nth-child(4) {
    background-color: var(--white) !important;
  }
}

@import '@/assets/scss/overrides/tables.scss';
@import '../../../../assets/scss/overrides/toast.scss';
</style>
