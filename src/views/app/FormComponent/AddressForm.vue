<template>
  <b-row>
    <!-- Field: user_email -->
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="{key: 'city_name'}"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="{key: 'city_zip'}"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('customergroup_name')"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BFormCheckbox, BFormRadioGroup,
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import Table from '../../../table/index'
import Field from "@/views/app/Generic/Field";

export default {
  name: 'UserForm',
  components: {
    Field,
    BRow,
    BFormGroup,
    BCol,
    BFormInput,
    BFormCheckbox,
    BFormRadioGroup,
  },
  props: ['entity', 'tableDefinition', 'disabled'],
  data() {
    return {
      definition: Table.company,
    }
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>

