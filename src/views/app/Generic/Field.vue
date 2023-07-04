<template>
  <div>
    <b-form-group v-if="visible" :label=" (field.noLabel|| noLabel) ? '' : $t(field.label||'attribute.'+field.key)"
                  :label-for="'field-'+field.key" :class="field.onlyForm?'hide-main':''" :label-cols-md="inline?4:null"
    >
      <b-form-input v-if="field.auto" v-model="entity[field.key]" disabled
                    :placeholder="$t('attribute.general_automaticid')"
      />
      <validation-provider v-else #default="{ errors, validate }" :rules="rules" :name="field.key"
                           :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message&& tableDefinition.attribute_regexp_failure_message[field.key]}"
      >
        <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key"
        />
        <div v-else-if="field.type==='html'" class="message-editor">
          <template v-if="disabled">
            <div class="p-1 border rounded" v-html="entity[field.key]" />
          </template>
          <ckeditor v-else :id="'ckcontent-'+field.key" v-model="entity[field.key]" :disabled="disabled"
                    :editor="editor" :config="editorOption"
          />
        </div>
        <div v-else-if="field.type==='list'" :class="(field.withNew || field.withPopup || field.ids) ? 'd-flex': ''">
          <v-select v-model="entity[field.key]" :dropdown-should-open="true" :disabled="selectDisabled"
                    :class="errors.length > 0 ? 'error':''"
                    :get-option-label="(typeof field.listLabel === 'function') ? field.listLabel : (defaultLabelFunction[field.key]||(option=> option[field.listLabel]))"
                    :placeholder="field.key" :multiple="field.multiple && create" :options="listItems" transition=""
                    :label="(typeof field.listLabel === 'string') ? field.listLabel: null" class="w-100"
                    :loading="loading" :reduce="i => i[field.tableKey||field.key]" :filter="fuseSearch"
                    @input="onChange"
          />
          <b-button v-if="field.withNew && !field.alwaysNew && !disabled" class="ml-2 text-nowrap" variant="info"
                    @click="showNewForm"
          >New
        </b-button>
        <b-button v-if="field.withPopup && !field.alwaysNew && !disabled" class="ml-2 text-nowrap" variant="info"
                  @click="showNewPopupForm" :disabled="disablePopupButton"
        >New
        </b-button>

          <b-button v-if="field.ids && !field.noShowButton" class="ml-2 text-nowrap" variant="info"
                    @click="showAll=!showAll"
          >
            {{ showAll ? 'Show Created' : 'Show All' }}
          </b-button>
        </div>
        <div v-else-if="field.type==='yesno' || field.type==='custom-select'">
          <v-select v-model="entity[field.key]" :disabled="disabled" :state="errors.length > 0 ? false:null"
                    :multiple="field.multiple" :placeholder="field.key"
                    :options="field.type==='yesno'?yesNoOptions: field.items" transition="" label="label" class="w-100"
                    :reduce="i => i.value"
          />
        </div>
        <div v-else-if="field.type==='checkbox'">
          <b-form-checkbox-group v-model="entity[field.key]" :disabled="disabled"
                                 :state="errors.length > 0 ? false:null" :placeholder="field.key" text-field="label"
                                 :options="field.items"
          />
        </div>
        <div v-else-if="field.type==='file'">
          <b-form-file ref="file" type="file" placeholder="Choose a file or drop it here..."
                       drop-placeholder="Drop file here..." :multiple="field.multiple" required
                       @change="validate($event);updateFilesData($event)"
          />
          <div class="d-flex flex-column mt-2">
            <div v-for="(file, index) in files" :key="index" class="d-flex justify-content-between mb-1">
              <div>
                <b-img :src="getFileThumbnail(file.type)" width="16px" class="mr-50" />
                <span class="text-muted font-weight-bolder align-text-top">{{
                  file.name
                }}</span>
                <span class="text-muted font-small-2 ml-25">({{ file.size }})</span>
              </div>
              <feather-icon class="cursor-pointer" icon="XIcon" size="14" @click="removeFile(index)" />
            </div>
          </div>
        </div>
        <div v-else-if="field.type==='password'">
          <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
            <b-form-input v-model="entity[field.key]" :disabled="disabled" :type="passwordFieldType"
                          class="form-control-merge" :state="errors.length > 0 ? false:null" :name="field.key"
                          placeholder="Password" autocomplete="new-password"
            />

            <b-input-group-append is-text>
              <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
            </b-input-group-append>
          </b-input-group>
          <div v-if="field.generate" class="mt-1">
            <b-button :disabled="disabled || waitPassword" size="sm" class="mr-2" @click="getRandomPassword(field.key)">
              Generate Password
              <b-spinner v-if="waitPassword" small />
            </b-button>
            <span v-if="randomPassword && !disabled" class="mr-1">{{ randomPassword }}</span>
            <feather-icon v-if="randomPassword && !disabled" class="cursor-pointer" icon="CopyIcon" size="16"
                          @click="doCopy"
            />
          </div>
        </div>
        <div v-else-if="field.type === 'color'">
          <b-form-input v-model="entity[field.key]" :disabled="disabled" type="color" style="width: 100px"
                        class="form-control-merge" :state="errors.length > 0 ? false:null" :name="field.key"
          />
        </div>
        <template v-else-if="field.type === 'smiley'">
          <div class="mt-1 emoji_container">
            <input v-model="entity[field.key]" type="text" :disabled="disabled" class="mr-1">
            <b-button variant="outline-secondary" :disabled="disabled" size="sm" class="mr-2" :class="{'emoji-button_empty': !entity[field.key]}"
                      @click="handleEmojiClick"
            >+
            </b-button>
            <div id="pickerContainer" :class="{'d-none': !isEmojiInputVisible}" />
          </div>
        </template>
        <flat-pickr v-else-if="field.type==='date'" v-model="entity[field.key]" :disabled="disabled"
                    :config="dateConfig" :state="errors.length > 0 ? false:null" :placeholder="field.key"
                    class="form-control"
        />
        <b-form-checkbox v-else-if="field.type==='boolean'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key" :value="1"
                         :unchecked-value="0" style="margin-top: 5px"/>
        <b-input-group v-else class="w-100">
          <b-input-group-prepend v-if="field.unit && field.unit_key && field.isUnitOnLeft" class="w-20">
            <validation-provider :vid="field.unit_key" #default="{ errors }" rules="required" :name="field.unit_key">

              <v-select :dropdown-should-open="true"
                      :placeholder="field.unit_key" :disabled="disabled"  :options="unitOptions"
                      :loading="loading" :class="errors.length > 0 ? 'error':''"
                      v-model="entity[field.unit_key]" class="w-100"
              />
              <small v-for="(error,i) in errors" :key="i" class="text-danger">{{ error }}</small>
            </validation-provider>
          </b-input-group-prepend>
          <b-form-input v-model="entity[field.key]" :type="field.type==='decimal'?'number':(field.type||'text')"
            :disabled="disabled" :step="field.type==='decimal'?0.01:1" :state="errors.length > 0 ? false:null"
            :placeholder="field.key" class="w-80"
          />
          <b-input-group-append  v-if="field.unit && field.unit_key && !field.isUnitOnLeft" class="w-20">
            <validation-provider :vid="field.unit_key" #default="{ errors }" rules="required" :name="field.unit_key">
              <v-select :dropdown-should-open="true"
                      :placeholder="field.unit_key" :disabled="disabled"  :options="unitOptions"
                      :loading="loading" :class="errors.length > 0 ? 'error':''"
                      v-model="entity[field.unit_key]" class="w-100"
              />
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
                       :form-fields="subFormFields" :disabled="disabled"
            />
            <b-row v-else>
              <b-col v-for="(field,index) in subFormFields" :key="index" cols="12">
                <field ref="fields" :disabled="subFieldDisabled(field)" :inline="inline" :entity="subEntity"
                       :table-definition="subTableDefinition" :field="field"
                />
              </b-col>
            </b-row>
          </div>
        </slot>
      </template>
    </b-form-group>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import { createPicker } from 'picmo'
