import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BOverlay, BSpinner } from 'bootstrap-vue'

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('b-button', BButton)
Vue.component('b-overlay', BOverlay)
Vue.component('b-spinner', BSpinner)
