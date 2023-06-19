<template>
  <div>
    <validation-observer ref="form" v-slot="{ passes }">
      <b-form @submit.prevent="passes(handleOk)">
        <b-row>
          <b-col v-for="(field, index) in definition.filters" :key="index" cols="12" :md="isVertical ? 12 : 4">
            <field ref="fields" :entity="data" :field="field" />
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <div class="d-flex justify-content-end">
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
import { computed, ref } from '@vue/composition-api'

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
  },
  setup(props, { emit }) {
    // Variables
    const data = ref({ ...props.initialData })
    const loading = ref(false)
    const form = ref('')
    const isVertical = computed(() => props.vertical || props.definition.filter_vertical)

    // Fonctions
    const reset = () => {
      data.value = { ...props.initialData }
      form.value.reset()
      // this.$refs.modal.hide()
    }

    const handleOk = bvModalEvt => {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      loading.value = true
      form.value.validate()
        .then(success => {
          if (!success) {
            return Promise.reject(new Error('Invalid Form'))
          }
          emit('filter', getFinalData())
        })
    }
    const getFinalData = () => Object.keys(data.value)
      .filter(key => props.definition.filters.find(f => f.key === key && f.send !== false))
      .reduce((obj, key) => {
        if (data.value[key] != null) obj[key] = data.value[key]
        return obj
      }, {})

    return {
      data, reset, form, handleOk, getFinalData, isVertical,
    }
  },
}
</script>
