<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-row>
        <b-col v-for="field_id
          in [
            'partnercompany_id',
            'partnergroup_is_internal',
            'partnergroup_id',
            'partnercompany_name',
            'partnercompany_shortname',
            'partnercompany_role',
            'partnertype_id',
            'contactdetails_id',
            'companydetails_id',
            'address_id',
          ]
        " :key="field_id" cols="12" :md="cols">
          <p
            v-if="['contactdetails_id', 'companydetails_id', 'address_id'].includes(field_id)"
            class="ml-1 text-capitalize"
          >
            {{ field_id.replace(/(details)?_id$/, '') }}
          </p>
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
                 :entity="entity" :table-definition="tableDefinition" :field="getField(field_id)"
          />
        </b-col>
        <b-col cols="12" :md="cols" class="p-50 mb-50">
          <div class="d-flex align-items-center justify-content-between px-1">
            <p>
              Card informations
            </p>
            <b-button size="sm" variant="info" @click="addIban()">
              <feather-icon icon="PlusIcon" /> New IBAN
            </b-button>
          </div>
          <b-col>
            <b-col v-for="(iban, i) in (bank_data_infos || [])" :key="String(i) + (iban.id || '')" class="mt-1 pt-50 rounded-lg position-relative" style="border: 1px dashed var(--gray);">
              <b-button
                v-if="bank_data_infos.length > 1"
                class="position-absolute p-0"
                variant="danger"
                style="right: -10px; top: -10px; z-index: 2; width: 24px; height: 24px;"
                @click="removeIban(i)"
              >
                <feather-icon icon="XIcon" />
              </b-button>
              <field ref="fields" :disabled="loading" :create="create" :inline="inline"
                     :entity="bank_data_infos[i]" :table-definition="tableDefinition" :field="getField('bankdata_iban')"
              />
              <field ref="fields" :disabled="loading" :create="create" :inline="inline"
                     :entity="bank_data_infos[i]" :table-definition="tableDefinition" :field="getField('bankdata_iban_id')"
              />
            </b-col>
          </b-col>
        </b-col>
        <!-- <b-col cols="12" :md="cols">
          <field ref="fields" :disabled="loading" :create="create" :inline="false"
                 :entity="entity" :table-definition="tableDefinition" :field="getField('address_id')"
          >

            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row>
                <b-col cols="12">
                  <b-form-group :label="$t('attribute.address_street') + '/' + $t('attribute.address_house_number')"
                                label-cols-md="4">
                    <div class="d-flex">
                      <field style="flex-grow: 1; margin-right: 20px;" :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                             :field="getAddressFields(subFormFields).find(f=> f.key==='address_street')"/>
                      <field style="width: 100px;" :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                             :field="getAddressFields(subFormFields).find(f=> f.key==='address_house_number')"/>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col col="12" :md="cols">
                  <field :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                         :field="getAddressFields(subFormFields).find(f=> f.key==='city_id')"
                  >
                    <template #default="{subFormFields, subTableDefinition, subEntity}">
                      <b-row>
                        <b-col cols="12">
                          <b-form-group :label="$t('attribute.city_zip') + '/' + $t('attribute.city_name')"
                                        label-cols-md="4">
                            <div class="d-flex">
                              <field style="margin-right: 20px; width: 120px" :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                     :field="getCityFields(subFormFields).find(f=> f.key==='city_zip')"/>
                              <field style="flex-grow: 1;" :inline="false" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                     :field="getCityFields(subFormFields).find(f=> f.key==='city_name')"/>
                            </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </template>

                  </field>
                </b-col>
              </b-row>

            </template>

          </field>
        </b-col> -->

        <!-- <b-col cols="12" :md="cols">
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
        </b-col> -->

        <!-- <b-col cols="12" :md="cols">
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

        </b-col> -->
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'PartnerCompanyForm',
  mixins: [FormMixin],
  data() {
    return {
      bank_data_infos: (this.entity?.bank_data_infos || []).length === 0 ? [
        {
          iban: '',
          iban_id: '',
        },
      ] : this.entity.bank_data_infos,
    }
  },
  methods: {
    addIban() {
      this.bank_data_infos = [
        ...this.bank_data_infos,
        {
          iban: '',
          iban_id: '',
        },
      ]
    },
    removeIban(index) {
      if (this.bank_data_infos?.length > 1) {
        this.bank_data_infos = this.bank_data_infos.filter((_, i) => i !== index)
      }
    },
    getField(key) {
      return this.formFields.find(f => f.key === key)
    },
    getAddressFields(subFormFields) {
      return [...subFormFields].map(f => {
        if (f.key === 'address_house_number' || f.key === 'address_street') {
          f.noLabel = true
          return f
        }
        return f
      })
    },
    getCityFields(subFormFields) {
      return [...subFormFields].map(f => {
        if (f.key === 'city_name' || f.key === 'city_zip') {
          f.noLabel = true
          return f
        }
        return f
      })
    },
  },
}

</script>

<style scoped>

</style>
