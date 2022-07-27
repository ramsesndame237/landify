<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <component :is="definition.createComponent" v-if="definition.createComponent" :entity="entity"
                 :disabled="disabled" :table-definition="tableDefinition"/>
      <b-row v-else>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field ref="fields" :disabled="disabled || (!create && field.disableOnUpdate)" :inline="inline" :entity="entity"
                 :table-definition="tableDefinition" :field="field"/>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm,
  BRow,
  BCol,
  BFormInput,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'
import FormMixin from "@/views/app/Generic/FormMixin";

export default {
  name: "EntityForm",
  components: {
    Field,
    BFormInput,
    BForm,
    BRow,
    BCol,
  },
  mixins: [FormMixin],
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    create: Boolean,
    initialData: Object,
    isRelation: Boolean,
    disabled: Boolean,
    cols: { default: 6 },
    inline: { type: Boolean, default: false }
  },
  data() {
    return {
      entity: { ...this.initialData, ...this.definition.default },
    }
  },
  computed: {
    formFields() {
      return this.definition.fields.filter(f => !f.hideOnForm && (!f.auto || this.create))
    },
    tableDefinition() {
      return this.$store.getters['table/tableDefinition'](this.tableDefinitionKey)
    },
    primaryKey() {
      return this.definition.primaryKey ?? this.definition.fields.find(f => f.auto).key
    },
  },
  methods: {
    setData(entity) {
      this.entity = { ...this.definition.default, ...entity }
    },
  },
}
</script>

<style scoped>

</style>
