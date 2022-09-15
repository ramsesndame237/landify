<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <b-row>
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('contactperson_id')"/>
        </b-col>
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_id')"/>
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
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('address_id')" :hide-main="true">
            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row>
                <b-col cols="12" md="6">
                  <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                         :field="subFormFields.find(f=> f.key==='address_street')"/>
                </b-col>
                <b-col cols="12" md="6">
                  <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                         :field="subFormFields.find(f=> f.key==='address_extra')"/>
                </b-col>
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

        <b-col cols="12" class="mb-3"/>
        <b-col cols="12">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('contactdetails_id')" :hide-main="true">
            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row>
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
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BFormCheckbox, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'ContactPersonFormForm',
  components: {
    BRow,
    BFormGroup,
    BCol,
    BFormInput,
    BFormCheckbox,
  },
  mixins: [FormMixin],
  computed: {
    selectedContactPerson() {
      const selected = this.entity.contactperson_id
      if (!this.$refs.contactPersonField) return {}
      return this.$refs.contactPersonField.list.find(item => item.contactperson_id === selected) || {}
    },
  },
  watch: {
    'entity.contactperson_id': function () {
      this.fetchContactDetail()
    },
  },
  methods: {},
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
