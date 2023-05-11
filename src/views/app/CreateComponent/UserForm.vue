<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row >
        <b-col v-for="(field,index) in definition.fields.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
                :md="cols">
          <field v-if="field" ref="fields" :disabled="loading || field.disabled || (!create && field.disableOnUpdate)" :create="create"
            :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field">

            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row class="mt-2">
                <b-col col="12">
                  <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                    :field="subFormFields.find(f=> f.key==='city_id')"
                  >
                    <template #default="{subFormFields, subTableDefinition, subEntity}">
                      <b-row >
                        <b-col cols="12">
                          <b-row>
                            <b-col cols="12" md="6">
                              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                  :inline="inline" :field="subFormFields.find(f=> f.key==='city_zip')"/>
                            </b-col>
                            <b-col cols="12" md="6">
                              <field :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                                  :inline="inline" :field="subFormFields.find(f=> f.key==='city_name')"/>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </template>
                  </field>
                </b-col>
              </b-row>
            </template>

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
  name: "CustomerGroupContactPerson",
  mixins: [FormMixin],
  data(){
    const userTable = {...Table.user}
    return{
    }
  },

  methods: {
    emitSubmit(){
      console.log("submit");
    }
  },
}

</script>

<style scoped>

</style>
