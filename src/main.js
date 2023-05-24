import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import i18n from '@/libs/i18n'

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required, email, max, regex, max_value, required_if, size
} from 'vee-validate/dist/rules'
import vueKanban from 'vue-kanban'
import store from './store'
import router from './router'
import App from './App.vue'
import * as Sentry from "@sentry/vue";

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/auth/jwt/useJwt'
import '@/libs/clipboard'

import ability from '@/libs/acl'
import { defineRules } from "@/libs/acl/ability";
import moment from "moment";

// Vee validate
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)

Vue.use(vueKanban)
extend('email', email)
extend('size', {
  ...size,
  message: (_, values) => i18n.t('validations.messages.size', {
    ...values,
    _field_: i18n.t(`attribute.${values._field_}`),
  }),
})
extend('required', {
  ...required,
  message: (_, values) => i18n.t('validations.messages.required', { _field_: i18n.t(`attribute.${values._field_}`) }),
})
extend('regex', regex)
extend('required_if', required_if)
extend('max', {
  ...max,
  message: (_, values) => i18n.t('validations.messages.max', {
    ...values,
    _field_: i18n.t(`attribute.${values._field_}`),
  }),
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


Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_DNS,
});

async function init() {
  try {
    let data = localStorage.getItem('app-data')
    try {
      if (data) data = JSON.parse(data)
    } catch (e) {
      data = null
    }
    // caching is only for 24 hours
    if (data && data.lang === store.state.app.lang && data.date && moment().diff(moment(data.date), 'h') < 24) {
      i18n.mergeLocaleMessage(store.state.app.lang, { attribute: data.attribute, ...data.global })
    } else {
      // remove this else after and do this all the item
      data = await store.dispatch('app/fetchAppData')
      localStorage.setItem('app-data', JSON.stringify(data))
      i18n.mergeLocaleMessage(store.state.app.lang, { attribute: data.attribute, ...data.global })
    }
  } catch (e) {
    console.error(e)
  }

  window.$vue = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app')
}

if (userEmail) {
  store.dispatch('app/fetchUserData', userEmail)
    .finally(() => {
      console.log('init')
      ability.update(defineRules())
      return init()
    })
} else {
  init()
}
