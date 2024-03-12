<template>
  <!--modal-->
  <div>
    <!-- FixMe: Force set initial filter value -->
    <b-form v-show="false">
      <b-col v-for="(field,index) in definition.filters.filter(f => !f.hideOnForm)" :key="index" cols="12"
             :md="isVertical?12:4">
        <field ref="fields" :entity="data" :field="field"/>
      </b-col>
    </b-form>
    <b-modal id="filter-modal" ref="modal" ok-title="Save" cancel-title="Cancel" modal-class="modal-primary" centered
             title="Filter" :size="isVertical?'sm' : 'lg'" @ok="handleOk">
      <validation-observer ref="form" v-slot="{ passes }">
        <b-form @submit.prevent="passes(handleOk)">
          <b-row>
            <b-col v-for="(field,index) in definition.filters.filter(f => !f.hideOnForm)" :key="index" cols="12"
                   :md="isVertical?12:4">
              <field ref="fields" :entity="data" :field="field"/>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <template v-slot:modal-footer>
        <b-button variant="warning" @click="$refs.modal.hide()">
          Cancel
        </b-button>
        <b-button variant="info" @click="reset">
          Reset
        </b-button>
        <b-button id="applyBtn" variant="primary" @click="handleOk">
          Apply
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>

import {
  BButton, BCol, BForm, BRow,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'
import { getUserData } from '@/auth/utils'

export default {
  name: 'GenericFilter',
  components: {
    Field, BButton, BCol, BForm, BRow,
  },
  props: {
    loadOnMount: {
      type: Boolean,
    },
    table: String,
    definition: Object,
    tableDefinitionKey: String,
    initialData: Object,
    vertical: Boolean,
  },
  data() {
    return {
      data: { ...this.initialData },
    }
  },
  computed: {
    isVertical() {
      return this.vertical || this.definition.filter_vertical
    },
  },
  watch: {
    initialData(newValue) {
      this.data = newValue
    },
  },
  created() {
    if (this.definition.filters) {
      (this.definition.filters ?? []).filter(x => !x.hideOnListing).forEach(filter => {
        this.$watch(
          `data.${filter.key}`,
          () => {
            (this.definition.filters ?? []).filter(_filter => _filter.filter_key === filter.key && !_filter.hideOnListing).map(_filter => {
              this.$set(this.data, _filter.key, null)
            })
          },
        )
      })
    }
  },
  mounted() {
    if (this.loadOnMount) {
      this.$emit('filter', this.getFinalData())
    }
  },
  methods: {
    openModal() {
      this.$refs.modal.show()
    },
    reset() {
      Object.keys(this.data).forEach(key => {
        if (this.initialData && this.initialData[key] != null) {
          this.$set(this.data, key, this.initialData[key])
        } else {
          this.$delete(this.data, key)
        }
      })
      // call initial data for all the fields then reset (Do it later)
      const components = (Array.isArray(this.$refs.fields) ? this.$refs.fields : [this.$refs.fields])
      components.forEach(field => {
        field.initializeValue()
      })
      this.$refs.form.reset()
      this.$emit('reset', this.getFinalData())
      // this.$refs.modal.hide()
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      console.log("this is the data modal")
      this.loading = true
      this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          // this.$refs.modal.hide()
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

<style scoped>

</style>
