<template>
  <div>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(handleOk)">
        <b-row>
          <b-col v-for="(field, index) in definition.filters" :key="index" :cols="field.cols || 12" :md="isVertical ? 12 : field.cols ? field.cols : 4">
            <field ref="fields" :entity="data" :field="field" />
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <div v-if="withActions" class="d-flex justify-content-end">
      <b-button variant="info" @click="reset">
        Reset
      </b-button>
      <b-button variant="primary" class="ml-2" @click="handleOk">
        Apply
      </b-button>
    </div>
  </div>
</template>

<script>
import Field from '@/views/app/Generic/Field.vue'
import { BForm } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    Field,
  },
  props: {
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    initialData: Object,
    vertical: Boolean,
    withActions: { type: Boolean, default: true },
  },
  data() {
    return { data: { ...this.initialData }, loading: false }
  },
  computed: {
    isVertical() {
      return this.vertical || this.definition.filter_vertical
    },
  },
  watch: {
    data: {
      handler(newVal) {
        if (!this.withActions) {
          this.handleOk()
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.definition.filters) {
      (this.definition.filters ?? []).forEach(filter => {
        this.$watch(
          `data.${filter.key}`,
          () => {
            (this.definition.filters ?? []).filter(_filter => _filter.filter_key === filter.key).map(_filter => {
              this.$set(this.data, _filter.key, null)
            })
          },
        )
      })
    }
  },
  mounted() {
    this.$emit('set-initial-filter-value', this.getFinalData())
  },
  methods: {
    // Fonctions
    reset() {
      this.data = { ...this.initialData }
      this.$refs.form.reset()
      // this.$refs.modal.hide()
    },
    handleOk() {
      // Trigger submit handler
      this.loading = true
      this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          this.$emit('filter', this.getFinalData())
        })
    },
    getFinalData() {
      return Object.keys(this.data)
        .filter(key => this.definition.filters.find(f => f.key === key && f.send !== false))
        .reduce((obj, key) => {
          if (this.data[key] != null) obj[key] = this.data[key]
          return obj
        }, {})
    },
  },
}
</script>
