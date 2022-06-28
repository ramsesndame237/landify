<template>
  <b-row>
    <!-- Field: user_email -->
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition" :field="getField('user_email')"/>
    </b-col>
    <!-- Field: user_password -->
    <b-col cols="12" md="6">
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password" v-model="entity.password" :disabled="disabled" type="password"/>
      </b-form-group>
    </b-col>

    <!-- Field user_reset-required -->
    <b-col cols="12" md="6">
      <div class="d-flex">
        <span class="mr-1">User must change his password at next login</span>
        <b-form-checkbox v-model="entity.user_password_reset_required" :disabled="disabled"/>
      </div>
      <div class="d-flex mt-1">
        <span class="mr-1">User locked</span>
        <b-form-checkbox v-model="entity.user_locked" :disabled="disabled"/>
      </div>
    </b-col>

    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('usertype_id')"/>
    </b-col>

    <!-- Field: user_firstname -->
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('user_firstname')"/>
    </b-col>

    <!-- Field: user_lastname -->
    <b-col cols="12" md="6">
      <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('user_lastname')"/>
    </b-col>

    <b-col cols="12" md="6">
      <field ref="contactPersonField" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
             :field="getField('contactperson_id')"/>
    </b-col>

    <b-col cols="12" md="6">
      <b-form-group label="Customer Group*" label-for="group">
        <div class="d-flex">
          <b-form-input id="customer-group" v-model="selectedContactPerson.customergroup" disabled="" class="mr-1"/>
          <img src="@/assets/images/icons/customerGroup.svg" alt="">
        </div>
      </b-form-group>
    </b-col>

    <b-col cols="12" md="6">
      <b-form-group label="Shortname" label-for="short_name">
        <b-form-input id="short_name" :value="selectedContactPerson.contactperson_shortname" disabled type="text"/>
      </b-form-group>
    </b-col>

    <b-col cols="12" md="6">
      <b-form-group label="Function" label-for="function">
        <b-form-input id="function" :value="selectedContactPerson.contactperson_function" disabled type="text"/>
      </b-form-group>
    </b-col>

    <b-col cols="12" md="6">
      <b-form-group label="Salutation" label-for="salutation">
        <b-form-radio-group id="radio-group-1" :value="selectedContactPerson.contactperson_salutation_name" disabled
                            :options="[{text:'Mr.',value:1}, {text:'Mrs.', value: 2}]" name="radio-options"/>
      </b-form-group>
    </b-col>

    <b-col cols="12" md="6">
      <b-form-group label="Title" label-for="title">
        <b-form-input id="title" v-model="selectedContactPerson.contactperson_title" disabled type="text"/>
      </b-form-group>
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
      definition: Table.user,
    }
  },
  computed: {
    selectedContactPerson() {
      const selected = this.entity.contactperson_id
      if (!this.$refs.contactPersonField) return {}
      return this.$refs.contactPersonField.list.find(item => item.contactperson_id === selected) || {}
    },
  },
  watch: {
    'entity.contactperson_id': function (value) {
      this.$api({
        action: 'read-rich',
        entity: 'contactperson_title_salutation_customergroup_group',
        attributes: ['salutation_name', 'salutation_title', 'customergroup_name'],
        filter: {
          contactperson_id: value,
        },
      }).then(data => {
        console.log(data)
      })
    },
  },
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
