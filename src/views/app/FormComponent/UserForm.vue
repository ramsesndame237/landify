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
          <field ref="contactPersonField" :disabled="disabled" :entity="entity" :table-definition="tableDefinition"
                 :field="getField('contactperson_id')"/>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Customer Group*" label-for="group">
            <div class="d-flex">
              <b-form-input id="customer-group" v-model="entity.customergroup_name" disabled="" class="mr-1"/>
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
            <b-form-input id="function" :value="entity.contactsalutation_name" disabled type="text"/>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group label="Title" label-for="title">
            <b-form-input id="title" v-model="entity.contacttitle_name" disabled type="text"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BFormCheckbox, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'UserForm',
  components: {
    BRow,
    BFormGroup,
    BCol,
    BFormInput,
    BFormCheckbox,
  },
  mixins: [FormMixin],
  computed: {
    selectedContactPerson() {
      const selected = this.entity.contactperson_id
      if (!this.$refs.contactPersonField) return {}
      return this.$refs.contactPersonField.list.find(item => item.contactperson_id === selected) || {}
    },
  },
  watch: {
    'entity.contactperson_id': function () {
      this.fetchContactDetail()
    },
  },
  methods: {
    async fetchContactDetail() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: 'frontend_1_1_2_3_1_contactperson',
        data: [{ contactperson_id: this.entity.contactperson_id }],
      })
      const result = data.data.data[0]
      this.$set(this.entity, 'contactsalutation_name', result.contactsalutation_name)
      this.$set(this.entity, 'contacttitle_name', result.contacttitle_name)
      this.$set(this.entity, 'customergroup_name', result.customergroup_name)
    },
  },
}
</script>
