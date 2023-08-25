<template>
  <div>
    <b-row>
      <b-col cols="12" md="6">
        <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
               :field="getField('contradictionpoint_title')"/>
      </b-col>
      <b-col cols="12" md="6">
        <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
               :field="getField('contradictionpoint_rank')"/>
      </b-col>
      <b-col cols="12" md="6">
        <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
               :field="getField('textmodule_id')"/>
      </b-col>
      <b-col cols="12" md="6"/>
      <b-col cols="12" md="6">
        <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
               :field="getField('contradictionpoint_text')"/>
      </b-col>
      <b-col cols="12" md="6">
        <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
               :field="getField('contradictionpoint_text_customer')"/>
      </b-col>
    </b-row>

    <h4 class="mt-2 mb-1">
      Reduction Amounts*
    </h4>

    <reduction-amount :entity="entity" :disabled="disabled"/>
  </div>

</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'
import ReductionAmount from '@/views/app/CreateComponent/ReductionAmount'

export default {
  name: 'ContradictionPointForm',
  components: {
    ReductionAmount,
    Field,
    BRow,
    BCol,
  },
  props: ['disabled', 'entity', 'tableDefinition', 'definition', 'create'],
  data() {
    return {
      mounted: false,
      extended: false,
    }
  },
  computed: {},
  watch: {},
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
