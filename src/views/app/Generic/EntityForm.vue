<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <component :is="definition.fieldComponent" v-if="definition.fieldComponent" :entity="entity"
                 :table-definition="tableDefinition" :definition="definition" :disabled="disabled"/>
      <b-row v-else>
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
