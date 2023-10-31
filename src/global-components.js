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
  BTfoot,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BTableSimple,
  BFormSelect,
  BFormInput,
  BFormCheckboxGroup,
  BDropdown, BDropdownItem,
  BAvatarGroup, BAvatar, BCardTitle, BCardGroup, BCardText, BTabs, BTab, BBadge, BListGroup, BListGroupItem, BForm,
  BTable, BPagination, BAlert, BSidebar, BProgress, BProgressBar,
} from 'bootstrap-vue'
import { BCardActions } from '@core/components/b-card-actions'
import { Icon } from '@iconify/vue2'

Vue.component('icon', Icon)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component('b-sidebar', BSidebar)
Vue.component('b-progress', BProgress)
Vue.component('b-progress-bar', BProgressBar)
Vue.component('b-avatar-group', BAvatarGroup)
Vue.component('b-badge', BBadge)
Vue.component('b-card-group', BCardGroup)
Vue.component('b-avatar', BAvatar)
Vue.component('b-card-text', BCardText)
Vue.component('b-card-title', BCardTitle)
Vue.component('b-button', BButton)
Vue.component('b-tabs', BTabs)
Vue.component('b-tab', BTab)
Vue.component('b-list-group', BListGroup)
Vue.component('b-list-group-item', BListGroupItem)
Vue.component('b-dropdown', BDropdown)
Vue.component('b-dropdown-item', BDropdownItem)
Vue.component('b-overlay', BOverlay)
Vue.component('b-spinner', BSpinner)
Vue.component('b-form-group', BFormGroup)
Vue.component('b-form', BForm)
Vue.component('b-form-input', BFormInput)
Vue.component('b-form-checkbox', BFormCheckbox)
Vue.component('b-form-checkbox-group', BFormCheckboxGroup)
Vue.component('b-link', BLink)
Vue.component('b-form-radio-group', BFormRadioGroup)
Vue.component('b-card', BCard)
Vue.component('b-card-actions', BCardActions)
Vue.component('b-thead', BThead)
Vue.component('b-table', BTable)
Vue.component('b-th', BTh)
Vue.component('b-td', BTd)
Vue.component('b-tr', BTr)
Vue.component('b-tbody', BTbody)
Vue.component('b-tfoot', BTfoot)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-input-group', BInputGroup)
Vue.component('b-input-group-append', BInputGroupAppend)
Vue.component('b-table-simple', BTableSimple)
Vue.component('b-form-select', BFormSelect)
Vue.component('b-collapse', BCollapse)
Vue.component('b-pagination', BPagination)
Vue.component('b-alert', BAlert)
