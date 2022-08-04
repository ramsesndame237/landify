<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <component :is="definition.formComponent" v-if="definition.formComponent" :entity="entity" :disabled="disabled"
                 :table-definition="tableDefinition"/>
      <b-row v-else>
        <b-col v-for="(field,index) in formFields" :key="index" cols="12" :md="cols">
          <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)" :inline="inline"
                 :entity="entity" :table-definition="tableDefinition" :field="field"/>
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
    inline: { type: Boolean, default: false },
    entityId: { default: 0 },
  },
  data() {
    return {
      entity: { ...this.initialData, ...this.definition.default },
      entityLoaded: false,
      originalEntity: {},
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
  async created() {
    if (this.create) return
    if (!this.initialData) {
      const entity = await this.$store.dispatch('table/fetchSingleItem', {
        entity: this.table,
        primaryKey: this.primaryKey,
        id: this.entityId,
      })
      this.setData(entity)
    }
    try {
      this.entityLoaded = true
      await this.fillRelations(this.entity)
    } finally {
      console.log('entity', this.entity)
      this.originalEntity = { ...this.entity }
    }
  },
  methods: {
    setData(entity) {
      this.entity = { ...this.definition.default, ...entity }
    },
    reset() {
      this.entity = { ...this.originalEntity }
    },
    async loadDefinition() {
      const { data } = await this.$api({ action: 'read-rich', entity: this.table })
      this.$store.commit('table/setDefinition', data)
    },
  },
}
</script>

<style scoped>

</style>
