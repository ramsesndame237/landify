<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form autocomplete="off" @submit.prevent="passes(submit)">
      <b-row>
        <b-col v-for="(field,index) in tabsData[0].content.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
               :md="field.cols"
        >
          <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                 :create="create"
                 :inline="field.inline" :entity="entity" :table-definition="tableDefinition" :field="field"
          />
        </b-col>
      </b-row>
      <!-- <b-tabs ref="contract_tabs" v-model="tabIndex" vertical card nav-wrapper-class="col-4 text-left tabs_wrapper">
        <b-tab v-for="(tab,idx) in tabsData" :key="idx" title-item-class="mb-3">
          <template #title>
            <div class="row card_tabs_container">
              <feather-icon style="transition: ease-in-out .3s" :size="tabIndex === idx ? '50' :'40'" color="primary"
                            :icon="tab.icon" :class="['mr-1', tabIndex === idx ? 'btn-primary rounded-sm p-1' : '' ]"/>
              <div class="">
                <h5 :class="['font-weight-bolder',tabIndex === idx ? 'text-primary' : '']"
                    style="transition: ease-in-out .3s">
                  {{ tab.title }}
                </h5>
                <p style="transition: ease-in-out .3s" :class="['mb-0',tabIndex=== idx ? 'text-primary' : '']">
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
          <b-row>
            <b-col v-for="(field,index) in tab.content.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12"
                   :md="field.cols"
            >
              <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                     :create="create"
                     :inline="field.inline" :entity="entity" :table-definition="tableDefinition" :field="field"
              />
            </b-col>
          </b-row>
          <div v-if="!disabled" class="col-12 text-center d-flex justify-content-between ml-auto mt-3">
            <b-button href="#" :disabled="tabIndex === 0" variant="primary" @click="tabIndex--">
              Previous
            </b-button>
            <b-button v-if="tabIndex < 3" href="#" variant="primary" @click="tabIndex++">
              Next
            </b-button>
          </div>
        </b-tab>
      </b-tabs> -->
    </b-form>
  </validation-observer>
</template>

<script>
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'CompanyForm',
  mixins: [FormMixin],
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
          title: 'Basics Informations',
          subtitle: 'Company information',
          content: this.formFields.filter(field => field.category === undefined),
          errors: 0,
        },
        // {
        //   icon: 'PhoneCallIcon',
        //   title: 'Contact Informations',
        //   subtitle: 'Company contact information',
        //   content: this.formFields.filter(field => field.category === 'contact'),
        //   errors: 0,
        // },
        // {
        //   icon: 'MapIcon',
        //   title: 'Adress Informations ',
        //   subtitle: 'company adress information',
        //   content: this.formFields.filter(field => field.category === 'adress'),
        //   errors: 0,
        // },

        // {
        //   icon: 'PaperclipIcon',
        //   title: 'Tax Informations',
        //   subtitle: 'tax company informations',
        //   content: this.formFields.filter(field => field.category === 'price'),
        //   errors: 0,
        // },
      ]

      return tabs
    },
  },

  methods: {
    getSubFormField(subFormFields, key) {
      return subFormFields.find(f => f.key === key)
    },
  },
}

</script>

<style lang="scss">
.tabs_wrapper > ul.nav.nav-tabs {
  height: auto !important;
  margin-top: 15px;
  border-right: solid #676d7d;

  .nav-item {
    display: flex;
    width: 100%;
  }

  .nav-link {
    &::after {
      content: none;
    }
  }
}
</style>
