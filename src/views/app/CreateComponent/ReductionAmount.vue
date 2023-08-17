<template>
  <b-table-simple responsive class="reduction-table">
    <b-thead>
      <b-tr>
        <b-th/>
        <b-th colspan="3">
          Initial Savings
        </b-th>
        <b-th v-if="extended" colspan="3">
          SubSequent Saving
        </b-th>
        <b-th>
          <b-button size="sm" variant="flat-primary" class="btn-icon" @click="extended=!extended">
            <feather-icon :icon="extended ? 'MinusIcon' : 'PlusIcon'"/>
          </b-button>
        </b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-td/>
        <b-td>Green</b-td>
        <b-td>Yellow</b-td>
        <b-td>Red</b-td>

        <b-td v-if="extended">
          Green
        </b-td>
        <b-td v-if="extended">
          Yellow
        </b-td>
        <b-td v-if="extended">
          Red
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Maximum Claim</b-th>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_maximum_claim_green')"/>
        </b-td>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_maximum_claim_yellow')"/>
        </b-td>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_maximum_claim_red')"/>
        </b-td>

        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Discount/concession Standard</b-th>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_accommodation_standard_green')"/>
        </b-td>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_accommodation_standard_yellow')"/>
        </b-td>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_accommodation_standard_red')"/>
        </b-td>

        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Discount/concession Standard</b-th>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_additional_accommodation')"/>
        </b-td>
        <b-td colspan="2"/>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended" colspan="2"/>
      </b-tr>
      <b-tr>
        <b-th>Suggested solution</b-th>
        <b-td class="">
          0,00
        </b-td>
        <b-td colspan="2"/>
        <b-td v-if="extended" class="">
          0,00
        </b-td>
        <b-td v-if="extended" colspan="2"/>
      </b-tr>
      <b-tr>
        <b-th>Landlord offer</b-th>
        <b-td>
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="getField('contradictionpoint_owner_offer')"/>
        </b-td>
        <b-td colspan="2"/>
        <b-td v-if="extended">
          <field :disabled="true" :entity="entity" :table-definition="tableDefinition" no-label="true"
                 :field="{key: 'test', required: false, type:'number'}"/>
        </b-td>
        <b-td v-if="extended" colspan="2"/>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import Field from '@/views/app/Generic/Field'
import Table from '@/table'

export default {
  name: 'ReductionAmount',
  components: { Field },
  props: ['entity', 'disabled'],
  data() {
    return {
      extended: false,
      definition: Table.contradictionpoint,
    }
  },
  computed: {
    tableDefinition() {
      return this.$store.getters['table/tableDefinition']('contradictionpoint')
    },
  },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>

<style lang="scss">
.reduction-table {
  .table {
    width: auto !important;
  }

  .form-group {
    margin-bottom: 0 !important;
  }

  td, th {
    padding: 6px 8px;
  }

  input {
    width: 80px !important;
  }
}
</style>
