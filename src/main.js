import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import i18n from '@/libs/i18n'

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required, email, max, regex, max_value, required_if,
} from 'vee-validate/dist/rules'
import vueKanban from 'vue-kanban'
import store from './store'
import router from './router'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/auth/jwt/useJwt'

// Vee validate
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

Vue.use(vueKanban)
extend('email', email)
extend('required', required)
extend('regex', regex)
extend('required_if', required_if)
extend('max', {
  ...max,
  message: (_, values) => i18n.t('validations.messages.max', values),
})
extend('max_value', {
  ...max_value,
  message: (_, values) => i18n.t('validations.messages.max_value', values),
})
extend('date_after', {
  params: ['attribute'],
  validate: (value, { attribute }) => value >= attribute,
  message: 'This date must be after {_attribute_}',
})
extend('required_if_null', {
  params: ['attribute'],
  validate: (value, { attribute }) => {
    console.log(value, attribute)
    return (!attribute && !!value) || (!!attribute && !value)
  },
  message: 'This field is required if {_attribute_} is empty',
})

extend('lower', {
  params: ['attribute'],
  validate: (value, { attribute }) => {
    if (!value || !attribute) return true
    return parseFloat(value) <= parseFloat(attribute)
  },
  message: 'The value must be lower than {_attribute_}',
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

const userEmail = localStorage.getItem('userEmail')

async function init() {
  // load acl after userdata is loaded
  require('@/libs/acl')

  const data = await store.dispatch('app/fetchAppData')
  console.log(data.attribute)
  i18n.mergeLocaleMessage(store.state.app.lang, { attribute: data.attribute, ...data.global })
  window.$vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')
}

if (userEmail) {
  store.dispatch('app/fetchUserData', userEmail)
    .finally(init)
} else {
  init()
}
