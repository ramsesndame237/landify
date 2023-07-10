<template>
  <validation-observer  ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field v-if="field && field.key" ref="fields" :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>

          <!-- adress field -->
          <field v-if="field && field.key === 'address_id'" ref="fields" :disabled="loading || field.disabled || (!create && field.disableOnUpdate)"
          :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field">
            <template #default="{subFormFields, subTableDefinition, subEntity}">
              <b-row>
                <b-col cols="12">
                  <b-form-group :label="$t('attribute.address_street') + '/' + $t('attribute.address_house_number')"
                    label-cols-md="4">
                    <div class="d-flex" >
                      <field style="flex-grow: 1; margin-right: 20px;" :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="subEntity"
                        :table-definition="subTableDefinition" :field="subFormFields.find(f => f.key === 'address_street')" />
                      <field style="width: 100px;" :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="subEntity"
                        :table-definition="subTableDefinition" :field="subFormFields.find(f => f.key === 'address_house_number')" />
                    </div>
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <field :inline="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                    :field="subFormFields.find(f => f.key === 'address_extra')" />
                </b-col>
                <b-col cols="12">
                  <field :inline="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition"
                    :field="subFormFields.find(f => f.key === 'city_id')" >

                      <template #default="{subFormFields, subTableDefinition, subEntity}">
                        <b-row>
                          <b-col cols="12" >
                            <b-form-group :label="$t('attribute.city_zip') + '/' + $t('attribute.city_name')"
                              label-cols-md="4">
                              <div class="d-flex">
                                <field style="margin-right: 20px; width: 120px" :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition" :field="subFormFields.find(f => f.key === 'city_zip')"/>
                                <field style="flex-grow: 1;" :inline="false" :noLabel="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition" :field="subFormFields.find(f => f.key === 'city_name')"/>

                              </div>
                            </b-form-group>
                          </b-col>
                          <b-col cols="12">
                            <field :inline="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition" :field="subFormFields.find(f => f.key === 'state')"/>
                          </b-col>
                          <b-col cols="12">
                            <field :inline="true" ref="fields" :disabled="disabled" :entity="subEntity" :table-definition="subTableDefinition" :field="getCountryIdField(subFormFields)"/>
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
    name: "UserForm",
    mixins: [FormMixin],

    async mounted() {
        await this.$http.get("/users/select")
        .then((resp) => {
          const data = resp.data;
          let definition = { ...Table.user };
          // add data for select fields in store
          let index = definition.fields.findIndex(f => f.key === "usertype_id"); // usertype_id field
          this.$store.dispatch("table/setListData", { entity: definition.fields[index].list, data: data?.usertype });

          index = definition.fields.findIndex(f => f.key === "function_id"); // function_id field
          this.$store.dispatch("table/setListData", { entity: definition.fields[index].list, data: data?.function });

          index = definition.fields.findIndex(f => f.key === "user_functions"); // user_functions field
          this.$store.dispatch("table/setListData", { entity: definition.fields[index].list, data: data?.function });

          index = definition.fields.findIndex(f => f.key === "customergroup_id"); // customer_group field
          this.$store.dispatch("table/setListData", { entity: definition.fields[index].list, data: data?.customergroup });

          index = definition.fields.findIndex(f => f.key === "partnergroup_id"); // partner group field
          this.$store.dispatch("table/setListData", { entity: definition.fields[index].list, data: data?.partnergroup });

        })
        .catch(e => {
          console.error(e);
          this.$errorToast(e.response ? e.response.data?.detail : "Unknow Error");
        })
    },

    methods: {
      getCountryIdField(formField) {
        const field = {...formField.find(f => f.key === 'country_id')}
        field.noFetch = true

        return field
      },
    },
}

</script>

<style scoped>

</style>
