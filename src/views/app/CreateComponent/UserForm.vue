<template>
  <validation-observer v-if="userFormFields" ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col v-for="(field,index) in userFormFields" :key="index" cols="12" :md="cols">
          <field v-if="field" ref="fields" :disabled="loading || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
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
    return {
      userFormFields: {},
    }
  },

  async mounted(){
    await this.$http.get('/users/select')
    .then(resp=>{
      const data = resp.data
      const definition = {...Table.user}
      // add options on select fields
      let index = definition.fields.findIndex(f => f.key==="usertype_id") // usertype_id field
      definition.fields[index].options = data?.usertype

      index = definition.fields.findIndex(f => f.key==="function_id") // function_id field
      definition.fields[index].options = data?.function

      index = definition.fields.findIndex(f => f.key==="user_functions") // user_functions field
      definition.fields[index].options = data?.function

      this.userFormFields = this.getFormFields(definition)
    })
    .catch (e => {
      console.error(e)
      this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
    })
  }

}

</script>

<style scoped>

</style>
