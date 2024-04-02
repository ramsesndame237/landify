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
        :columns="columnsArray.length || 4"
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
          :columns="columnsArray"
          :no-checkbox="!withCheckbox"
          :select-row-fn="selectRowFn"
        />
        <b-tbody>
          <b-tr
            v-if="!tableStore.rows.list || tableStore.rows.list.length === 0"
          >
            <b-td
              :colspan="(columnsArray || []).length + 1"
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
            :class="{ shrinkable: !actionsAtTheLastColumn }"
            @click="onRowClick && onRowClick(row, tableStore, i)"
          >
            <b-td v-if="withCheckbox">
              <b-form-checkbox
                :checked="tableStore.rows.selected.includes(selectRowFn(row))"
                @change="toggleRowSelection(selectRowFn(row))"
              />
            </b-td>
            <fragment
              v-for="({component: cmp, ...col}, j) in columnsArray"
              :key="`${col.id}-${row.id}`"
            >
              <b-td
                v-if="!tableStore.columns.hided.includes(col.id)"
                v-bind="col.props"
                class="position-relative"
                :class="{ 'cursor-default': !onRowClick }"
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
                      <row-actions
                        v-else-if="actionsAtTheLastColumn && j === columnsArray.length - 1"
                        :buttons="buttons"
                        :more-actions="moreActions"
                        :table-store="tableStore"
                        :col="col"
                        :row="row"
                        :list-all-actions="listAllActions"
                        :actions-at-the-last-column="actionsAtTheLastColumn"
                        :floating="false"
                        :i="i"
                        :j="j"
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
                  <row-actions
                    v-if="!actionsAtTheLastColumn"
                    :buttons="buttons"
                    :more-actions="moreActions"
                    :table-store="tableStore"
                    :col="col"
                    :row="row"
                    :list-all-actions="listAllActions"
                    :actions-at-the-last-column="actionsAtTheLastColumn"
                    :floating="true"
                    :i="i"
                    :j="j"
                  />
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
  BSidebar,
  BSkeletonTable,
  BTableSimple,
  BTooltip,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import SimplePagination from '@/layouts/components/SimplePagination'

import NoData from '../NoData/NoData.vue'
import TableFilters from './components/TableFilters.vue'
import TableHead from './components/TableHead.vue'
import DateCol from './components/columns/DateCol.vue'
import DefaultCol from './components/columns/DefaultCol.vue'
import StatusCol from './components/columns/StatusCol.vue'
import RowActions from './components/RowActions.vue'
import {
  handleDelete,
  initDataTable,
  listData,
  toggleRowSelection,
  useTableStore,
} from './state/data-table-store'
import { toastError } from './utils'

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
    RowActions,
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
    noInitialFetch: {
      type: Boolean,
      default: false,
    },
    actionsAtTheLastColumn: {
      type: Boolean,
      default: false,
    },
    listAllActions: {
      type: Boolean,
      default: false,
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
  computed: {
    columnsArray() {
      return this.getColumns()
    },
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
    tableStore.columns.list = this.getColumns() || []
    tableStore.tabs.list = this.tabs?.items || []
    tableStore.tabs.key = this.tabs?.key || ''
    tableStore.tabs.value = this.tabs?.items?.[0]?.value || ''
    tableStore.pagination.method = this.method
    tableStore.rows.list = []
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
        (val, old) => {
          if (val !== old) {
            this.getData({ page: 1 })
            this.$emit('on-extra-value-change', { [field.key]: val })
          }
        },
      ))
    }
    if (this.tabs?.items) {
      this.$watch(
        'tableStore.tabs.activeTabIndex',
        (val, old) => {
          if (val !== old) {
            this.getData({ page: 1 })
            this.$emit('on-tab-value-change', tableStore.tabs.list[val])
          }
        },
      )
    }
    Object.keys(tableStore.pagination)
      .filter(key => !['isLoading', 'total', 'pages'].includes(key))
      .forEach(key => this.$watch(
        `tableStore.pagination.${key}`,
        (val, old) => {
          if (val !== old) {
            this.getData(key === 'page' ? {} : { page: 1 })
          }
        },
      ))
  },
  async mounted() {
    if (this.url && !this.noInitialFetch) this.getData()
  },
  methods: {
    toggleRowSelection,
    getColumns() {
      return this.actionsAtTheLastColumn ? [...this.columns, { key: 'actions', header: { name: 'Actions' } }] : this.columns
    },
    getData(params, options) {
      console.log({ inQuery: this.includeInQuery, params })
      if (this.url) {
        listData({
          api: this.$http,
          url: this.url,
          resolveData: data => this.resolveData?.(data),
          extra: this.filters,
          toastError: () => toastError(this.$toast),
          params: { ...(options?.ignoreIncludeQuery ? {} : (this.includeInQuery || {})), ...(params || {}) },
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

svg {
  flex-shrink: 0;
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
    flex-shrink: 0;
    aspect-ratio: 1;
    border-radius: 999px;
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

  .table-tr.shrinkable .show-btn, .table-tr.shrinkable .show-btn button {
    opacity: 0;
    overflow: visible;
  }

  .table-tr td {
    position: relative;
    max-width: 260px;
  }

  .table-tr.shrinkable td:hover .show-btn {
    width: 30px;
    transform: translateX(-20px);
    overflow: visible;
  }

  .table-tr.shrinkable td:hover .show-btn {
    opacity: 1;
    transform: translateX(-20px);
    overflow: visible;
  }

  .table-tr.shrinkable td:hover .td-first-div.shrink-4 {
    max-width: calc(100% - 106px - 35px);
    min-width: calc(100% - 106px - 35px);
  }

  .table-tr.shrinkable td:hover .td-first-div.shrink-3 {
    max-width: calc(100% - 106px);
    min-width: calc(100% - 106px);
  }

  .table-tr.shrinkable td:hover .td-first-div.shrink-2 {
    max-width: calc(100% - 106px + 35px);
    min-width: calc(100% - 106px + 35px);
  }

  .table-tr.shrinkable td:hover .td-first-div.shrink-1 {
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
