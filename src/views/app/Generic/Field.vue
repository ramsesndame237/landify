<template>
  <div>
    <b-form-group v-if="visible" :label=" (field.noLabel|| noLabel) ? '' : $t(field.label||'attribute.'+field.key)"
                  :label-for="'field-'+field.key" :class="field.onlyForm?'hide-main':''" :label-cols-md="inline?4:null">
      <b-form-input v-if="field.auto" v-model="entity[field.key]" :size="field.size || null" disabled
                    :placeholder="$t('attribute.general_automaticid')"/>
      <validation-provider v-else #default="{ errors, validate }" :rules="rules" :name="field.key"
                           :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message&& tableDefinition.attribute_regexp_failure_message[field.key]}">

        <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
        <div v-else-if="field.type==='html'" class="message-editor">
          <template v-if="disabled">
            <div class="p-1 border rounded" v-html="entity[field.key]"/>
          </template>
          <b-form-textarea v-show="!disabled" :id="'tinyEditor-'+field.key" v-model="entity[field.key]"
                           :class="{'d-none' : editorInstance && editorInstance.isHidden}"/>
          <!-- <ckeditor v-else :id="'ckcontent-'+field.key" v-model="entity[field.key]" :disabled="disabled"
                    :editor="editor" :config="{}"
          /> -->
        </div>
        <div v-else-if="field.type==='list'"
             :class="(field.withNew || field.withPopup || field.ids || field.withRoundedNew) ? 'd-flex': ''">
          <v-select v-model="entity[field.entityKey || field.key]" :dropdown-should-open="dropdownShouldOpen" :disabled="selectDisabled"
                    :class="{'error': errors.length > 0, 'multiple_select': field.multiple }"
                    :get-option-label="(typeof field.listLabel === 'function') ? field.listLabel : (defaultLabelFunction[field.key]||(option=> option[field.listLabel]))"
                    :placeholder="field.placeholder ? $t(`${field.placeholder}`) : field.key" :multiple="field.multiple" :options="listItems" transition=""
                    :label="(typeof field.listLabel === 'string') ? field.listLabel: null" class="w-100"
                    :reduce="i => i[field.tableKey||field.key]" :clear-search-on-blur="()=> false"
                    :clearable="field.clearable != null ? field.clearable : true" :filterable="!field.customPagination"
                    @input="onChange" @open="onListOpen" @close="onListClose" @search="onSearch">
            <template v-if="field.optionWithTooltipDetail" #option="option">
              <span v-b-tooltip.hover :title="getOptionLabel(option)">{{ getOptionLabel(option) }}</span>
            </template>
            <template v-if="field.optionWithTooltipDetail" #selected-option="option">
              <span v-b-tooltip.hover.dh10 :title="getOptionLabel(option)"
                    @click.native="fixForMore">{{ getOptionLabel(option) }}</span>
            </template>

            <template #list-footer>
              <li v-show="hasNext" ref="load" class="loader">
                Loading more options...
              </li>
            </template>
            <template #spinner>
              <div v-show="loading" class="spinner ml5">
                <icon icon="fontisto:spinner" width="23"/>
              </div>
            </template>
          </v-select>
          <b-button v-if="field.withNew && !field.alwaysNew && !disabled" class="ml-2 text-nowrap" variant="info"
                    @click="showNewForm">New
          </b-button>
          <div v-if="field.withRoundedNew && !field.alwaysNew && !disabled"
               class="ml-2 text-nowrap d-flex align-items-center justify-content-center custom_rounded_button cursor-pointer "
               @click="showNewForm">
            <feather-icon icon="PlusIcon"/>
          </div>
          <b-button v-if="field.withPopup && !field.alwaysNew && !disabled" class="ml-2 text-nowrap" variant="info"
                    :disabled="disablePopupButton" @click="showNewPopupForm">New
          </b-button>

          <b-button v-if="field.ids && !field.noShowButton" class="ml-2 text-nowrap" variant="info"
                    @click="showAll=!showAll">
            {{ showAll ? 'Show Created' : 'Show All' }}
          </b-button>
        </div>
        <div v-else-if="field.type ==='custom_list'">
          <AutoCompleteInput :options="listItems" :key-label="field.listLabel || ''" :key_value="field.key || ''"
                             icon_open="ChevronUpIcon" icon_close="ChevronDownIcon"/>
        </div>
        <div v-else-if="field.type === 'list_select'">
          <SelectedButtonList v-if="field.options.length > 0" :key-object="field.key" :label-string="field.listLabel"
                              :options="field.options" :classes="[field.listButtonClass]"
                              @selectedOptions="SelectedButtonOptions"/>
          <span v-else>
            No teams available for the company you previous selected
          </span>
        </div>
        <div v-else-if="field.type==='yesno' || field.type==='custom-select'">
          <v-select v-model="entity[field.key]" :disabled="isDisabled || disabled" :state="errors.length > 0 ? false:null"
                    :multiple="field.multiple" :placeholder="field.key"
                    :clearable="field.clearable != null ? field.clearable : true"
                    :options="field.type==='yesno'?yesNoOptions: customSelectOptions" transition="" label="label"
                    class="w-100" :reduce="i => i.value"/>
        </div>
        <div v-else-if="field.type==='checkbox'">
          <b-form-checkbox-group v-model="entity[field.key]" :disabled="disabled"
                                 :state="errors.length > 0 ? false:null" :placeholder="field.key" text-field="label"
                                 :options="field.items"/>
        </div>
        <div v-else-if="field.type==='file'">
          {{ field.accept }}
          <b-form-file ref="file" type="file" placeholder="Choose a file or drop it here..."
                       drop-placeholder="Drop file here..." :multiple="field.multiple" required
                       :file-name-formatter="formatFileInputNames" :accept="field.accepted" @change="updateFilesData($event, validate)"/>
          <div class="d-flex flex-column mt-2">
            <div v-for="(file, index) in files" :key="index" class="d-flex justify-content-between mb-1">
              <div>
                <b-img :src="getFileThumbnail(file.type)" width="16px" class="mr-50"/>
                <span class="text-muted font-weight-bolder align-text-top">{{
                    file.name
                  }}</span>
                <span class="text-muted font-small-2 ml-25">({{ file.size }})</span>
              </div>
              <feather-icon class="cursor-pointer" icon="XIcon" size="14" @click="removeFile(index, validate)"/>
            </div>
          </div>
        </div>
        <div v-else-if="field.type==='password'">
          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
            <b-form-input v-model="entity[field.key]" :disabled="disabled" :type="passwordFieldType"
                          class="form-control-merge" :state="errors.length > 0 ? false:null" :name="field.key"
                          placeholder="Password" autocomplete="new-password"/>

            <b-input-group-append is-text>
              <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility"/>
            </b-input-group-append>
          </b-input-group>
          <div v-if="field.generate" class="mt-1">
            <b-button :disabled="disabled || waitPassword" size="sm" class="mr-2" @click="getRandomPassword(field.key)">
              Generate Password
              <b-spinner v-if="waitPassword" small/>
            </b-button>
            <span v-if="randomPassword && !disabled" class="mr-1">{{ randomPassword }}</span>
            <feather-icon v-if="randomPassword && !disabled" class="cursor-pointer" icon="CopyIcon" size="16"
                          @click="doCopy"/>
          </div>
        </div>
        <div v-else-if="field.type === 'color'">
          <b-form-input v-model="entity[field.key]" :disabled="disabled" type="color" style="width: 100px"
                        class="form-control-merge" :state="errors.length > 0 ? false:null" :name="field.key"/>
        </div>
        <template v-else-if="field.type === 'smiley'">
          <div class="mt-1 emoji_container">
            <input v-model="entity[field.key]" type="text" :disabled="disabled" class="mr-1">
            <b-button variant="outline-secondary" :disabled="disabled" size="sm" class="mr-2"
                      :class="{'emoji-button_empty': !entity[field.key]}" @click="handleEmojiClick">+
            </b-button>
            <div id="pickerContainer" :class="{'d-none': !isEmojiInputVisible}"/>
          </div>
        </template>
        <CustomDatePicker v-else-if="field.type === 'date-picker'" :start-date="entity.start_date"
                          :end-date="entity.end_date" @input-start-date="entity.start_date = $event"
                          @input-end-date="entity.end_date = $event"/>
        <flat-pickr v-else-if="field.type==='date'" v-model="entity[field.key]" :disabled="disabled"
                    :config="dateConfig" :state="errors.length > 0 ? false:null" :placeholder="field.key"
                    class="form-control"/>
        <b-form-checkbox v-else-if="field.type==='boolean'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :value="1" :unchecked-value="0"
                         style="margin-top: 5px"/>
        <b-input-group v-else class="w-100">
          <b-input-group-prepend v-if="field.unit && field.unit_key && field.isUnitOnLeft" class="w-20 bg-input">
            <validation-provider #default="{ errors }" :vid="field.unit_key" rules="required" :name="field.unit_key">

              <b-form-select v-model="entity[field.unit_key]" :placeholder="field.unit_key" :disabled="disabled"
                             :options="unitOptions" :loading="loading" :class="errors.length > 0 ? 'error':''"
                             :text-field="field.unit_label_key" :value-field="field.unit_value_key" class="w-100"/>
              <small v-for="(error,i) in errors" :key="i" class="text-danger">{{ error }}</small>
            </validation-provider>
          </b-input-group-prepend>
          <b-form-input v-model="entity[field.key]" :type="field.type==='decimal'?'number':(field.type||'text')"
                        :disabled="disabled" :step="field.type==='decimal'?0.01:1"
                        :state="errors.length > 0 ? false:null" :placeholder="field.key" class="w-80"/>
          <b-input-group-append v-if="field.unit && field.unit_key && !field.isUnitOnLeft" class="w-20 bg-input">
            <validation-provider #default="{ errors }" :vid="field.unit_key" rules="required" :name="field.unit_key">
              <b-form-select v-model="entity[field.unit_key]" :placeholder="field.unit_key" :disabled="disabled"
                             :options="unitOptions" :loading="loading" :class="errors.length > 0 ? 'error':''"
                             :text-field="field.unit_label_key" :value-field="field.unit_value_key" class="w-100"/>
              <small v-for="(error,i) in errors" :key="i" class="text-danger">{{ error }}</small>
            </validation-provider>

          </b-input-group-append>

        </b-input-group>
        <small v-for="(error,i) in errors" :key="i" class="text-danger">{{ error }}</small>
      </validation-provider>
      <template v-if="field.type==='list' && ((field.withNew && entity[field.key] === newValue) || field.alwaysNew)">
        <slot :subEntity="subEntity" :subTableDefinition="subTableDefinition" :subFormFields="subFormFields">
          <div :class="field.onlyForm?'':('mt-2 '+(inline ? '': 'ml-3'))">
            <component :is="subDefinition.fieldComponent" v-if="subDefinition.fieldComponent" ref="fieldComponent"
                       :entity="subEntity" :table-definition="subTableDefinition" :definition="subDefinition"
                       :form-fields="subFormFields" :disabled="disabled"/>
            <b-row v-else>
              <b-col v-for="(field,index) in subFormFields" :key="index" cols="12">
                <field ref="fields" :disabled="subFieldDisabled(field)" :inline="inline" :entity="subEntity"
                       :table-definition="subTableDefinition" :field="field"/>
              </b-col>
            </b-row>
          </div>
        </slot>
      </template>
    </b-form-group>
  </div>
