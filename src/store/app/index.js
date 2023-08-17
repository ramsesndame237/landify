import { $themeBreakpoints } from '@themeConfig'
import axiosIns from '@/libs/axios'

import moment from 'moment'

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
    commitVersion: process.env.VUE_APP_GIT_HASH,
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
      const globalTranslations = (await axiosIns.post('/specific-api', {
        a: {
          entity: '1__translation_i18n',
          action: 'read-rich',
          per_page: 1000000,
          lang: state.lang,
        },
      })).data.data.data
      const attributeTranslations = (await axiosIns.post('/specific-api', {
        a: {
          entity: '1__attribute_i18n',
          action: 'read-rich',
          per_page: 1000000,
          lang: state.lang,
        },
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
        date: moment().toISOString(),
      }
    },
    async fetchUserData() {
      const user = (await axiosIns.get('/user/')).data
      localStorage.setItem('userData', JSON.stringify(user))
    },
  },
}
