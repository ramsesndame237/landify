<template>
  <b-row>
    <b-col v-if="getField('contract_id')" cols="12">
      <field :disabled="true" :entity="entity" :table-definition="tableDefinition" :field="getField('contract_id')"/>
    </b-col>
    <b-col v-if="getField('contract_name')" cols="12">
      <field :disabled="true" :entity="entity" :table-definition="tableDefinition" :field="getField('contract_name')"/>
    </b-col>
    <b-col cols="12">
      <field ref="criteriaField" :disabled="disabled || (!create)" :entity="entity" :table-definition="tableDefinition"
             :field="getField('criteria_id')"/>
    </b-col>
    <b-col v-show="entity.criteria_id && (!$refs.choice || $refs.choice.listItems.length > 0)" cols="12">
      <field ref="choice" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('choice_id')"
             :filter-value="entity.criteria_id"/>
    </b-col>
    <b-col v-if="showValueField" cols="12">
      <field ref="contractCriteriaValue" :disabled="disabled || (!create)" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_value')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_comment')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contract_criteria_exists')"/>
    </b-col>
    <b-col cols="12">
      <field :disabled="disabled || (!create)" :entity="entity" :table-definition="tableDefinition"
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
import Field from '@/views/app/Generic/Field'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  name: 'ContractCriteriaForm',
  components: {
    Field,
    BRow,
    BCol,
  },
  props: ['disabled', 'entity', 'tableDefinition', 'definition', 'create'],
  data() {
    return {
      mounted: false,
    }
  },
  computed: {
    showValueField() {
      if (this.mounted) {
        const selectedCriteria = this.$refs.criteriaField?.selectedValue

        if (selectedCriteria) {
          const { criteriatype } = selectedCriteria
          // Si le criteriatype et criteriatype_has_value sont bien défini on affiche les champs de value
          if (criteriatype && criteriatype.criteriatype_has_value) {
            this.$set(this.getField('contract_criteria_value'), 'unit', () => criteriatype.units)
            return true
          }
          return false
        }
      }
      // return this.mounted ? this.$refs.criteriaField.selectedValue?.criteria_has_value === 1 : false
    },
  },
  watch: {
    showValueField(val) {
      if (val) {
        const payload = { entity: 'criteriattype_units', data: this.contracttype_units }
        this.$store.dispatch('table/setListData', payload)
      }
    },
  },
  async mounted() {
    // const field = this.getField('choice_id')
    // this.$set(field, 'filter_value', this.entity.criteria_id)
    this.mounted = true
    try {
      const response = await this.$http.get('/criteria')
      const data = response.data
      // Get Index of criteria_id key in the relation
      const index = this.definition.fields.findIndex(field => field.key === 'criteria_id')
      // Mise à jour des données du champ criteria_id
      await this.$store.dispatch('table/setListData', { entity: this.definition.fields[index].list, data: data?.criterias })
    } catch (error) {
      console.log({ error })
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Error in getting Criterias !!!',
          icon: 'errorIcon',
          variant: 'error',
        },
      })
    }
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>
