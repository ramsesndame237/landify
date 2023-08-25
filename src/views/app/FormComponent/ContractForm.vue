<script>

import formMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'ContractForm',
  mixins: [formMixin],
  data() {
    return {
      tabIndex: 0,
    }
  },
  computed: {
    tabsData() {
      const tabs = [
        {
          icon: 'HomeIcon',
          title: 'Basis Detail',
          subtitle: 'Contract detail',
          content: this.formFields.filter(field => field.category === undefined),
          errors: 0,
        },
        {
          icon: 'CalendarIcon',
          title: 'Date details',
          subtitle: 'Dates of contract',
          content: this.formFields.filter(field => field.category === 'date'),
          errors: 0,
        },
        {
          icon: 'DollarSignIcon',
          title: 'Price details',
          subtitle: 'Prices of contract',
          content: this.formFields.filter(field => field.category === 'price'),
          errors: 0,
        },
      ]

      return tabs
    },
  },
  watch: {
    disabled() {
      this.tabsData.forEach(tab => tab.errors = 0)
    },
    tabIndex(newValue, oldValue) {
      this.navigate(oldValue)
    },
  },
  methods: {
    navigate(index) {
      const { form } = this.$refs
      form.validate()
      const tab = this.tabsData[index]
      tab.errors = 0
      const tabContent = tab.content
      const { errors } = form
      tabContent.forEach(field => {
        if (errors[field.key] && errors[field.key].length > 0) {
          tab.errors += 1
        }
      })
    },
  },
}
</script>

<template>
  <div class="">
    <b-overlay :show="loading">
      <validation-observer ref="form" v-slot="{ passes }" slim>
        <b-form autocomplete="off" @submit.prevent="passes(emitSubmit)">
          <b-tabs ref="contract_tabs" v-model="tabIndex" vertical card nav-wrapper-class="col text-left tabs_wrapper">
            <template v-for="(tab,idx) in tabsData">
              <b-tab :key="idx" title-item-class=" mb-3">
                <template #title>
                  <div class="row">
                    <feather-icon size="40" :icon="tab.icon" class="mr-1" />
                    <div class="">
                      <h5 class="  font-weight-bolder">
                        {{ tab.title }}
                      </h5>
                      <p class="mb-0 text-muted">
                        {{ tab.subtitle }}
                      </p>
                    </div>
                    <h6 v-if="tab.errors > 0 && !disabled">
                      <b-badge variant="danger">
                        {{ tab.errors }}
                      </b-badge>
                    </h6>
                  </div>
                </template>
                <b-card-text>
                  <b-row>
                    <b-col v-for="(field,index) in tab.content.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
                           :md="cols"
                    >
                      <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)" :create="create"
                             :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"
                      />
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-tab>
            </template>
          </b-tabs>
          <div v-if="!disabled" class="col-10 text-center d-flex justify-content-between ml-auto">
            <b-button href="#" :disabled="tabIndex === 0" variant="primary" @click="tabIndex--">
              Previous
            </b-button>
            <b-button v-if="tabIndex < 2" href="#" variant="primary" @click="tabIndex++">
              Next
            </b-button>
          </div>
        </b-form>
      </validation-observer>
    </b-overlay>
  </div>
</template>

<style scoped>
.tabs_wrapper > ul.nav.nav-tabs {
  height: auto !important;
}
</style>
