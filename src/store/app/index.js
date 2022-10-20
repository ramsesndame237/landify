import { $themeBreakpoints } from '@themeConfig'
import { api } from '@/libs/axios'
import moment from 'moment'

console.log('env', process.env)
export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    packageVersion: process.env.PACKAGE_VERSION || '0',
    commitVersion: process.env.CI_VERSION || '',
    commitDate: process.env.CI_DATE || '',
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
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
  },
  actions: {
    async fetchUserData({ dispatch }, email) {
      // get user, user roles, role_tables_crud, role_tablegroup_crud, tablegroup_table
      const data = {}
      data.user = (await api({
        entity: 'user',
        filter: { user_email: email },
        action: 'read-rich',
      })).data.data.data[0]
      const now = moment()
      data.roles = (await dispatch('table/fetchList', {
        entity: 'user_role_grp',
        data: [{ user_id: data.user.user_id }],
      }, { root: true })).filter(r => (moment(r.user_role_valid_from).isBefore(now) && moment(r.user_role_valid_to).isAfter(now)))
      const hasRoles = data.roles.length > 0
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
        data: data.tablegroups.map(t => ({ tablegroup_id: t.tablegroup_id })),
      }, { root: true })) : []
      localStorage.setItem('userData', JSON.stringify(data))
      return data
    },
  },
}
