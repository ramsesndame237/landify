<script>
import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'LocationForm',
  mixins: [formMixin],
  data: () => ({
    loading: false,
  }),
  mounted() {
    console.log('this is the field of the location', this.formFields)
  },
  methods: {
    handleSubmit() {
      this.loading = true
      this.$refs.form.handleSubmit(entity => {
        console.log('this is the entity', entity)
        this.loading = false
      })
    },
  },

}
</script>

<template>
  <validation-observer ref="form" v-slot="{ passes }" slim>
    <b-form autocomplete="off" @submit.prevent="passes(emitSubmit)">
      <b-row>
        <b-col v-for="(field,index) in formFields.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
               :md="field.cols || cols"
        >
          <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create"
                 :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"
          />
        </b-col>
      </b-row>
      <b-button :disabled="loading" class="save_button text-center d-flex align-items-center justify-content-center"
                variant="primary" @click="handleSubmit">
        <span>
          {{ $t('button~save') }}
        </span>
        <b-spinner v-if="loading" label="Spinning"/>
      </b-button>
    </b-form>
  </validation-observer>

</template>
<style lang="scss">
@import "@/assets/scss/variables/variables";

.header-customer {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 5.859375dvh;
  background: $body-bg-white;

  span {
    font-weight: 700;
    font-size: 1.388888888888889vw;
  }
}

.b-sidebar-body {
  background: $body-bg-white;
}

.save_button {
  width: 100%;
}
</style>
