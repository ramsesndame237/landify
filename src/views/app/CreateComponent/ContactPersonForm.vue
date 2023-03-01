<template>
  <b-row>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_id')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('user_id')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_lastname')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contacttitle_id')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_firstname')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactsalutation_id')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_shortname')"/>
    </b-col>
    <b-col cols="12" md="6"></b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_function')"/>
    </b-col>
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_department')"/>
    </b-col>

    <b-col cols="12" class="mb-3"/>

    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('address_id')">
        <template #default="{subFormFields, subTableDefinition, subEntity}">
          <b-row class="mt-2">
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='address_street')"/>
            </b-col>
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='address_house_number')"/>
            </b-col>
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='address_extra')"/>
            </b-col>
            <b-col cols="12">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='city_id')">
                <template #default="{subFormFields, subTableDefinition, subEntity}">
                  <b-row >
                    <b-col cols="12" md="6">
                      <b-row>
                        <b-col cols="12" md="6">
                          <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                 :field="subFormFields.find(f=> f.key==='city_zip')"/>
                        </b-col>
                        <b-col cols="12" md="6">
                          <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                 :field="subFormFields.find(f=> f.key==='city_name')"/>
                        </b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="12" md="6">
                      <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                             :field="subFormFields.find(f=> f.key==='country_id')"/>
                    </b-col>
                  </b-row>
                </template>
              </field>
            </b-col>

          </b-row>
        </template>
      </field>
    </b-col>

    <b-col cols="12" class="mb-3"/>
    <b-col cols="12">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactdetails_id')">
        <template #default="{subFormFields, subTableDefinition, subEntity}">
          <b-row class="mt-2">
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='contactdetails_phone')"/>
            </b-col>
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='contactdetails_mobile')"/>
            </b-col>
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='contactdetails_email')"/>
            </b-col>
            <b-col cols="12" md="6">
              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                     :field="subFormFields.find(f=> f.key==='contactdetails_fax')"/>
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
  },
}
</script>
