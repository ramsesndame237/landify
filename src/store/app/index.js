import { $themeBreakpoints } from '@themeConfig'
import { api } from '@/libs/axios'
import moment from 'moment'
import _ from 'lodash'

function getUserLanguage() {
  let lang = localStorage.getItem('current-lang')
  if (!lang) lang = (navigator.language || navigator.userLanguage).split('-')[0].toLowerCase()
  if (['en', 'fr', 'de'].indexOf(lang) === -1) lang = 'en'
  return lang
}

console.log('env', process.env)
export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    packageVersion: process.env.PACKAGE_VERSION || '0',
    commitVersion: process.env.CI_VERSION || '',
    commitDate: process.env.CI_DATE || '',
    now: moment(),
    lang: getUserLanguage(),
  },
  getters: {
    fullVersion: state => `v${state.packageVersion} - ${state.commitVersion} - ${process.env.CI_DATE}`,
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    now: state => state.now,
  },
  mutations: {
    UPDATE_NOW(state) {
      state.now = moment()
    },
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
  },
  actions: {
    async fetchAppData({ state }) {
      // get translations
      const globalTranslations = (await api({
        entity: '1__translation_i18n',
        action: 'read-rich',
        per_page: 1000000,
        lang: state.lang,
      })).data.data.data
      const attributeTranslations = (await api({
        entity: '1__attribute_i18n',
        action: 'read-rich',
        per_page: 1000000,
        lang: state.lang,
      })).data.data.data

      return {
        lang: state.lang,
        global: globalTranslations.filter(t => t.translation_lang === state.lang.toUpperCase())
          .reduce((prev, current) => {
            prev[current.translation_id] = current.translation_text
            return prev
          }, {}),
        attribute: attributeTranslations.filter(l => l.attribute_lang === state.lang.toUpperCase()).reduce((prev, current) => {
          prev[current.attribute_name] = current.attribute_nice_name
          return prev
        }, {}),
      }
    },
    async fetchUserData({ dispatch }, email) {
      // get user, user roles, role_tables_crud, role_tablegroup_crud, tablegroup_table
      const data = {}
      data.user = (await api({
        entity: 'frontend_1_1_2_1',
        data: [{ user_email: email }],
        action: 'read-rich',
      })).data.data.data[0]
      const now = moment()
      data.roles = (await dispatch('table/fetchList', {
        entity: 'user_role_grp',
        data: [{ user_id: data.user.user_id }],
      }, { root: true })).filter(r => (moment(r.user_role_valid_from).isBefore(now) && moment(r.user_role_valid_to).isAfter(now)))
      const hasRoles = data.roles.length > 0
      data.access = hasRoles ? (await dispatch('table/fetchList', {
        entity: 'role_access_grp',
        data: data.roles.map(r => ({ role_id: r.role_id })),
      }, { root: true })) : []
      data.tables = hasRoles ? (await dispatch('table/fetchList', {
        entity: 'role_tablename_crud_grp',
        data: data.roles.map(r => ({ role_id: r.role_id })),
      }, { root: true })) : []
      data.tablegroups = hasRoles ? (await dispatch('table/fetchList', {
        entity: 'role_tablegroup_crud_grp',
        data: data.roles.map(r => ({ role_id: r.role_id })),
      }, { root: true })) : []
      data.tablegroup_tables = hasRoles ? (await dispatch('table/fetchList', {
        entity: 'tablename_tablegroup_grp',
        data: _.uniqBy(data.tablegroups, 'tablegroup_id').map(t => ({ tablegroup_id: t.tablegroup_id })),
      }, { root: true })) : []
      localStorage.setItem('userData', JSON.stringify(data))
    },
  },
}
