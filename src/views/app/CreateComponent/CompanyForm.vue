<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row >
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('company_name')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('company_shortname')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('customergroup_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('address_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('contactdetails_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('companydetails_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('create_contactperson')"
          />
        </b-col>

        <!-- contact person subform -->
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="disabled"
            :entity="entity" :table-definition="definition" :field="getField('contactperson_id')"
          >

            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row >

                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'user_type')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactsalutation_id')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactperson_firstname')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactperson_lastname')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="true"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactperson_shortname')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactperson_function')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'address_id')"
                  />
                </b-col>
                <b-col cols="12" :md="cols">
                  <field ref="fields" :disabled="disabled"
                    :entity="subEntity" :table-definition="subTableDefinition" :field="getSubFormField(subFormFields,'contactdetails_id')"
                  >

                    <template #default="{subFormFields, subTableDefinition, subEntity}">
                      <b-row >
                        <b-col cols="12" :md="cols">
                          <field  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                            :field="subFormFields.find(f=> f.key==='contactdetails_phone')"
                          />
                        </b-col>
                        <b-col cols="12" :md="cols">
                          <field  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                            :field="subFormFields.find(f=> f.key==='contactdetails_mobile')"
                          />
                        </b-col>
                        <b-col cols="12" :md="cols">
                          <field  :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                            :field="subFormFields.find(f=> f.key==='contactdetails_fax')"
                          />
                        </b-col>
                      </b-row>
                    </template>

                  </field>
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
import FormMixin from '@/views/app/Generic/FormMixin'
import Table from '@/table'


export default {
  name: "CompanyForm",
  mixins: [FormMixin],

  methods: {
    getSubFormField(subFormFields, key){
      return subFormFields.find(f=> f.key === key)
    },
  },
}

</script>

<style scoped>

</style>
