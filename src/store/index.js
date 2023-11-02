import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import table from './table'
import user from './modules/user'

import documentModule from './modules/document-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    documentModule,
    table,
    user,
  },
  strict: process.env.DEV,
})
