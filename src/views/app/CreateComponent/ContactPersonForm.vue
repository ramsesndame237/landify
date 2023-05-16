<template>

  <b-row >

    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('user_type')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactsalutation_id')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactperson_firstname')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactperson_lastname')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactperson_shortname')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactperson_function')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('address_id')"
      />
    </b-col>
    <b-col cols="12" md="12">
      <field :inline="true" ref="fields" :disabled="disabled"
        :entity="entity" :table-definition="definition" :field="getField('contactdetails_id')"
      >

        <template #default="{subFormFields, subTableDefinition, subEntity}">
          <b-row >
            <b-col cols="12" md="12">
              <field :inline="true"  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                :field="subFormFields.find(f=> f.key==='contactdetails_phone')"
              />
            </b-col>
            <b-col cols="12" md="12">
              <field :inline="true"  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                :field="subFormFields.find(f=> f.key==='contactdetails_mobile')"
              />
            </b-col>
            <b-col cols="12" md="12">
              <field :inline="true"  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                :field="subFormFields.find(f=> f.key==='contactdetails_fax')"
              />
            </b-col>
          </b-row>
        </template>

      </field>
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
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
    getAddressFields(subFormFields){
      return [...subFormFields].map(f => {
        if (f.key === 'address_house_number' || f.key === 'address_street') {
          f.noLabel = true;
          return f
        }
        else return f
      })
    },
    getCityFields(subFormFields){
      return [...subFormFields].map(f => {
        if (f.key === 'city_name' || f.key === 'city_zip') {
          f.noLabel = true;
          return f
        }
        else return f
      })
    }
  },
}
</script>
