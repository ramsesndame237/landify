import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import { BButton, BCard, BFormCheckbox, BFormGroup, BFormRadioGroup, BLink, BOverlay, BSpinner } from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions';

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('b-button', BButton)
Vue.component('b-overlay', BOverlay)
Vue.component('b-spinner', BSpinner)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form-checkbox', BFormCheckbox)
Vue.component('b-link', BLink)
Vue.component('b-form-radio-group', BFormRadioGroup)
Vue.component('b-card', BCard)
Vue.component('b-card-actions', BCardActions)
