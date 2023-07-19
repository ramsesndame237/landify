<template>
  <validation-observer  ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)" autocomplete="off">
      <b-row>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field v-if="field && field.key" ref="fields" :disabled="loading || disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create" :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'


export default {
    name: "TranslationForm",
    mixins: [FormMixin],

    mounted() {
      const data = [
        {
          lang_name: "EN",
          attribute_lang: 'EN'
        },
        {
          lang_name: "DE",
          attribute_lang: 'DE'
        },
      ]
      if (this.table === '1__attribute_nice') {
        const index = this.definition.fields.findIndex(f => f.key === "attribute_lang");
        this.$store.dispatch("table/setListData", { entity: this.definition.fields[index].list, data });
      }else if (this.table === '1__translation') {
        const index = this.definition.fields.findIndex(f => f.key === "translation_lang");
        this.$store.dispatch("table/setListData", { entity: this.definition.fields[index].list, data });

      }
    }
}

</script>

<style scoped>

</style>
