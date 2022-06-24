import _ from 'lodash'
import Vue from 'vue'
import { api } from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    perPage: 10,
    search: '',
    currentPage: 1,
    totalRows: 0,
    tableDefinition: {},
  },
  getters: {
    tableDefinition: state => entity => state.tableDefinition[entity],
  },
  mutations: {
    setDefinition(state, data) {
      Vue.set(state.tableDefinition, data.entity, _.pick(data.data, ['attribute', 'attribute_i18n', 'attribute_regexp', 'attribute_regexp_failure_message', 'attribute_datatype_hint', 'attribute_datatype_len']))
    },
  },
  actions: {
    fetchSingleItem(context, payload) {
      return api({
        action: 'read-rich',
        entity: payload.entity,
        order_by: '',
        order_dir: 'DESC',
        per_page: 1,
        from: 0,
        current_page: 1,
        filter: { [payload.primaryKey]: payload.id },
        filter_all: '',
        lang: window.$vue.$i18n.locale,
      })
        .then(({ data }) => {
          context.commit('setDefinition', data)
          return data.data.data[0]
        })
    },
    fetchList(context, entity) {
      return api({
        action: 'read-rich',
        entity,
        order_by: '',
        order_dir: 'DESC',
        per_page: 100000,
        from: 0,
        current_page: 1,
        filter: {},
        filter_all: '',
        lang: window.$vue.$i18n.locale,
      })
        .then(({ data }) => data.data.data)
    },
  },
}
