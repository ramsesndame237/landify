<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-row>
        <b-col v-for="(field, index) in formFields" :key="index" cols="12" :md="cols">
          <field v-if="field && field.key" ref="fields" :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
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
  name: 'UserForm',
  mixins: [FormMixin],
  async mounted() {
    if (this.$parent.removeBody) {
      this.$parent.removeBody(true)
    }
    await this.$http.get('/users/select')
        .then(resp => {
          const data = resp.data
          const definition = { ...Table.user }
          // add data for select fields in store
          let index = definition.fields.findIndex(f => f.key === 'usertype_id') // usertype_id field
          this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.usertype })

          index = definition.fields.findIndex(f => f.key === 'function_id') // function_id field
          this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.function })

          // index = definition.fields.findIndex(f => f.key === 'user_functions') // user_functions field
          // this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.function })

          index = definition.fields.findIndex(f => f.key === 'customergroup_id') // customer_group field
          this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.customergroup })

          index = definition.fields.findIndex(f => f.key === 'partnergroup_id') // partner group field
          this.$store.dispatch('table/setListData', { entity: definition.fields[index].list, data: data?.partnergroup })
        })
        .catch(e => {
          console.error(e)
          this.$errorToast(e.response ? e.response.data?.detail : 'Unknow Error')
        })
  },

  methods: {
    getCountryField(formField) {
      return { ...formField.find(f => f.key === 'country_id') }
    },
  },
}

</script>
