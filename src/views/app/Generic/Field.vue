<template>
  <b-form-group :label="field.label||field.key" :label-for="'field-'+field.key" :label-cols-md="inline?4:null">
    <validation-provider #default="{ errors }" :rules="getValidationRules(field)" :name="field.key"
                         :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message[field.key]}">
      <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                       :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
      <v-select v-else-if="field.type==='list'" v-model="entity[field.key]" :disabled="disabled"
                :state="errors.length > 0 ? false:null" :placeholder="field.key" :options="list"
                :label="field.listLabel" :reduce="i => i[field.key]"/>
      <flat-pickr v-else-if="field.type==='date'" v-model="entity[field.key]" :disabled="disabled"
                  :state="errors.length > 0 ? false:null" :placeholder="field.key" class="form-control"/>
      <b-form-input v-else v-model="entity[field.key]" :type="field.type||'text'" :disabled="disabled"
                    :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormTextarea,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

export default {
  name: 'Field',
  components: {
    BFormInput, BFormGroup, BFormTextarea, vSelect, flatPickr,
  },
  props: ['entity', 'field', 'tableDefinition', 'inline', 'disabled'],
  data() {
    return {
      list: [],
    }
  },
  async created() {
    if (this.field.type === 'list') this.list = await this.$store.dispatch('table/fetchList', this.field.list)
  },
  methods: {
    getValidationRules(field) {
      return {
        required: true,
        email: this.field.type === 'email',
        max: this.tableDefinition?.attribute_datatype_len[field.key] || false,
        regex: this.tableDefinition?.attribute_regexp[field.key] || false,
        ...(this.field.rules || {}),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
