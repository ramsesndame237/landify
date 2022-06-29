<template>
  <b-row>
    <!-- Field: user_email -->
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('company_name')"/>
    </b-col>

    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('customergroup_name')"/>
    </b-col>

  </b-row>
</template>

<script>
import {
  BFormCheckbox, BFormRadioGroup,
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import Table from '../../../table/index'
import Field from "@/views/app/Generic/Field";

export default {
  name: 'UserForm',
  components: {
    Field,
    BRow,
    BFormGroup,
    BCol,
    BFormInput,
    BFormCheckbox,
    BFormRadioGroup,
  },
  props: ['entity', 'tableDefinition', 'disabled'],
  data() {
    return {
      definition: Table.company,
    }
  },
  // computed: {
  //   selectedContactPerson() {
  //     const selected = this.entity.contactperson_id
  //     if (!this.$refs.contactPersonField) return {}
  //     return this.$refs.contactPersonField.list.find(item => item.contactperson_id === selected) || {}
  //   },
  // },
  // watch: {
  //   'entity.contactperson_id': function (value) {
  //     this.$api({
  //       action: 'read-rich',
  //       entity: 'contactperson_title_salutation_customergroup_group',
  //       attributes: ['salutation_name', 'salutation_title', 'customergroup_name'],
  //       filter: {
  //         contactperson_id: value,
  //       },
  //     }).then(data => {
  //       console.log(data)
  //     })
  //   },
  // },
  methods: {
    getField(key) {
      return this.definition.fields.find(f => f.key === key)
    },
  },
}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
</style>
