import { reactive } from '@vue/composition-api'
import _ from 'lodash'

export const initialState = {
  pagination: {
    page: 1,
    pages: 0,
    size: 10,
    total: 0,
    order: 'desc',
    orderField: '',
    search: '',
    isLoading: false,
    lang: '',
    filtersValues: {},
    filters: {},
    method: 'get'
  },
  tabs: {
    list: [],
    key: '',
    value: '',
    activeTabIndex: 0,
  },
  columns: {
    list: [],
    hided: [],
  },
  rows: {
    list: [],
    selected: [],
    allSelected: false,
    indeterminate: false,
    rowToShow: null,
    rowToEdit: null,
    rowToDelete: null,
  },
  requests: {
    controller: null,
  },
}

let dataTableStore = reactive(initialState)

export const initDataTable = () => {
  dataTableStore = {
    ...dataTableStore,
    ...reactive(initialState)
  }
}

export function checkAllCheckState() {
  const length = dataTableStore.rows.selected.length
  if (length === 0) {
    dataTableStore.rows.indeterminate = false
    dataTableStore.rows.allSelected = false
  } else if (length === dataTableStore.rows.list.length) {
    dataTableStore.rows.indeterminate = false
    dataTableStore.rows.allSelected = true
  } else {
    dataTableStore.rows.indeterminate = true
    dataTableStore.rows.allSelected = false
  }
}

export function hideColumn(colId) {
  if (dataTableStore.columns.hided.length >= dataTableStore.columns.list.length - 1) return
  dataTableStore
    .columns
    .hided
    .push(colId)
}

export function showColumn(colId) {
  const index = dataTableStore
    .columns
    .hided.findIndex(item => item === colId)

  if (index > -1) {
    dataTableStore
      .columns
      .hided
      .splice(index, 1)
  }
}

export function toggleColumn(colId) {
  if (dataTableStore.columns.hided.includes(colId)) {
    showColumn(colId)
  } else {
    hideColumn(colId)
  }
}

export function selectRow(rowId) {
  const index = dataTableStore
    .rows
    .selected.findIndex(item => item === rowId)

  if (index === -1) {
    dataTableStore
      .rows
      .selected
      .push(rowId)
  }
  checkAllCheckState()
}

export function unSelectRow(rowId) {
  const index = dataTableStore
    .rows
    .selected
    .findIndex(item => item === rowId)

  if (index > -1) {
    dataTableStore
      .rows
      .selected
      .splice(index, 1)
  }
  checkAllCheckState()
}

export function unselectAllRows() {
  dataTableStore
    .rows
    .selected
    .splice(0)
  checkAllCheckState()
}

export function selectAllRows(selectFunc) {
  unselectAllRows()
  dataTableStore
    .rows
    .list
    .forEach(item => {
      dataTableStore
        .rows
        .selected
        .push((selectFunc || (row => row.id))(item))
    })
  checkAllCheckState()
}

export function toggleAllSelectedRows(selectFunc) {
  if (dataTableStore
    .rows
    .selected.length === dataTableStore
    .rows
    .list.length) {
    unselectAllRows()
  } else {
    selectAllRows(selectFunc)
  }
  checkAllCheckState()
}

export function toggleRowSelection(rowId) {
  if (dataTableStore.rows.selected.includes(rowId)) {
    unSelectRow(rowId)
  } else {
    selectRow(rowId)
  }
  checkAllCheckState()
}

export function orderByColumn(colId, order) {
  dataTableStore.pagination.order = order
  dataTableStore.pagination.orderField = colId
}

