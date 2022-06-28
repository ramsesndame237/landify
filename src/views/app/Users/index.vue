<template>
  <b-row>
    <b-col cols="12">
      <b-form-group label="Name Company*" label-for="company-name" label-cols-md="4">
        <b-form-input id="company-name" v-model="user.company" type="text" placeholder="Please select ..."/>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="eMail" label-for="h-email" label-cols-md="4">
        <b-form-input id="h-email" v-model="user.email" type="email" placeholder="Enter here..."/>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Name / First name" label-for="h-name" label-cols-md="4">
        <div class="d-flex">
          <b-form-input id="h-name" v-model="user.first_name" class="mr-1" type="text" placeholder="Enter here..."/>
          <b-form-input id="h-firstname" v-model="user.full_name" md="4" type="text" placeholder="Enter here..."/>
        </div>

      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Mobile" label-for="h-mobile" label-cols-md="4">
        <b-form-input id="h-mobile" v-model="user.mobile" type="number" placeholder="Enter here..."/>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Fax" label-for="h-fax" label-cols-md="4">
        <b-form-input id="h-fax" v-model="user.fax" type="text" placeholder="Enter here..."/>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Deputy" label-for="h-deputy" label-cols-md="4">
        <b-form-select v-model="user.deputy" :options="deputy"/>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Type" label-for="h-deputy" label-cols-md="4">
        <b-form-select v-model="user.user_type" :options="options"/>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>

import {
  BFormGroup,
  BFormSelect,
  BModal,
  BForm,
  BRow,
  BCol,
  BFormInput,
  BCard,
} from 'bootstrap-vue'


export default {
  components: {
    BFormGroup,
    BFormSelect,
    BRow,
    BCol,
    BFormInput,
  },
  props: ['entity','tableDefinition'],
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.first-bloc img {
  margin-right: 4px;
}
</style>