import {
  BButton, BImg, BFormFile, BCol, BFormCheckbox, BFormGroup, BFormInput, BFormTextarea, BRow, BSpinner, BInputGroupPrepend, BInputGroupAppend
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { snakeToTitle } from '@/libs/utils'
import Table from '@/table/index'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

function isEmpty(val) {
  return val === '' || val == null
}

function isTrue(val) {
  return !!val
}

export default {
  name: 'Field',
  components: {
    ckeditor: CKEditor.component,
    BFormInput,
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
    BInputGroupAppend
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
      },
      yesNoOptions: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ],
      files: [],
      unitOptions: [],
      randomPassword: '',
      editor: ClassicEditor,
      waitPassword: false,
      isEmojiInputVisible: false,
      editorOption: {
        // modules: {
        //   toolbar: '#quill-toolbar-' + this.field.key,
        // },
        // placeholder: 'Type Text Here...',
      },
      disablePopupButton: false,
    }
  },
  computed: {
    list() {
      return this.$store.getters['table/listCache'](this.field.entityList || this.field.list)
    },
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    selectDisabled() {
      return this.disabled || (this.field.filter_key && this.entity[this.field.filter_key] == null)
    },
    rules() {
      return this.getValidationRules(this.field)
    },
    visible() {
      return this.field.visible ? this.field.visible(this.entity, this) : true
    },
    listItems() {
      if (this.field.filter && typeof this.field.filter === 'function') {
        return this.list.filter(this.field.filter)
      }
      if (!this.field.ids || this.field.ids.length === 0 || this.showAll) {
        const val = (this.filterValue || this.entity[this.field.filter_key])
        if (this.field.filter_key && val != null) {
          console.log('filter with value', val)
          return this.list.filter(e => e[this.field.filter_key] === val)
        }
        return this.list
      }
      return this.list.filter(item => this.field.ids.indexOf(item[this.field.key]) >= 0)
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
      return this.field.type === 'list' ? this.list.find(e => e[this.field.key] === this.entity[this.field.key]) : this.entity[this.field.key]
    },
    selectedValues() {
      return this.field.type === 'list' ? this.list.filter(e => this.entity[this.field.key].indexOf(e[this.field.key]) >= 0) : []
    },

  },
  watch: {
    randomPassword(newValue) {
      this.entity[this.field.key] = newValue
    },
    list() {
      this.onChange()
    },
  },
  async created() {
    if (this.field.type === 'list' && ((!this.field.filter_key || !!this.entity[this.field.filter_key]) || this.field.noFetchOnChange) && !this.field.onlyForm) {
      await this.fetchList()
    } else if (this.field.type === 'boolean') {
      // set false as default value
      if (this.entity[this.field.key] == null) this.$set(this.entity, this.field.key, 0)
    } else if (this.field.default) {
      if (this.entity[this.field.key] == null) this.$set(this.entity, this.field.key, this.field.default)
    }
  },
  beforeDestroy() {
    if (this.promise) {
      Promise.resolve()
    }
  },
  mounted() {
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
    this.$watch(`entity.${this.field.key}`, () => {
      this.onChange()
    })
    if (this.field.filter_key && !this.field.noFetchOnChange) {
      this.$watch(`entity.${this.field.filter_key}`, () => {
        this.fetchList(true)
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
      this.entity[this.field.unit_key] = this.unitOptions[0]
    }

  },
  methods: {
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
    updateFilesData(event) {
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
    },
    removeFile(index) {
      if (index !== -1) this.files.splice(index, 1)
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
      this.waitPassword = true
      await this.$http.get('/users/generate/password')
        .then(resp => {
          this.randomPassword = resp.data.password
          this.waitPassword = false
        })
        .catch(e => {
          this.$errorToast('Error')
          this.waitPassword = false
        })
    },
    doCopy() {
      if (this.entity[this.field.key]){
        try {
          navigator.clipboard.writeText(this.entity[this.field.key])
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Password copied',
              icon: 'BellIcon',
              variant: 'success'
            },
          })
        } catch (error) {
          console.log('error: ', error);
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
      if (this.field.type === 'list') {
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
          this.getFormFields(this.subDefinition).forEach(field => {
            if (this.entity[field.key]) this.subEntity[field.key] = this.entity[field.key]
          })
          this.getSubFields().forEach(field => {
            field.getRelationValue()
          })
        }
      }
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: this.list[0] ? Object.keys(this.list[0]) : [],
        shouldSort: true,
      })
      return search.length
        ? fuse.search(search).map(({ item }) => item)
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

      if (elt.$options.name === 'Field') {
        accumulator.push(fieldComponent)
        return accumulator
      }
      return accumulator
    },
    async fetchList(force) {
      if (this.field.noFetch) return
      if (this.list.length === 0 || force) this.loading = true
      try {
        let { list } = this.field
        if (list === 'address') {
          list = this.subDefinition.entity
          await this.$store.dispatch('table/fetchTableDefinition', 'address')
          await this.$store.dispatch('table/fetchTableDefinition', 'city')
        }
        const payload = { entity: this.field.entityList || list }
        if (this.field.entityCustomEndPoint) payload.customEnpoint = this.field.entityCustomEndPoint
        if (this.field.onlyForm && this.entity[this.field.key]) {
          payload.data = [{ [this.field.key]: this.entity[this.field.key] }]
        }
        if (this.field.filter_key && this.entity[this.field.filter_key]) {
          payload.data = [{ [this.field.filter_key]: this.entity[this.field.filter_key] }]
        }
        await this.$store.dispatch('table/fetchList', payload)
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
      console.log('click on new')
      this.$set(this.entity, this.field.key, this.newValue)
    },
     showNewPopupForm(){
      const self = this;
      this.disablePopupButton = true;
      const popupWindow = window.open("/app/table/"+this.$route.params.table+"/popup/"+this.field.list,"Formpopup","popup")
      popupWindow.addEventListener('beforeunload', function() {
        // Réactivez le bouton ici
        self.disablePopupButton = false;
      });
      window.addEventListener('message', async function(event) {
        // Vérifiez l'origine de l'événement pour des raisons de sécurité
        if (event.origin === window.location.origin && event.data.message === "success")  {
           // Réactivez le bouton ici
          self.disablePopupButton = false;
          await self.fetchList(true)
        }
      });
    },
    onChange() {
      console.log('change')
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
</style>
