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
  BCollapse,
  BTd,
  BTbody,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BTableSimple,
  BFormSelect,
  BFormInput,
  BFormCheckboxGroup,
  BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions';

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('b-button', BButton)
Vue.component('b-dropdown', BDropdown)
Vue.component('b-dropdown-item', BDropdownItem)
Vue.component('b-overlay', BOverlay)
Vue.component('b-spinner', BSpinner)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form-input', BFormInput)
Vue.component('b-form-checkbox', BFormCheckbox)
Vue.component('b-form-checkbox-group', BFormCheckboxGroup)
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
Vue.component('b-form-select', BFormSelect)
Vue.component('b-collapse', BCollapse)
