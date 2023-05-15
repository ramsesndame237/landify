<template>
  <b-row>
    <b-col cols="12" >
      <b-form-group :label="$t('attribute.city_zip') + '/' + $t('attribute.city_name')"
        label-cols-md="4">
        <div class="d-flex">
          <field style="flex-grow: 1; margin-right: 20px;" :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('city_zip')"/>
          <field :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('city_name')"/>

        </div>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <field :inline="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('state')"/>
    </b-col>

    <b-col cols="12">
      <field :inline="true" ref="fields" :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('country_id')"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'

export default {
  name: 'CityForm',
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
}
</script>
