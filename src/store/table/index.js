import _ from 'lodash'
import Vue from 'vue'
import moment from 'moment'
import { api, http } from '@/libs/axios'

export default {
  namespaced: true,
  state: {
    perPage: 10,
    search: '',
    currentPage: 1,
    totalRows: 0,
    tableDefinition: {},
    // caching result for select list
    listCache: {},
    // table paramters
    tableData: {},
    // caching results from the backend
    tableCache: {},
  },
  getters: {
    tableDefinition: state => entity => state.tableDefinition[entity],
    tableData: state => table => state.tableData[table],
    listCache: state => key => state.listCache[key] || [],
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
    setListCache(state, { entity, data }) {
      Vue.set(state.listCache, entity, data)
    },
    deleteTableCacheKeyFromPrefix(state, prefix) {
      Object.keys(state.tableCache).forEach(key => {
        if (key.startsWith(prefix)) Vue.set(state.tableCache, key, null)
      })
    },
    deleteListCacheKeyFromPrefix(state, prefix) {
      Object.keys(state.listCache).forEach(key => {
        if (key.startsWith(prefix)) Vue.set(state.listCache, key, null)
      })
    },
    clearCacheData(state) {
      state.tableData = {}
      state.listCache = {}
      state.tableCache = {}
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
    setListData(context, payload) {
      context.commit('setListCache', payload)
    },
    /**
     * @param context : Context de l'action, contenant les getters, le state et les autres actions
     * @param entity
     * @param data
     * @param customEnpoint
     * @param page Le numéro de la page
     * @param per_page Nombre d'élément voulu pour cette requête
     * @param keyword Représente les termes de la recherche, dans le cas ou on effectue une recherche
     * @param getWholeResponse  Permet de déterminer si on doit renvoyer l'oject réponse en lui-même ou juste les data de la réponse,
     * car certain traitement sont effectué dans la fonction appellante.
     * @param append
     * @returns {*|*[]}
     */
    fetchList(context, {
      entity, data, customEnpoint = null, page = null,
      per_page = null, keyword = null, getWholeResponse = false, append = false,
    }) {
      const setStore = serverData => {
        if (append) {
          const cacheData = context.getters.listCache(entity)
          Vue.set(context.state.listCache, entity, [...cacheData, ...serverData])
        } else {
          Vue.set(context.state.listCache, entity, serverData)
        }
      }
      if (customEnpoint) {
        data = [
          { page: page || 1 },
          { per_page: per_page || 100000 },
          { keyword: keyword || '' },
          ...(data || [{}]),
          { order: 'desc' },
        ]
        const requestQuery = data.map(i => Object.keys(i).map(e => `${e}=${i[e]}`).join('&')).join('&')
        return http.get(`${customEnpoint}?${requestQuery}`)
          .then(({ data: respData }) => {
            setStore(respData.data)
            context.commit('setDefinition', { data: respData, table: entity })
            return getWholeResponse ? respData : respData.data
          })
      }
      if (entity === 'document') {
        console.warn('Fetch of document is disabled')
        return []
      }
      return api({
        action: 'read-rich',
        entity,
        order_by: '',
        order_dir: 'DESC',
        per_page: per_page || 100000,
        from: 0,
        current_page: page || 1,
        filter: {},
        ...(data ? { data } : {}),
        ...(keyword && { filter_all: keyword }),
        lang: window.$vue ? window.$vue.$i18n.locale : 'en',
      })
        .then(({ data: respData }) => {
          setStore(respData.data.data)
          context.commit('setDefinition', { data: respData, table: entity })
          return getWholeResponse ? respData.data : respData.data.data
        })
    },
  },
}
