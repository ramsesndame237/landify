<template>
  <div>
    <b-form-group v-if="visible" :label="field.label||snakeToTitle(field.key)" :label-for="'field-'+field.key"
                  :class="field.onlyForm?'hide-main':''" :label-cols-md="inline?4:null">
      <b-form-input v-if="field.auto" v-model="entity[field.key]" disabled placeholder="Automaticaly generated ..."/>
      <validation-provider v-else #default="{ errors }" :rules="getValidationRules(field)" :name="field.key"
                           :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message&& tableDefinition.attribute_regexp_failure_message[field.key]}">
        <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
        <div v-else-if="field.type==='list'" :class="(field.withNew || field.ids) ? 'd-flex': ''">
          <v-select v-model="entity[field.key]" :disabled="disabled" :state="errors.length > 0 ? false:null"
                    :get-option-label="defaultLabelFunction[field.key]||(option=> option[field.listLabel])"
                    :placeholder="field.key" :options="listItems" transition="" :label="field.listLabel" class="w-100"
                    :loading="loading" :reduce="i => i[field.tableKey||field.key]" :filter="fuseSearch"
                    @input="onChange"/>
          <b-button v-if="field.withNew && !field.alwaysNew && !disabled" class="ml-2 text-nowrap" variant="info"
                    @click="showNewForm">New
          </b-button>
          <b-button v-if="field.ids" class="ml-2 text-nowrap" variant="info" @click="showAll=!showAll">
            {{ showAll ? 'Show Created' : 'Show All' }}
          </b-button>
        </div>
        <flat-pickr v-else-if="field.type==='date'" v-model="entity[field.key]" :disabled="disabled"
                    :config="dateConfig" :state="errors.length > 0 ? false:null" :placeholder="field.key"
                    class="form-control"/>
        <b-form-checkbox v-else-if="field.type==='boolean'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key" value="1" unchecked-value="0"
                         style="margin-top: 5px"/>
        <b-form-input v-else v-model="entity[field.key]" :type="field.type||'text'" :disabled="disabled"
                      :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
        <small v-for="(error,i) in errors" :key="i" class="text-danger">{{ error }}</small>
      </validation-provider>
      <template v-if="field.type==='list' && ((field.withNew && entity[field.key] === newValue) || field.alwaysNew)">
        <slot :subEntity="subEntity" :subTableDefinition="subTableDefinition" :subFormFields="subFormFields">
          <div :class="field.onlyForm?'':('mt-2 '+(inline ? '': 'ml-3'))">
            <component :is="subDefinition.fieldComponent" v-if="subDefinition.fieldComponent" ref="fieldComponent"
                       :entity="subEntity" :table-definition="subTableDefinition" :definition="subDefinition"
                       :disabled="disabled"/>
            <b-row v-else>
              <b-col v-for="(field,index) in subFormFields" :key="index" cols="12">
                <field ref="fields" :disabled="disabled" :inline="inline" :entity="subEntity"
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
import Fuse from 'fuse.js'
import {
  BButton, BCol, BFormCheckbox, BFormGroup, BFormInput, BFormTextarea, BRow,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { snakeToTitle } from '@/libs/utils'
import Table from '@/table/index'

export default {
  name: 'Field',
  components: {
    BFormInput, BFormGroup, BFormTextarea, vSelect, flatPickr, BButton, BRow, BCol, BFormCheckbox,
  },
  props: ['entity', 'field', 'tableDefinition', 'inline', 'disabled', 'filterValue'],
  data() {
    return {
      list: this.$store.state.table.listCache[this.field.list] || [],
      subEntity: {},
      newValue: 'Create New Element',
      loading: false,
      promise: null,
      showAll: false,
      defaultLabelFunction: {
        address_id: option => `${option.city_zip || ''} - ${option.city_name || ''} - ${option.address_street || ''}`,
      },
      dateConfig: {
        allowInput: true,
      },
    }
  },
  computed: {
    visible() {
      return this.field.visible ? this.field.visible(this.entity) : true
    },
    listItems() {
      if (!this.field.ids || this.field.ids.length === 0 || this.showAll) {
        if (this.field.filter_key && this.filterValue) {
          console.log('filter with value', this.filterValue)
          return this.list.filter(e => e[this.field.filter_key] === this.filterValue)
        }
        return this.list
      }
      return this.list.filter(item => this.field.ids.indexOf(item[this.field.key]) >= 0)
    },
    subDefinition() {
      const definition = { ...Table[this.field.list] }
      if (this.field.withFields) definition.fields = [...definition.fields, ...this.field.withFields]
      return definition
    },
    subFormFields() {
      const excluded = (typeof this.field.without === 'string') ? [this.field.without] : (Array.isArray(this.field.without) ? this.field.without : [])
      return this.subDefinition.fields.filter(f => !f.hideOnForm && !f.auto && excluded.indexOf(f.key) === -1)
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
  },
  watch: {
    list() {
      this.onChange()
    },
  },
  async created() {
    if (this.field.type === 'list') {
      await this.fetchList()
    } else if (this.field.type === 'boolean') {
      // set false as default value
      if (this.entity[this.field.key] == null) this.entity[this.field.key] = 0
    }
  },
  beforeDestroy() {
    if (this.promise) {
      Promise.resolve()
    }
  },
  mounted() {
    this.$watch(`entity.${this.field.key}`, () => {
      this.onChange()
    })
  },
  methods: {
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
      console.log(this.$refs)
      if (this.subDefinition.fieldComponent) {
        return this.$refs.fieldComponent.$children.filter(c => c.$options.name === 'Field')
      }
      return this.$refs.fields || this.$children[0].$children.filter(c => c.$options.name === 'Field')
    },
    async fetchList() {
      if (this.list.length === 0) this.loading = true
      let { list } = this.field
      if (list === 'address') {
        list = this.subDefinition.entity
        await this.$store.dispatch('table/fetchTableDefinition', 'address')
        await this.$store.dispatch('table/fetchTableDefinition', 'city')
      }
      this.list = await this.$store.dispatch('table/fetchList', this.field.entityList || list)
      if (this.field.entityList) {
        await this.$store.dispatch('table/fetchTableDefinition', list)
      }
      this.loading = false
    },
    getValidationRules(field) {
      let definition = this.tableDefinition
      if (field.fromTable) {
        definition = this.$store.getters['table/tableDefinition'](field.fromTable)
      }
      if (!definition) return {}
      return {
        required: this.field.alwaysNew ? false : (this.field.required !== false),
        email: this.field.type === 'email',
        max: (definition.attribute_datatype_len && definition.attribute_datatype_len[field.key]) || false,
        regex: (definition.attribute_regexp && definition.attribute_regexp[field.key]) || false,
        ...(this.field.rules || {}),
      }
    },
    snakeToTitle,
    showNewForm() {
      console.log('click on new')
      this.$set(this.entity, this.field.key, this.newValue)
    },
    onChange() {
      console.log('change')
      if (this.field.alwaysNew) {
        if (this.selectedValue) {
          this.subFormFields.forEach(field => {
            this.$set(this.subEntity, field.key, this.selectedValue[field.key])
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">

.hide-main {
  > label {
    display: none !important;
  }

  > div > span {
    display: none;
  }
}
</style>
