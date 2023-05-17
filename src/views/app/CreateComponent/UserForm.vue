<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field v-if="field" ref="fields" :disabled="loading || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field">


          </field>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'
import Table from '@/table'


export default {
  name: "UserForm",
  mixins: [FormMixin],
  data() {
    const userTable = { ...Table.user }
    return {}
  },

  methods: {
    emitSubmit() {
      console.log("submit");
    }
  },
}

</script>

<style scoped>

</style>
