<template>
  <b-form-group :label="field.key" :label-for="'field-'+field.key" :label-cols-md="inline?4:null">
    <validation-provider #default="{ errors }" :rules="getValidationRules(field)" :name="field.key"
                         :custom-messages="{'regex':tableDefinition && tableDefinition.attribute_regexp_failure_message[field.key]}">
      <b-form-textarea v-if="field.type==='textarea'" v-model="entity[field.key]" :disabled="disabled"
                       :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
      <b-form-input v-else v-model="entity[field.key]" :type="field.type||'text'" :disabled="disabled"
                    :state="errors.length > 0 ? false:null" :placeholder="field.key"/>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>
import {
  BFormGroup,
  BFormSelect,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BFormTextarea,
} from 'bootstrap-vue'

export default {
  name: 'Field',
  components: {
    BFormInput, BFormGroup, BForm, BFormSelect, BRow, BCol, BFormTextarea
  },
  props: ['entity', 'field', 'tableDefinition', 'inline', 'disabled'],
  methods: {
    getValidationRules(field) {
      return {
        required: true,
        email: this.field.type === 'email',
        max: this.tableDefinition?.attribute_datatype_len[field.key],
        regex: this.tableDefinition?.attribute_regexp[field.key] || false,
      }
    },
  },
}
</script>

<style scoped>

</style>
