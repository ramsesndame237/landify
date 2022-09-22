<template>
  <div>
    <b-row>
      <b-col v-for="(field,index) in formFields.filter(f=> f.hide!==true)" :key="index" cols="12" :md="cols">
        <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
               :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
      </b-col>

    </b-row>
    <b-row>
      <b-col
        v-for="(key,i) in ['address_street', 'address_extra', 'address_house_number','city_name','city_zip','country_name']"
        :key="i" md="6">
        <field disabled :entity="address" :table-definition="{}" :field="{key, required: false}"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field';
import FormMixin from "@/views/app/Generic/FormMixin";

export default {
  name: 'AreaForm',
  components: {
    Field,
    BRow,
    BCol,
  },
  mixins: [FormMixin],
  data() {
    return {
      address: {},
    }
  },
  watch: {
    'entity.location_id': function (val) {
      console.log("fetch address of", val)
      this.$api({
        entity: 'location_address_rel',
        action: 'read-rich',
        data: [{ location_id: val }],
      })
        .then(({ data }) => {
          const address_id = data.data.data[0]?.address_id
          if (address_id) {
            this.$api({
              entity: 'frontend_2_7_1',
              action: 'read-rich',
              data: [{ address_id }],
            })
              .then(({ data }) => {
                this.address = data.data.data[0] || {}
              })
          }
        })
    },
  },
}
</script>
