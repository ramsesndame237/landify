<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <b-row>
        <!-- Field: user_email -->
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_email')"/>
        </b-col>
        <!-- Field: user_password -->
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_password')"/>
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
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_name_abbreviation')"/>
        </b-col>

        <template
          v-for="key in ['firmengroup_type','partnergroup_id','partnercompany_id', 'customergroup_id', 'company_id']">
          <b-col :key="key" cols="12" md="6">
            <field ref="contactPersonField" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                   :field="getField(key)"/>
          </b-col>
        </template>

        <b-col cols="12" md="6">
          <field ref="contactPersonField" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('contactperson_id')"/>
        </b-col>
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_mobile')"/>
        </b-col>
        <b-col cols="12" md="6">
          <field :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('user_fix_phonenumber')"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BFormCheckbox, BRow, BCol,
} from 'bootstrap-vue'
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'UserForm',
  components: {
    BRow,
    BCol,
    BFormCheckbox,
  },
  mixins: [FormMixin],
  computed: {},
  watch: {},
  methods: {},
}
</script>
