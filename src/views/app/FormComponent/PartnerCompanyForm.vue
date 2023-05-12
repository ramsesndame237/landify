<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('partnercompany_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('partnergroup_is_internal')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('partnergroup_id')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('partnercompany_name')"
          />
        </b-col>
        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="false"
            :entity="entity" :table-definition="tableDefinition" :field="getField('address_id')"
          >

          <template #default="{subFormFields, subTableDefinition, subEntity}">
            <b-row class="mt-2" :md="cols">
              <b-col cols="4">
                <span>{{$t('attribute.address_street')}}</span>
              </b-col>

              <b-col cols="4">
                <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                      :field="getAddressFields(subFormFields).find(f=> f.key==='address_street')"/>
              </b-col>
              <b-col cols="4">
                <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                      :field="getAddressFields(subFormFields).find(f=> f.key==='address_house_number')"/>
              </b-col>

            </b-row>

            <b-col cols="12" :md="cols">
              <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                :field="getAddressFields(subFormFields).find(f=> f.key==='city_id')"
              >
                <template #default="{subFormFields, subTableDefinition, subEntity}">
                  <b-row class="mt-2" :md="cols">
                    <b-col cols="4">
                      <span>{{$t('attribute.city_name')}}</span>
                    </b-col>

                    <b-col cols="2">
                      <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                            :field="getCityFields(subFormFields).find(f=> f.key==='city_zip')"/>
                    </b-col>
                    <b-col cols="6">
                      <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                            :field="getCityFields(subFormFields).find(f=> f.key==='city_name')"/>
                    </b-col>

                  </b-row>
                </template>

              </field>
            </b-col>



          </template>

          </field>
        </b-col>

        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('contactdetails_id')"
          >

          <template #default="{subFormFields, subTableDefinition, subEntity}">
            <b-row >
              <b-col cols="12" :md="cols">
                <field :inline="inline" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                  :field="subFormFields.find(f=> f.key==='contactdetails_email')"
                />
              </b-col>
              <b-col cols="12" :md="cols">
                <field :inline="inline" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                  :field="subFormFields.find(f=> f.key==='contactdetails_phone')"
                />
              </b-col>
              <b-col cols="12" :md="cols">
                <field :inline="inline" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                  :field="subFormFields.find(f=> f.key==='contactdetails_fax')"
                />
              </b-col>
            </b-row>
          </template>

          </field>
        </b-col>

        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('companydetails_id')"
          >
            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row >
                <b-col cols="12" :md="cols">
                  <field :inline="inline" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                    :field="subFormFields.find(f=> f.key==='companydetails_website')"
                  />
                </b-col>
              </b-row>
            </template>
          </field>

        </b-col>

        <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
            :entity="entity" :table-definition="tableDefinition" :field="getField('partnercompany_type')"
          />
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'


export default {
  name: "PartnerCompanyForm",
  mixins: [FormMixin],

  methods: {
    getField(key) {
      return this.formFields.find(f => f.key === key)
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

<style scoped>

</style>
