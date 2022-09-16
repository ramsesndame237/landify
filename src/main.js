import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import i18n from '@/libs/i18n'

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required, email, max, regex,
} from 'vee-validate/dist/rules'
import vueKanban from 'vue-kanban'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'

// Vee validate
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

Vue.use(vueKanban)

extend('email', email)
extend('required', required)
extend('regex', regex)
extend('max', {
  ...max,
  message: (_, values) => i18n.t('validations.messages.max', values),
})
extend('date_after', {
  params: ['attribute'],
  validate: (value, { attribute }) => value >= attribute,
  message: 'This date must be after {_attribute_}',
})

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

window.$vue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
