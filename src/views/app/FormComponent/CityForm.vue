<template>
  <b-row>
    <b-col v-for="(field,i) in formFields.filter(f => !['city_name', 'city_zip'].includes(f.key))" :key="getField(i)" cols="12">
      <field :inline="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="field"/>
    </b-col>
    <b-col v-for="(field,i) in formFields.filter(f => ['city_name', 'city_zip'].includes(f.key))" :key="getField(i)" cols="12" md="6">
      <field :inline="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="field"/>
    </b-col>

  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'

export default {
  name: 'InvoicePositionFields',
  components: {
    Field,
    BRow,
    BCol,
  },
  props: ['disabled', 'entity', 'tableDefinition', 'definition', 'formFields'],
  data() {
    return {}
  },
  watch: {
    'entity.externalcosttype_id': function () {
      if (!this.entity.invoiceposition_name) {
        const ectField = this.$refs.fields.find(f => f.field.key === 'externalcosttype_id')
        this.$set(this.entity, 'invoiceposition_name', ectField.selectedValue.externalcosttype_name.trim())
      }
    },
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },

  mounted(){
    console.log("sub-form fields",this.formFields);
  }
}
</script>