</template>

<script>
import { snakeToTitle } from '@/libs/utils'
import Table from '@/table/index'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import Editor from '@tinymce/tinymce-vue'
import {
  BButton,
  BCol,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
  BImg,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import Fuse from 'fuse.js'
import { createPicker } from 'picmo'
import 'tinymce/skins/ui/oxide/skin.min.css'
import tinymce from 'tinymce/tinymce'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
// import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/themes/silver/theme'

import { getUserData } from '@/auth/utils'
import AutoCompleteInput from '@/components/AutoCompleteInput.vue'
import SelectedButtonList from '@/components/SelectedButtonList.vue'
import CustomDatePicker from '@/views/app/Generic/CustomDatePicker.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import _ from 'lodash'
import { mapGetters } from 'vuex'

function isEmpty(val) {
  return val === '' || val == null
}

function isTrue(val) {
  return !!val
}

export default {
  name: 'Field',
  components: {
    AutoCompleteInput,
    SelectedButtonList,
    CustomDatePicker,
    ckeditor: CKEditor.component,
    BFormInput,
    BFormSelect,
    BFormFile,
    BFormGroup,
    BImg,
    BFormTextarea,
    vSelect,
    flatPickr,
    BButton,
    BRow,
    BCol,
    BFormCheckbox,
    BSpinner,
    BInputGroupPrepend,
    BInputGroupAppend,
    editor: Editor,
  },
  mixins: [togglePasswordVisibility],
  props: ['entity', 'field', 'tableDefinition', 'inline', 'disabled', 'filterValue', 'table', 'definition', 'noLabel', 'create'],
  data() {
    return {
      subEntity: { [this.field.key]: this.entity[this.field.key], ...this.field.defaultEntity },
      subOriginalEntity: {},
      newValue: 'Create New Element',
      loading: false,
      promise: null,
      showAll: false,
      defaultLabelFunction: {
        address_id: option => `${option.city_zip || ''} - ${option.city_name || ''} - ${option.address_street || ''}`,
        invoice_id: option => `${option.invoice_id || ''} - ${option.invoice_number || ''} - ${option.invoice_date || ''}`,
        contactperson_id: option => `${option.contactperson_firstname} ${option.contactperson_lastname}`,
      },
      dateConfig: {
        allowInput: true,
        altInput: true,
        altFormat: this.field.time ? 'd.m.Y H:i:S' : 'd.m.Y',
        dateFormat: this.field.time ? 'Y-m-d H:i:S' : 'Y-m-d',
        enableTime: this.field.time === true,
        locale: {
          firstDayOfWeek: 1,
        },
        minDate: this.field.minDate,
        onReady(selectedDates, dateStr, instance) {
          instance.isOpen = true
        },
      },
      yesNoOptions: [
        {
          value: 1,
          label: 'Yes',
        },
        {
          value: 0,
          label: 'No',
        },
      ],
      files: [],
      unitOptions: [],
      customSelectOptions: [],
      randomPassword: '',
      editor: ClassicEditor,
      waitPassword: false,
      isEmojiInputVisible: false,
      editorInstance: null,
      disablePopupButton: false,
      isDisabled: false,
      nonCachedItems: [],
      listObserver: null,
      hasNext: false,
      query: '',
      tempData: [],
      requestPayload: {
        page: 1,
        per_page: 100_000,
      },
    }
  },
  computed: {
    per_page() {
      return this.field.customPagination?.per_page || this.requestPayload.per_page
    },
    list() {
      const list = this.field.noCache ? this.nonCachedItems : this.$store.getters['table/listCache'](this.field.entityList || this.field.list)
      let new_list = this.field.formatList?.(list) || list
      if (typeof new_list === 'object' && new_list.data) {
        new_list = new_list.data
      }
      if (this.$isAnExtern() && !this.field?.noAutoFill) {
        const user = getUserData()
        const userTeams = user?.team_id ?? []
        if (this.field.key === 'team_id') {
          new_list = new_list.filter(item => userTeams.includes(item.team_id))
        }
      }
      return new_list
    },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    selectDisabled() {
      return this.isDisabled || this.disabled || (this.field.filter_key && this.entity[this.field.filter_key] == null)
    },
    rules() {
      return this.getValidationRules(this.field)
    },
    visible() {
      return this.field.visible ? this.field.visible(this.entity, this) : true
    },
    listItems() {
      if (this.field.filter && typeof this.field.filter === 'function') {
        return this.list.filter(item => this.field.filter(item, this))
      }
      let new_list = this.list
      if (typeof new_list === 'object' && new_list.data) {
        new_list = new_list.data
      }
      if (this.field.orderByField) {
        new_list = new_list.toSorted((a, b) => a[this.field.orderByField].localeCompare(b[this.field.orderByField]))
      }

      if (!this.field.ids || this.field.ids.length === 0 || this.showAll) {
        const val = (this.filterValue || this.entity[this.field.filter_key])
        if (this.field.filter_key && val != null) {
          return new_list.filter(e => {
            if (Array.isArray(val)) {
              return val.includes(e[this.field.filter_key])
            }
            return e[this.field.filter_key] === val
          })
        }
        return new_list
      }
      return new_list.filter(item => this.field.ids.indexOf(item[this.field.key]) >= 0)
    },
    subDefinition() {
      const definition = { ...Table[this.field.definition || this.field.list] }
      if (this.field.withFields) definition.fields = [...definition.fields, ...this.field.withFields]
      return definition
    },
    subFormFields() {
      const excluded = (typeof this.field.without === 'string') ? [this.field.without] : (Array.isArray(this.field.without) ? this.field.without : [])
      return this.subDefinition.fields.filter(f => !f.hideOnForm && (this.create || !f.hideOnUpdate) && (!this.create || !f.hideOnCreate) && !f.auto && excluded.indexOf(f.key) === -1)
    },
    subTableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.field.list)
    },
    subPrimaryKey() {
      return this.subDefinition.primaryKey ?? this.subDefinition.fields.find(f => f.auto).key
    },
    hasNew() {
      return this.newValue === this.entity[this.field.key]
    },
    selectedValue() {
      return (this.field.type === 'list' || this.field.type === 'custom_list') ? this.list.find(e => e[this.field.key] === this.entity[this.field.key]) : this.entity[this.field.key]
    },
    selectedValues() {
      return (this.field.type === 'list' || this.field.type === 'custom_list') ? this.list.filter(e => this.entity[this.field.key]?.indexOf(e[this.field.key]) >= 0) : []
    },
    ...mapGetters('user', ['isUserExternClient', 'isUserExternPartner']),

  },
  watch: {
    randomPassword(newValue) {
      this.entity[this.field.key] = newValue
    },
    list: {
      handler() {
        this.onChange()
      },
      deep: true,
    },
    disabled(newValue) {
      if (this.editorInstance) {
        if (newValue) {
          this.editorInstance.hide()
        } else {
          this.editorInstance.show()
        }
      }
    },
    listItems: {
      handler(newValue) {
        if (this.field.withOptionAll) {
          newValue.unshift({ [this.field.listLabel]: 'All', [this.field.tableKey || this.field.key]: -1 })
          this.$set(this.entity, (this.field.tableKey || this.field.key), this.entity[this.field.tableKey || this.field.key] || -1)
        }
        return newValue
      },
      deep: true,
    },
    hasNext(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        this.listObserver.observe(this.$refs.load)
      }
    },
  },
  async created() {
    if ((this.field.type === 'list' || this.field.type === 'custom_list') && ((!this.field.filter_key || !!this.entity[this.field.filter_key]) || this.field.noFetchOnChange) && !this.field.onlyForm) {
      /**
       * @param notFetchOnInit Est une clé dans le fichier de configuration qui permet de spécifier si on doit faire un
       * chargement initial des données ou pas, lors du rendu du composant
       */
      if (!this.field.noFetchOnInit) {
        await this.fetchList()
      }
    } else if (this.field.type === 'boolean') {
      // set false as default value
      if (this.entity[this.field.key] == null) {
        this.$set(this.entity, this.field.key, this.field.default ? this.field.default : 0)
      }
    } else if (this.field.default) {
      if (this.entity[this.field.key] == null) this.$set(this.entity, this.field.key, this.field.default)
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.initializeValue()
    })
    // Ici on créé un observer pour le champs de type list
    if (this.field.type === 'list') {
      this.listObserver = new IntersectionObserver(this.listObserverCallBack)
    }

    if (this.field.type && this.field.type === 'html') {
      this.initEditor()
    }
    if (typeof this.field.change === 'function') {
      const change = this.field.change(this.entity, this)
      if (change) this.$set(this.entity, this.field.key, change)
      this.$watch('entity', () => {
        const change2 = this.field.change(this.entity, this)
        if (typeof (change2) !== 'undefined') this.$set(this.entity, this.field.key, change2)
      }, { deep: true })
    }
    if (typeof this.field.value === 'function') {
      this.$set(this.entity, this.field.key, this.field.value(this.entity, this))
      this.$watch('entity', () => {
        this.$set(this.entity, this.field.key, this.field.value(this.entity, this))
      }, { deep: true })
    } else if (this.field.value != null) {
      this.$set(this.entity, this.field.key, this.field.value)
    }
    this.$watch(`entity.${this.field.key}`, (newValue, oldValue) => {
      if (this.field.handleFieldChange && typeof this.field.handleFieldChange === 'function') {
        this.field.handleFieldChange(newValue, oldValue, this.entity, this)
      }
      this.onChange()
    })
    if (this.field.filter_key && !this.field.noFetchOnChange) {
      this.$watch(`entity.${this.field.filter_key}`, val => {
        if (val) this.fetchList(true)
      })
    }
    if (this.field.type === 'smiley') {
      // The picker must have a root element to insert itself into
      const rootElement = document.querySelector('#pickerContainer')

      // Create the picker
      const picker = createPicker({ rootElement })

      // The picker emits an event when an emoji is selected. Do with it as you will!
      picker.addEventListener('emoji:select', event => {
        console.log('Emoji selected:', event)
        this.$set(this.entity, this.field.key, event.emoji)
      })
    }

    if (this.field.unit) {
      this.unitOptions = this.field.unit(this)
      this.entity[this.field.unit_key] = this.entity[this.field.unit_key] || this.unitOptions[0][this.field.unit_value_key]
    }

    if (this.field.type === 'custom-select') {
      if (typeof this.field.items === 'function') {
        this.customSelectOptions = await this.field.items(this)
        this.$watch('entity', async () => {
          this.customSelectOptions = await this.field.items(this)
        }, { deep: true })
      } else {
        this.customSelectOptions = this.field.items
        this.$watch('field.items', value => {
          this.customSelectOptions = value
        })
      }
    }

    this._debounceSearch = _.debounce(async () => {
      await this.fetchList(true, this.query)
    }, 500)
  },

  beforeDestroy() {
    if (this.editorInstance) {
      this.editorInstance.destroy()
    }
  },
  methods: {
    dropdownShouldOpen(vueSelectInstance) {
      const { noDrop, open, mutableLoading } = vueSelectInstance
      return noDrop ? false : open && !mutableLoading
    },
    async onSearch(query, loading) {
      if (query.length >= 2) {
        loading(true)
        this.requestPayload.page = 1
        this.query = query
        await this._debounceSearch()
        loading(false)
      }
    },
    async onListOpen() {
      if (this.field.type === 'list' && this.hasNext) {
        await this.$nextTick()
        this.listObserver.observe(this.$refs.load)
      }
    },
    onListClose() {
      this.listObserver.disconnect()
    },
    async listObserverCallBack([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.requestPayload.page += 1
        await this.fetchList(true, this.query)
        await this.$nextTick()
        ul.scrollTop = scrollTop
      }
    },
    getOptionLabel(option) {
      if (typeof this.field.listLabel === 'function') {
        return this.field.listLabel(option)
      }
      return option[(typeof this.field.listLabel === 'string') ? this.field.listLabel : null]
    },
    initializeValue() {
      if (!this.field?.noAutoFill) {
        const user = getUserData()
        if (this.isUserExternClient || this.$isAnExtern()) {
          if (this.field.key === 'customergroup_id') {
            console.log('reset ', this.entity)
            const customergroup_id = user.customergroup?.customergroup_id
            if (!this.entity.customergroup_id && customergroup_id) {
              this.$set(this.entity, 'customergroup_id', customergroup_id)
            }
            if (this.entity.customergroup_id) {
              this.isDisabled = true
            }
          }
        }
        if (this.isUserExternPartner) {
          if (this.field.key === 'partnergroup_id') {
            const partnergroup_id = user.partnergroup?.partnergroup_id
            if (!this.entity.partnergroup_id && partnergroup_id) {
              this.$set(this.entity, 'partnergroup_id', partnergroup_id)
            }
            if (this.entity.partnergroup_id) {
              this.isDisabled = true
            }
          }
        }

        if (this.field.key === 'team_id') {
          if (this.$isAnExtern()) {
            this.isDisabled = true
            this.$set(this.entity, 'team_id', user?.team_id?.[0])
          }
        }
      }

      // eslint-disable-next-line no-unused-expressions
      this.field?.onInit?.(this)
    },
    SelectedButtonOptions(value, keyValue) {
      console.log('this is the value', value, keyValue)
      if (keyValue) this.entity[keyValue] = value
    },
    initEditor() {
      // Initialisation de TinyMCE
      tinymce.init({
        apiKey: process.env.VUE_APP_TINYMCE_API_KEY,
        selector: `#tinyEditor-${this.field.key}`,
        readonly: this.editorIsDisabled,
        plugins: [
          'advlist list',
          'media',
        ],
        toolbar:
          'undo redo | formatselect |'
          + 'bold italic backcolor | myCustomButton | alignleft aligncenter '
          + 'alignright alignjustify | bullist numlist outdent indent | '
          + 'removeformat | help',
        height: '400px',
        menubar: false,
        branding: false,
        resize: false,
        statusbar: false,
        content_css: [
          '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          '//www.tiny.cloud/css/codepen.min.css',
        ],
        setup: editor => {
          this.editorInstance = editor
          editor.on('input', e => {
            const content = editor.getContent()
            this.entity[this.field.key] = content
          })
          editor.ui.registry.addButton('myCustomButton', {
            text: 'Separator',
            onAction: () => {
              const nonEditableContent = '<span contenteditable="false"><strong>Separator</strong></span>'
              editor.insertContent(nonEditableContent)
              this.$set(this.entity, this.field.key, editor.getContent())
            },
          })
        },
      })
    },
    destroyEditor() {
      if (this.editorInstance) {
        this.editorInstance.hide()
      }
    },
    subFieldDisabled(field) {
      if (this.field.disabled && this.field.disabled.includes(field.name)) {
        return true
      }
      return this.disabled
    },
    getFileThumbnail(fileType) {
      if (fileType === 'application/pdf') {
        return require('@/assets/images/icons/file-icons/pdf2.png')
      }
      if (
        fileType
        === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || fileType === 'application/vnd.ms-excel'
        || fileType === 'application/vnd.oasis.opendocument.spreadsheet'
      ) {
        return require('@/assets/images/icons/file-icons/xls.png')
      }
      return require('@/assets/images/icons/file-icons/doc.png')
    },
    async updateFilesData(event, validate) {
      const selectedFiles = event.target.files

      // ensure that the selected file doesn't exit in the files data
      let index = -1
      for (const file in selectedFiles) {
        if (Object.hasOwnProperty.call(selectedFiles, file)) {
          index = this.files.findIndex(
            elt => elt.name === selectedFiles[file].name
              && elt.size === selectedFiles[file].size,
          )
          if (index === -1) {
            this.files.push(selectedFiles[file])
            // console.log('this.files: ', this.files)
          }
        }
      }
      await validate(this.files)
      this.formatFileInputNames()
    },
    async removeFile(index, validate) {
      if (index !== -1) {
        this.files.splice(index, 1)
        if (this.files && this.files.length === 0) this.$refs.file.reset()
      }
      this.formatFileInputNames()
      await validate(this.files)
    },
    formatFileInputNames() {
      return this.files.length === 1 ? this.files[0].name : `${this.files.length} files selected`
    },
    getFiles() {
      if (this.field.multiple) return this.files
      return this.$refs.file.files
    },
    reset() {
      if (this.field.type === 'boolean') {
        // set false as default value
        this.$set(this.entity, this.field.key, 0)
      } else if (this.field.default) {
        this.$set(this.entity, this.field.key, this.field.default)
      } else {
        this.$set(this.entity, this.field.key, null)
      }
      (this.getSubFields() || []).forEach(sub => sub.reset())
    },
    async getRandomPassword() {
      const accessToken = localStorage.getItem('accessToken').split(' ')[1]
      this.waitPassword = true
      await this.$http.get(`/users/generate/password/?Authorization=${accessToken}`)
        .then(resp => {
          this.randomPassword = resp.data.password
          this.waitPassword = false
        })
        .catch(() => {
          this.$errorToast('Error')
          this.waitPassword = false
        })
    },

    doCopy() {
      if (this.entity[this.field.key]) {
        try {
          navigator.clipboard.writeText(this.entity[this.field.key])
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Password copied',
              icon: 'BellIcon',
              variant: 'success',
            },
          })
        } catch (error) {
          console.log('error: ', error)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Can not copy!',
              icon: 'BellIcon',
            },
          })
        }
      }
    },
    getPrimaryKey(definition) {
      return definition.primaryKey ?? definition.fields.find(f => f.auto).key
    },
    handleEmojiClick() {
      this.isEmojiInputVisible = !this.isEmojiInputVisible
    },
    async getRelationValue() {
      console.log('get relation value')
      if (this.field.type === 'list' || this.field.type === 'custom_list') {
        if (this.entity[this.field.key] == null) {
          const primaryKey = this.getPrimaryKey(this.definition)
          await this.$api({
            entity: this.field.relationEntity ?? (`${this.table}_${this.field.list}_rel`),
            action: 'read-rich',
            data: [{
              [primaryKey]: `${this.entity[primaryKey]}`,
            }],
          })
            .then(({ data }) => {
              const result = data.data.data[0]
              if (!result) return null
              this.$set(this.entity, this.field.key, result[this.field.key])
              // this.$set(originalEntity, field.key, result[field.key])
              if (this.field.with) {
                (typeof this.field.with === 'string' ? [this.field.with] : this.field.with).forEach(val => {
                  this.$set(this.entity, val, result[val])
                })
              }
              return result[this.field.key]
            })
        }
        if (this.field.alwaysNew) {
          this.getFormFields(this.subDefinition)
            .forEach(field => {
              if (this.entity[field.key]) this.subEntity[field.key] = this.entity[field.key]
            })
          this.getSubFields()
            .forEach(field => {
              field.getRelationValue()
            })
        }
      }
    },
    fuseSearch(options, search) {
      const keys = [this.field.key]
      if (typeof this.field.listLabel === 'string') {
        keys.push(this.field.listLabel)
      } else {
        // try to guess name field
        keys.push(this.field.key.replace('_id', '_name'))
      }
      const fuse = new Fuse(options, {
        keys,
        shouldSort: true,
        threshold: 0.1,
      })
      return search.length
        ? fuse.search(search)
          .map(({ item }) => item)
        : fuse.list
    },
    getSubFields() {
      if (this.subDefinition.fieldComponent) {
        return this.getAllFields(this.$refs.fieldComponent.$children, [])
      }
      return this.$refs.fields || this.$children[0].$children.filter(c => c.$options.name === 'Field')
    },
    getAllFields(fieldComponent, accumulator) {
      // fieldComponent is an array
      if (fieldComponent.length && fieldComponent.length > 1) {
        fieldComponent.forEach(elt => {
          if (elt.$options.name === 'Field') {
            accumulator.push(elt)
          } else {
            return this.getAllFields(elt.$children, accumulator)
          }
        })
        return accumulator
      } // fieldComponent is a VueComponent

      if (fieldComponent.$options.name === 'Field') {
        accumulator.push(fieldComponent)
        return accumulator
      }
      return accumulator
    },
    fixForMore() {
      if (this.loading) return
      this.fetchList(true, this.query)
    },
    async fetchList(force, query = null) {
      if (this.field.noFetch) return
      if (this.list.length === 0 || force) this.loading = true
      try {
        let { list } = this.field
        if (list === 'address') {
          list = this.subDefinition.entity
          await this.$store.dispatch('table/fetchTableDefinition', 'address')
          await this.$store.dispatch('table/fetchTableDefinition', 'city')
        }
        let payload = { entity: this.field.entityList || list }
        if (this.field.entityCustomEndPoint) payload.customEnpoint = typeof this.field.entityCustomEndPoint === 'string' ? this.field.entityCustomEndPoint : this.field.entityCustomEndPoint(this)
        if (this.field.onlyForm && this.entity[this.field.key]) {
          payload.data = [{ [this.field.key]: this.entity[this.field.key] }]
        }
        if (this.field.filter_key) {
          const value = this.entity[this.field.filter_key]
          if (value && ![null, -1, undefined].includes(value)) {
            if (Array.isArray(value)) {
              if (value.length > 0) {
                if (this.field.entityCustomEndPoint) {
                  payload.data = [{ [this.field.filter_key]: value, ...this.field.customFilter }]
                } else {
                  payload.data = value.map(v => ({ [this.field.filter_key]: v, ...this.field.customFilter }))
                }
              }
            } else {
              payload.data = [{ [this.field.filter_key]: this.entity[this.field.filter_key], ...this.field.customFilter }]
            }
          }
        }
        if (this.field.customPagination) {
          if (this.field.customPagination.data && Array.isArray(this.field.customPagination.data)) {
            if (payload?.data) {
              payload.data.push(...this.field.customPagination.data)
            } else {
              payload.data = [...this.field.customPagination.data]
            }
          }
        }

        payload = {
          ...payload,
          ...this.requestPayload,
          per_page: this.per_page,
          ...(query && { keyword: query }),
          getWholeResponse: true,
          uniqueKey: this.field.key,
        }

        const response = await this.$store.dispatch('table/fetchList', payload)
        let newData = []
        if (this.field.entityCustomEndPoint) {
          newData = this.field.useWholeResponse ? response : response.data
          if (typeof newData === 'object' && newData.data) {
            newData = newData.data
          }
          this.hasNext = response.current_page < response.pages
          console.log({ response }, this.field.useWholeResponse, this.hasNext)
        } else {
          const { links, data } = response
          newData = data
          const { pagination } = links
          this.hasNext = pagination.current_page < pagination.last_page
        }

        if (payload.page > 1) {
          this.nonCachedItems.push(...newData)
        } else {
          this.nonCachedItems = newData
        }

        if (this.field.entityList) {
          await this.$store.dispatch('table/fetchTableDefinition', list)
        }
      } catch (e) {
        console.error(e)
        this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
      } finally {
        this.loading = false
      }
    },
    getValidationRules(field) {
      let definition = this.tableDefinition
      if (field.fromTable) {
        definition = this.$store.getters['table/tableDefinition'](field.fromTable)
      }
      return {
        required: this.getFieldRequiredValue(),
        email: this.field.type === 'email',
        ...(definition ? {
          max: (definition.attribute_datatype_len && definition.attribute_datatype_len[field.key]) || false,
          regex: (definition.attribute_regexp && definition.attribute_regexp[field.key]) || false,
        } : {}),
        ...(this.field.rules || {}),
      }
    },
    getFieldRequiredValue() {
      if (this.field.alwaysNew) return false
      if (this.field.mandatoryIfListEmpty && this.listItems.length === 0) return false
      if (this.field.required_if_null) return isEmpty(this.entity[this.field.required_if_null])
      if (this.field.required_if_true) return isTrue(this.entity[this.field.required_if_true])
      return this.field.required !== false
    },
    snakeToTitle,
    showNewForm() {
      this.$set(this.entity, this.field.key, this.newValue)
    },
    showNewPopupForm() {
      const self = this
      this.disablePopupButton = true
      const popupWindow = window.open(`/app/table/${this.$route.params.table}/popup/${this.field.list}`, 'Formpopup', 'popup')
      popupWindow.addEventListener('beforeunload', () => {
        // Réactivez le bouton ici
        self.disablePopupButton = false
      })
      window.addEventListener('message', async event => {
        // Vérifiez l'origine de l'événement pour des raisons de sécurité
        if (event.origin === window.location.origin && event.data.message === 'success') {
          // Réactivez le bouton ici
          self.disablePopupButton = false
          await self.fetchList(true)
        }
      })
    },
    onChange() {
      if (this.field.alwaysNew) {
        if (this.selectedValue) {
          const originalInitialized = this.subOriginalEntity.__initialized
          // selected value is unique
          if (this.field.onlyForm && this.$parent.$parent.isRelation) {
            this.subFormFields.forEach(field => {
              // make sur that field that are not in the table are not cleared
              if (!this.subEntity[field.key]) this.$set(this.subEntity, field.key, this.selectedValue[field.key])
              if (!this.subOriginalEntity[field.key]) this.$set(this.subOriginalEntity, field.key, this.selectedValue[field.key])
            })
            return
          }
          // selected value can change
          this.subFormFields.forEach(field => {
            this.$set(this.subEntity, field.key, this.selectedValue[field.key])
            // set original value
            if (!originalInitialized) this.$set(this.subOriginalEntity, field.key, this.selectedValue[field.key])
          })
          this.subOriginalEntity.__initialized = true
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables/variables';

.emoji_container {
  position: relative;

  #pickerContainer {
    position: absolute;
    z-index: 100;
  }
}

.emoji-button_empty {
  height: 25px;
  width: 20px;
}

.hide-main {
  > label {
    display: none !important;
  }

  > div > span {
    display: none;
  }
}

.message-editor table {
  td, th {
    border: 1px solid #ccc;
    padding: 2px;
  }
}

.multiple_select.vs--disabled span.vs__selected {
  background-color: #D51130 !important;
}

.bg-input {
  background-color: #e9ecef;
  color: #495057
}

.custom_rounded_button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #eee;

  svg {
    fill: $primary;
    stroke: $primary;
  }

}

.loader {
  text-align: center;
  color: #bbbbbb;
  padding: .5rem;
}

.ml5 {
  margin-left: .5rem;
}
</style>
