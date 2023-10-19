import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import table from './table'
import team from '@/store/modules/team';
import location from '@/store/modules/locations'
import user from './modules/user'
import mails from '@/store/modules/mails'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    table,
    team,
    location,
    mails,
    user,
  },
  strict: process.env.DEV,
})
