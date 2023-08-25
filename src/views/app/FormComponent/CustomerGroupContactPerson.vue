<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <data-tables ref="companies" :current-page="1" :per-page="100000" :with-actions="false"
                   entity-list="frontend_2_2_3_1" entity="company" :fields="companyFields"
                   second-key="customergroup_id" :second-key-value="initialData.customergroup_id"
                   style="max-height: 300px"/>
      <b-row>
        <b-col v-for="(field,index) in formFields.filter(f=> f.hide!==true)" :key="index" cols="12" :md="cols">
          <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import DataTables from '@/layouts/components/DataTables'

export default {
  name: 'CustomerGroupContactPerson',
  components: { DataTables },
  mixins: [FormMixin],
  data() {
    return {
      companyFields: [
        { key: 'company_id' },
        { key: 'company_name' },
        { key: 'city_zip' },
        { key: 'city_name' },
      ],
    }
  },
  methods: {
    async afterSaveHook(contactperson) {
      const data = this.$refs.companies.getSelected().map(c => ({
        company_id: c.company_id,
        contactperson_id: contactperson.contactperson_id,
      }))
      if (data.length > 0) {
        await this.$api({
          entity: 'contactperson_company_rel',
          action: 'create',
          data,
        })
      }
    },
  },
}
</script>

<style scoped>

</style>
