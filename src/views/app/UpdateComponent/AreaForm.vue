<template>
  <validation-observer ref="form" v-slot="{ passes }">
    <b-form @submit.prevent="passes(submit)">
      <b-tabs ref="contract_tabs" v-model="tabIndex" vertical card nav-wrapper-class="col-4 text-left tabs_wrapper">
        <b-tab v-for="(tab,idx) in tabsData" :key="idx" title-item-class="mb-3">
          <template #title>
            <div class="row card_tabs_container">
              <feather-icon style="transition: ease-in-out .3s" :size="tabIndex === idx ? '50' :'40'" color="primary"
                            :icon="tab.icon" :class="['mr-1', tabIndex === idx ? 'btn-primary rounded-sm p-1' : '' ]"/>
              <div class="">
                <h5 :class="['font-weight-bolder',tabIndex === idx ?  'text-primary' : '']"
                    style="transition: ease-in-out .3s">
                  {{ tab.title }}
                </h5>
                <p style="transition: ease-in-out .3s" :class="['mb-0',tabIndex=== idx ?  'text-primary' : '']">
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
          <b-card-text class="card_step_form_contact">
            <b-row>
              <b-col v-for="(field,index) in tab.content.filter(f=> f.hide!==true && !f.auto)" :key="index" cols="12" :md="field.cols || cols">
                <field ref="fields" :disabled="disabled || field.disabled || (!create && field.disableOnUpdate)"
                       :inline="inline" :entity="entity" :table-definition="tableDefinition" :field="field"/>
              </b-col>
            </b-row>
            <b-row v-if="tabIndex === 1">
              <b-col
                v-for="(key,i) in ['address_street', 'address_extra', 'address_house_number','city_name','city_zip','country_name']"
                :key="i" md="6">
                <field disabled :entity="address" :table-definition="{}" :field="{key, required: false}"/>
              </b-col>
            </b-row>
            <div v-if="!disabled" class="col-12 text-center d-flex justify-content-between ml-auto mt-3">
              <b-button href="#" :disabled="tabIndex === 0" variant="primary" @click="tabIndex--">
                Previous
              </b-button>
              <b-button v-if="tabIndex < 2" href="#" variant="primary" @click="tabIndex++">
                Next
              </b-button>
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import Field from '@/views/app/Generic/Field'
import FormMixin from '@/views/app/Generic/FormMixin'

export default {
  name: 'AreaForm',
  components: {
    Field,
    BRow,
    BCol,
  },
  mixins: [FormMixin],
  data() {
    return {
      address: {},
      tabIndex:0
    }
  },
  watch: {
    'entity.location_id': function (val) {
      console.log('fetch address of', val)
      this.$api({
        entity: 'location_address_rel',
        action: 'read-rich',
        data: [{ location_id: val }],
      })
        .then(({ data }) => {
          const address_id = data.data.data[0]?.address_id
          if (address_id) {
            this.$api({
              entity: 'frontend_2_7_1',
              action: 'read-rich',
              data: [{ address_id }],
            })
              .then(({ data: respData }) => {
                this.address = respData.data.data[0] || {}
              })
          }
        })
    },
  },
  computed:{
    tab() {
      return tab
    },
    tabsData() {
      const tabs = [
        {
          icon: 'HomeIcon',
          title: 'Basics Informations',
          subtitle: 'Area information',
          content: this.formFields.filter(field => field.category === undefined),
          errors: 0,
        },

        {
          icon: 'MapIcon',
          title: 'Adress Informations ',
          subtitle: 'company adress information',
          content: this.formFields.filter(field => field.category === 'adress'),
          errors: 0,
        },

        {
          icon: 'CalendarIcon',
          title: 'date area Informations',
          subtitle: 'tax company informations',
          content: this.formFields.filter(field => field.category === 'date'),
          errors: 0,
        },
      ]

      return tabs
    },
  }
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

.card_step_form_contact {
  input {
    height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .vs__selected-options {
    height: auto;

    input {
      margin: 0px;
      height: 3.81796875vh;
    }

    display: flex;
    align-items: center;
  }
}
</style>

