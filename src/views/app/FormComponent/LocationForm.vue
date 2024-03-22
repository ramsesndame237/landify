<script>
import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'LocationForm',
  mixins: [formMixin],
  async mounted() {
    try {
      const locationId = this.$route.params.id
      if(locationId) {
        const {
          address: {
            address_city_zip_code,
            address_city_name,
            address_city_state,
            ...addressRest
          },
          areas,
          locationtype,
          location_creation_time,
          owner,
          customergroup,
          ...rest
        } = (await this.$http.get(`/locations/${locationId}`))?.data
        const area_ids = (areas || [])?.map(area => area?.area_id)
        this.entity = {
          ...rest,
          ...(addressRest || {}),
          area_ids,
          locationtype_id: locationtype?.locationtype_id,
          owner_id: owner?.company_id,
          city_zip: address_city_zip_code,
          city_name: address_city_name,
          city_state: address_city_state,
        }
      }
    } catch (e) {
      this.$errorToast(typeof e?.response?.data?.detail === 'string' ? e.response.data.detail : this.$t('unexpected~error~ocurred'))
    }
  },
}
</script>

<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(handleSubmit)">
      <b-row>
        <b-col v-for="field in formFields" :key="field.key" cols="12" :md="cols">
          <field v-if="field && field.key" ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>

</template>
<style lang="scss">
@import "@/assets/scss/variables/variables";

.header-customer {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 5.859375dvh;
  background: $body-bg-white;

  span {
    font-weight: 700;
    font-size: 1.388888888888889vw;
  }
}

.b-sidebar-body {
  background: $body-bg-white;
}

.save_button {
  width: 100%;
}
</style>
