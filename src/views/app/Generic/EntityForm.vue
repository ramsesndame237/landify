<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
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
import FormMixin from './FormMixin'

export default {
  name: 'EntityForm',
  mixins: [FormMixin],
}
</script>

<style scoped>

</style>