export async function listData({
  api,
  url,
  toastError,
  resolveData,
}) {
  const _payload = {
    size: dataTableStore.pagination.size === 0 ? 1000000 : dataTableStore.pagination.size,
    page: dataTableStore.pagination.page,
    query: dataTableStore.pagination.search,
    lang: dataTableStore.pagination.lang,
    order: dataTableStore.pagination.order,
    order_field: dataTableStore.pagination.orderField,
    ...(dataTableStore.pagination.filtersValues || {}),
    ...(dataTableStore.tabs.list[dataTableStore.tabs.activeTabIndex]?.filters || {}),
  }
  const payload = {}
  Object.keys(_payload).forEach(key => {
    if(_payload[key]) {
      payload[key] = _payload[key]
    }
  })
  if (dataTableStore.requests.controller) {
      dataTableStore.requests.controller.abort()
  }
  dataTableStore.requests.controller = new AbortController()
  try {
    dataTableStore.pagination.isLoading = true
    const { data } = await api[String(dataTableStore.pagination.method || 'get').toLowerCase()](url, { params: payload, signal: dataTableStore.requests.controller.signal })
    dataTableStore.rows.list = resolveData(data)
    dataTableStore.pagination.total = data?.total || dataTableStore.pagination.total
    dataTableStore.pagination.page = data?.page || dataTableStore.pagination.page
    dataTableStore.pagination.size = data?.size || data?.per_page || dataTableStore.pagination.size
    dataTableStore.pagination.pages = data?.pages || data?.pages || Math.ceil(dataTableStore.pagination.total/dataTableStore.pagination.size)
    dataTableStore.pagination.isLoading = false
    } catch (e) {
    if (e?.code !== 'ERR_CANCELED') {
      dataTableStore.pagination.isLoading = false
      console.log({e})
      toastError()
      throw e
    }
  }
}

export function handleDelete({
  swal,
  http,
  url,
  isDeleteBulk,
  rowId,
}) {
  swal.fire({
    title: 'You will delete item(s)',
    icon: 'warning',
    text: 'Really want to delete this item(s)? This action is irreversible!',
    showCloseButton: false,
    showCancelButton: true,
    customClass: {
      confirmButton: 'btn btn-primary mr-50',
      cancelButton: 'btn btn-light ml-50',
    },
    buttonsStyling: false,
    focusConfirm: false,
    confirmButtonText: 'Confirm',
    confirmButtonAriaLabel: 'Confirm delete',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => http.delete(isDeleteBulk ? url : url.concat(`/${rowId}`), { body: isDeleteBulk ? dataTableStore.rows.selected : undefined })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .catch(error => {
        swal.showValidationMessage(
          `Request failed: ${error}`,
        )
      }),
    allowOutsideClick: () => !swal.isLoading(),
  })
}

export function handleConfirm({
  swal,
  http,
  url,
  method,
  body,
  title,
  text,
}) {
  swal.fire({
    title: title || 'Are you sure you want to perform this action?',
    icon: 'warning',
    text: text || 'You are confirming that you want to perform this action.',
    showCloseButton: false,
    showCancelButton: true,
    customClass: {
      confirmButton: 'btn btn-primary mr-50',
      cancelButton: 'btn btn-light ml-50',
    },
    buttonsStyling: false,
    focusConfirm: false,
    confirmButtonText: 'Confirm',
    confirmButtonAriaLabel: 'Confirm',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => http[method || 'post'](url, body)
      .then(response => {
        // if (![200, 201].includes(response?.status)) {
        //   throw new Error(response?.statusText)
        // }
        return response?.json()
      })
      .catch(error => {
        swal.showValidationMessage(
          `Request failed: ${error}`,
        )
      }),
    allowOutsideClick: () => !swal.isLoading(),
  })
}

export function useTableStore() {
  return dataTableStore
}

export function swalConfirmRequest({
  swal,
  http,
  url,
  title,
  description,
  variant,
  method,
  body,
  t,
  onSuccess,
  onError,
  autoRefresh,
}) {
  swal.fire({
    title,
    icon: variant,
    text: description || 'This action is irreversible.',
    showCloseButton: false,
    showCancelButton: true,
    customClass: {
      confirmButton: 'btn btn-primary mr-50',
      cancelButton: 'btn btn-light ml-50',
    },
    buttonsStyling: false,
    focusConfirm: false,
    confirmButtonText: 'Confirm',
    confirmButtonAriaLabel: 'Confirm',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => http?.[method]?.(url, body)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        onSuccess?.(data)
        if(autoRefresh) {

        }
        return data
      })
      .catch(error => {
        onError?.(error)
        swal.showValidationMessage(
          `${typeof error?.detail === 'string' ? error.detail : 'An unexpected error occurred. Try again later.'}`,
        )
      }),
    allowOutsideClick: () => !swal.isLoading(),
  })
}
