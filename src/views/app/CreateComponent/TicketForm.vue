<template>
  <b-row>
    <b-col cols="12">
      <field ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="companyField"/>
    </b-col>
    <b-col cols="12">
      <field ref="fields" :filter-value="entity.company_id" :disabled="disabled || entity.company_id==null"
             :entity="entity" :table-definition="tableDefinition" :field="getField('pos_id')"/>
    </b-col>
    <b-col cols="12">
      <field ref="fields" :filter-value="entity.pos_id" :disabled="disabled || entity.pos_id==null"
             :entity="entity" :table-definition="tableDefinition" :field="getField('contract_id')"/>
    </b-col>
    <b-col
      v-for="(field,i) in ['ticket_id','ticket_name','ticket_description','ticket_deadline','ticket_deadline_yellow','ticket_deadline_red','ticket_planned_treatment_week', 'user_id']"
      :key="i" cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField(field)"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field';

export default {
  name: 'ContactPersonForm',
  components: {
    Field,
    BRow,
    BCol,
  },
  props: ['disabled', 'entity', 'tableDefinition', 'definition'],
  data() {
    return {
      companyField: {
        key: 'company_id',
        type: 'list',
        list: 'company',
        listLabel: 'company_name',
        required: false,
      }
    }
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>
