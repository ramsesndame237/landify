<template>
  <b-row>
    <b-col cols="12" v-if="getField('contract_id')">
      <field :disabled="true" :entity="entity" :table-definition="tableDefinition" :field="getField('contract_id')"/>
    </b-col>
    <b-col cols="12" v-if="getField('contract_name')">
      <field :disabled="true" :entity="entity" :table-definition="tableDefinition" :field="getField('contract_name')"/>
    </b-col>
    <b-col cols="12">
      <field ref="criteriaField" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('criteria_id')"/>
    </b-col>
    <b-col cols="12" v-show="entity.criteria_id && (!$refs.choice || $refs.choice.listItems.length > 0)">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('choice_id')" ref="choice"
             :filter-value="entity.criteria_id"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_comment')"/>
    </b-col>
    <b-col v-if="showValueField" cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_value')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_exists')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_valid_from_date')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_valid_to_date')"/>
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
      mounted: false,
    }
  },
  computed: {
    showValueField() {
      return this.mounted ? this.$refs.criteriaField.selectedValue?.criteria_has_value === 1 : false
    },
  },
  watch: {
    showValueField(val) {
      this.$set(this.getField('choice_id'), 'required', !val)
    },
  },
  mounted() {
    // const field = this.getField('choice_id')
    // this.$set(field, 'filter_value', this.entity.criteria_id)
    this.mounted = true
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>
