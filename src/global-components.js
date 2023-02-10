import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import {
  BButton,
  BCard,
  BFormCheckbox,
  BFormGroup,
  BFormRadioGroup,
  BLink,
  BOverlay,
  BSpinner,
  BThead,
  BTr,
  BTh,
  BTd,
  BTbody, BRow, BCol, BInputGroup, BInputGroupAppend, BTableSimple
} from 'bootstrap-vue'
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
Vue.component('b-thead', BThead)
Vue.component('b-th', BTh)
Vue.component('b-td', BTd)
Vue.component('b-tr', BTr)
Vue.component('b-tbody', BTbody)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-input-group', BInputGroup)
Vue.component('b-input-group-append', BInputGroupAppend)
Vue.component('b-table-simple', BTableSimple)
