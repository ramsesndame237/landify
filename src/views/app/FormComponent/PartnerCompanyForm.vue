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
            'partnertype_id',
            'contactdetails_id',
            'companydetails_id',
            'address_id',
          ]
        " :key="field_id" cols="12" :md="cols">
          <strong
            v-if="['contactdetails_id', 'companydetails_id', 'address_id'].includes(field_id)"
            class="text-capitalize"
          >
            {{ $t(`attribute.${field_id}`).replace(/\s?id/gi, '') }}
          </strong>
          <field ref="fields" :disabled="loading" :create="create" :inline="inline"
                 :entity="entity" :table-definition="tableDefinition" :field="getField(field_id)"
          />
        </b-col>
        <b-col cols="12" :md="cols" class="p-50 mb-50">
          <div class="d-flex align-items-center justify-content-between px-1">
            <strong>
              {{ $t('attribute.card~informations') }}
            </strong>
            <b-button size="sm" variant="info" @click="addIban()">
              <feather-icon icon="PlusIcon" /> {{ $t('labels~new~iban') }}
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
      partner_company: {},
      ignoreFieldsFillOnUpdate: true,
      bank_data_infos: (this.entity?.bankdatas || []).length === 0 ? [
        {
          bankdata_iban: '',
          bankdata_iban_id: '',
        },
      ] : this.entity.bank_data_infos,
    }
  },
  async mounted() {
    const partner_id = this.$route.params.id
    if (!partner_id) {
      return
    }
    try {
      const url = `/partners/${partner_id}/partner?partner_id=${partner_id}`
      const { data } = await this.$http.get(url)
      this.entity = {
        ...data,
        partnertype_id: data?.partnertype?.partnertype_id,
        partnergroup_id: data?.partnergroup?.partnergroup_id,
      }
      this.fillFields(data)
    } catch (error) {
      this.$errorToast(this.$t('error~partner~company~load'))
    }
  },
  methods: {
    fillFields(data) {
      this.setSubEntity('companydetails_id', data?.companydetails)
      this.setSubEntity('contactdetails_id', data?.contactdetails)
      this.setSubEntity('partnergroup_id', data?.partnergroup)
      this.setSubEntity('address_id', data?.address)
      this.entity.partnergroup_is_internal = data?.partnergroup?.partnergroup_is_internal

      const addressField = this.$refs.fields.find(f => f.field.key === 'address_id')

      if (addressField) {
        const cityField = addressField.$refs.fields.find(f => f.field.key === 'city_id')
        const cityObjValues = {
          ...(data?.address || {}),
          state: data?.address?.address_city_state,
          city_zip: data?.address?.address_city_zip_code,
          city_name: data?.address?.address_city_name,
        }
        if (cityField) {
          cityField.subEntity = cityObjValues
        }
      }

      if (data?.bankdatas?.length > 0) {
        this.bank_data_infos = data?.bankdatas.map(b => ({
          bankdata_iban_id: b.iban_id,
          bankdata_iban: b.bankdata_iban,
        }))
      }
    },
    addIban() {
      this.bank_data_infos = [
        ...this.bank_data_infos,
        {
          bankdata_iban: '',
          bankdata_iban_id: '',
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
