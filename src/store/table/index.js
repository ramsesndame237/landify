import _ from 'lodash'
import Vue from 'vue'
import moment from 'moment'
import { api } from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    perPage: 10,
    search: '',
    currentPage: 1,
    totalRows: 0,
    tableDefinition: {},
    listCache: {},
    // table paramters
    tableData: {},
    // caching results from the backend
    tableCache: {},
  },
  getters: {
    tableDefinition: state => entity => state.tableDefinition[entity],
    tableData: state => table => state.tableData[table],
    tableCache: state => (key => {
      const val = state.tableCache[key]
      if (val) {
        if (moment().diff(val.time, 's') <= 120) {
          return val.data
        }
      }
      return null
    }),
  },
  mutations: {
    setDefinition(state, { data, table }) {
      Vue.set(state.tableDefinition, table, _.pick(data.data, ['attribute', 'attribute_i18n', 'attribute_regexp', 'attribute_regexp_failure_message', 'attribute_datatype_hint', 'attribute_datatype_len']))
    },
    setTableData(state, data) {
      Vue.set(state.tableData, data.table, data.payload)
      console.log('set table data', data.table, data.payload)
    },
    setTableCache(state, data) {
      Vue.set(state.tableCache, data.key, { data: data.data, time: moment() })
    },
  },
  actions: {
    fetchSingleItem(context, payload) {
      return api({
        action: 'read-rich',
        entity: payload.entity,
        // order_by: '',
        // order_dir: 'DESC',
        per_page: 1,
        from: 0,
        current_page: 1,
        data: [{ [payload.primaryKey]: payload.id }],
        filter_all: '',
        lang: window.$vue.$i18n.locale,
      })
        .then(({ data }) => {
          context.commit('setDefinition', data)
          return data.data.data[0]
        })
    },
    fetchTableDefinition(context, entity) {
      return api({
        action: 'read-rich',
        entity,
        per_page: 1,
        current_page: 1,
        lang: window.$vue.$i18n.locale,
      })
        .then(({ data }) => {
          context.commit('setDefinition', { data, table: entity })
          return data.data.data
        })
    },
    fetchList(context, { entity, data }) {
      return api({
        action: 'read-rich',
        entity,
        order_by: '',
        order_dir: 'DESC',
        per_page: 100000,
        from: 0,
        current_page: 1,
        filter: {},
        ...(data ? { data } : {}),
        filter_all: '',
        lang: window.$vue ? window.$vue.$i18n.locale : 'en',
      })
        .then(({ data }) => {
          Vue.set(context.state.listCache, entity, data.data.data)
          context.commit('setDefinition', { data, table: entity })
          return data.data.data
        })
    },
  },
}
