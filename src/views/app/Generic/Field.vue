<template>
  <div>
    <b-form-group :label="field.label||snakeToTitle(field.key)" :label-for="'field-'+field.key"
                  :label-cols-md="inline?4:null">
      <b-form-input v-if="field.auto" v-model="entity[field.key]" disabled
                    placeholder="Automaticaly generated ..."></b-form-input>
      <validation-provider v-else #default="{ errors }" :rules="getValidationRules(field)" :name="field.key"
                           :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message[field.key]}">
        <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
        <div v-else-if="field.type==='list'" :class="field.withNew ? 'd-flex': ''">
          <v-select v-model="entity[field.key]" :disabled="disabled" :state="errors.length > 0 ? false:null"
                    :placeholder="field.key" :options="list" transition="" :label="field.listLabel" class="w-100"
                    :loading="loading" :reduce="i => i[field.key]" @input="onChange"/>
          <b-button class="ml-2" v-if="field.withNew && !field.alwaysNew && !disabled" variant="info"
                    @click="showNewForm">New
          </b-button>
        </div>
        <flat-pickr v-else-if="field.type==='date'" v-model="entity[field.key]" :disabled="disabled"
                    :state="errors.length > 0 ? false:null" :placeholder="field.key" class="form-control"/>
        <b-form-checkbox v-else-if="field.type==='boolean'" v-model="entity[field.key]" :disabled="disabled"
                         :state="errors.length > 0 ? false:null" :placeholder="field.key" value="1" unchecked-value="0"
                         style="margin-top: 5px"/>
        <b-form-input v-else v-model="entity[field.key]" :type="field.type||'text'" :disabled="disabled"
                      :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
      <div v-if="field.type==='list' && ((field.withNew && entity[field.key] === newValue) || field.alwaysNew)"
           class="mt-2" :class="inline?'':'ml-3'">
        <component :is="subDefinition.createComponent" v-if="subDefinition.createComponent" :entity="subEntity"
                   :table-definition="subTableDefinition"/>
        <b-row v-else>
          <b-col v-for="(field,index) in subFormFields" :key="index" cols="12">
            <field :disabled="disabled" :inline="inline" :entity="subEntity" :table-definition="subTableDefinition"
                   :field="field"/>
          </b-col>
        </b-row>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BButton,
  BFormTextarea,
  BRow,
  BCol,
  BFormCheckbox,
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
  props: ['entity', 'field', 'tableDefinition', 'inline', 'disabled'],
  data() {
    return {
      list: this.$store.state.table.listCache[this.field.list] || [],
      subEntity: {},
      newValue: 'Create New Element',
      loading: false,
    }
  },
  computed: {
    subDefinition() {
      return Table[this.field.list]
    },
    subFormFields() {
      return this.subDefinition.fields.filter(f => !f.hideOnForm && !f.auto)
    },
    subTableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.field.list)
    },
    subPrimaryKey() {
      return this.subDefinition.primaryKey ?? this.subDefinition.fields.find(f => f.auto).key
    },
    hasNew() {
      return this.field.alwaysNew || this.newValue === this.entity[this.field.key]
    },
    selectedValue() {
      return this.field.type === 'list' ? this.list.find(e => e[this.field.key] === this.entity[this.field.key]) : this.entity[this.field.key]
    },
  },
  async created() {
    if (this.field.type === 'list') {
      if (this.list.length === 0) this.loading = true
      this.list = await this.$store.dispatch('table/fetchList', this.field.list)
      this.loading = false
    }
  },
  methods: {
    getValidationRules(field) {
      if (!this.tableDefinition) return {}
      return {
        required: true,
        email: this.field.type === 'email',
        max: this.tableDefinition?.attribute_datatype_len[field.key] || false,
        regex: this.tableDefinition?.attribute_regexp[field.key] || false,
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
        const selected = this.list.find(e => e[this.field.key] === this.entity[this.field.key])
        if (selected) {
          this.subFormFields.forEach(field => {
            this.$set(this.subEntity, field.key, selected[field.key])
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
