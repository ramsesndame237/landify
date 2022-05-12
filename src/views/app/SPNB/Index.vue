<template>
  <div>
    <b-card body-class="p-0">
      <div class="d-flex align-items-center justify-content-between" style="padding: 10px">
        <div class="d-flex align-items-center">
          <span>{{ $t('app.content.create_new_business') }}</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-1 d-flex">
            <b-button size="sm" class="d-flex align-items-center" variant="primary">
              <img src="@/assets/images/pages/deleteIcons.svg" alt="">
              {{ $t('app.btn.cancel') }}
            </b-button>
          </div>
        </div>
      </div>
    </b-card>
    <b-row>
        <b-col cols="12" md="3" style="position: sticky; top:0px">
          <b-card class="" style="position:sticky; top: 20px">
              <b-row>
                <b-col cols='12' class="b-light d-flex justify-content-between">
                  <span> {{$t('app.content.progress')}} :</span>
                  <span class="text-primary"> {{steps_progress}} %</span>
                </b-col>
                <b-col cols='12' class="p-1">
                  <div v-for="tab in steps_tabs" :key="tab.step" >
                    <b-row
                      v-if="!tab.sub_step"
                      class="d-flex align-items-stretch mb-1 step_tab"
                      @click="jump_step_to(tab.step)" 
                    >
                      <b-col :class="` h-100 p-1 rounded ${(current_step == tab.step || tab.completed) ? 'step_completed' : ' text-primary bg-pink'}`"
                              cols="8"
                      >
                        {{tab.step}}. {{tab.text}}
                      </b-col>
                      <b-col class="" cols="">
                        <div :class="` h-100 p-1 justify-content-center d-flex align-items-center  rounded ${(current_step == tab.step || tab.completed) ? 'step_completed' : ' text-primary bg-pink'}`">
                            <img v-if="tab.completed" src="@/assets/images/icons/check_rounded.png" alt="">
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
          </b-card>
        </b-col>
        <b-col cols="12" md="9">
          <b-card class="">
            <b-form>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group  :label="$t('app.form.label.ticket_id')" label-for="ticket_id">
                    <b-form-input id="ticket_id" :placeholder="$t('app.form.placeholder.default')" />
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group :label="$t('app.form.label.document_id')"  label-for="document_id">
                    <b-form-input id="document_id" :placeholder="$t('app.form.placeholder.default')"  />
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group :label="$t('app.form.label.description')"  label-for="ticket_description">
                    <b-form-input id="ticket_description" :placeholder="$t('app.form.placeholder.default')" />
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group :label="$t('app.form.label.description')" label-for="document_description">
                    <b-form-input id="document_description" :placeholder="$t('app.form.placeholder.default')" />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
          <b-card id="" class="mt-12 ">
              <b-col cols="12">
                <b-row>
                  <div class="col-12">
                     <SPNBFormSteps :currentStep="current_step" />
                  </div>
                  <div v-if="steps_progress == 100" class=" d-flex pt-5 pb-5 mb-2 justify-content-center align-items-center col-12" >
                    <img src="@/assets/images/icons/smile.png" alt="">
                  </div>
                </b-row>
              </b-col>
              <b-col cols="12" class="d-flex align-items-center justify-content-between">
                <div>
                  <small>
                    {{ $t('app.content.new_busness_text_btn_msg') }}
                  </small>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <b-button v-if="current_step >= 1 && current_step < max_steps" size="md" class="d-flex align-items-center" variant="warning" @click="skip_step()">
                    {{ $t('app.btn.skip') }}
                  </b-button>
                  <b-button v-if="current_step > 1" size="md" class="d-flex align-items-center ml-2" variant="danger"  @click="prev_step()">
                    {{ $t('app.btn.prev') }}
                  </b-button>
                  <b-button v-if="current_step <= max_steps" size="md" class="d-flex align-items-center ml-2" variant="info" @click="next_step()">
                    {{ $t('app.btn.next') }}
                  </b-button>
                </div>
              </b-col>
          </b-card>
        </b-col>
    </b-row>
  </div>
</template>

<script>
const Databases = () => import('@/layouts/components/DataTables.vue')
import {
  BCard,
  BTab, BFormCheckbox, BFormRadio,BInputGroup,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'

import SPNBFormSteps from '@/layouts/components/forms/SPNBFormSteps.vue'
export default {
  components: {
    BCard,
    BTab,
    BTabs,
    BRow,
    BFormGroup,
    BCol,
    BForm,
    BFormInput,
    BButton,
    Databases,
    BModal,
    BFormSelect,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
    SPNBFormSteps,
  },
  data() {
    return {

      user: [
        {
          id: 1,
          full_name: 'NYA',
          first_name: 'Josue',
          email: 'josue.nya@gohze.org',
          last_login: '2022/04/20',
          user_type: 'developer',
          company: 'Gohze',
        },
      ],
      current_step : 1,
      max_steps : 1,
      completed_step: 0,
      steps_progress: 0,
      steps_tabs : [
        {
          text : this.$t('app.tab.customer_group'),
          completed: false,
          step: 1
        },
        {
          text : this.$t('app.tab.customers'),
          completed: false,
          step: 2
        },
        {
          text : this.$t('app.tab.location'),
          completed: false,
          step: 3
        },
        {
          text : this.$t('app.tab.area'),
          completed: false,
          step: 4
        },
        {
          text : this.$t('app.tab.pos'),
          completed: false,
          step: 5
        },
        {
          text : this.$t('app.tab.contract'),
          completed: false,
          step: 6, 
        },

        {
          text : this.$t('app.tab.contract'),
          completed: false,
          step: 7, 
          sub_step: true
        },
        {
          text : this.$t('app.tab.contract'),
          completed: false,
          step: 8,
          sub_step: true
        },
        {
          text : this.$t('app.tab.contract'),
          completed: false,
          step: 9,
          sub_step: true
        },
        {
          text : this.$t('app.tab.contract'),
          completed: false,
          step: 10,
          sub_step: true
        },
      ]
    }
  },
  methods: {
    next_step() {
      if (this.validate_current_form()) {
        this.steps_tabs[this.current_step-1].completed = true
        this.current_step++
        this.evaluate_completed_steps()
      }  
    },
    prev_step() {
      if (this.current_step != 1) {
        this.current_step--
        this.steps_tabs[this.current_step].completed = false
        this.evaluate_completed_steps()
      }
    },
    skip_step() {
      if (this.current_step != this.max_steps) {
        this.current_step++
      }
    },
    jump_step_to(step) {
      this.current_step = step
    },

    validate_current_form(){
      //validation des formulaires
      return true
    },

    evaluate_completed_steps(){
      this.completed_step = 0
      this.steps_tabs.forEach(step => {
        this.completed_step += (step.completed)? 1 : 0;
      })
    }
  },
  

  watch:{
    completed_step() {
      this.steps_progress = Math.floor((this.completed_step / this.max_steps)*100)
    }
  },

  mounted() {
    this.max_steps = this.steps_tabs.length; // on défini la taille max de tabs
    this.steps_progress = Math.floor((this.completed_step / this.max_steps)*100);
  },

}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';
.bg-pink{
  background: #D5113010;
}
.step_tab{
  transition: 500ms;
}
.step_completed, .step_tab:hover>div>div , .step_tab:hover>div:first-child {
  background: #D51130;
  color: #fff !important;
  cursor: pointer;
}
</style>
