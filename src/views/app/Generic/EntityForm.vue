<template>
  <b-overlay :show="loading">
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form autocomplete="off" @submit.prevent="passes(emitSubmit)">

        <component :is="definition.fieldComponent" v-if="definition.fieldComponent" ref="fieldComponent"
                   :entity="entity" :create="create" :table-definition="tableDefinition" :definition="definition"
                   :disabled="disabled" :form-fields="formFields"/>
        <b-row v-else>
          <b-col v-for="(field,index) in formFields.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
                 :md="field.cols">
            <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)" :create="create"
                   :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-overlay>
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
