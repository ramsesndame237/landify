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
            <b-col cols="12" class="b-light d-flex justify-content-between">
              <span> {{ $t('app.content.progress') }} :</span>
              <span class="text-primary"> {{ steps_progress }} %</span>
            </b-col>
            <b-col cols="12" class="p-1">
              <div v-for="tab in steps_tabs" :key="tab.step">
                <b-row v-if="!tab.sub_step" class="d-flex align-items-stretch mb-1 step_tab"
                       @click="jump_step_to(tab.step)">
                  <b-col
                    :class="` h-100 p-1 rounded ${(current_step == tab.step || tab.completed) ? 'step_completed' : ' text-primary bg-pink'}`"
                    cols="8">
                    {{ tab.step }}. {{ tab.text }}
                  </b-col>
                  <b-col class="" cols="">
                    <div
                      :class="` h-100 p-1 justify-content-center d-flex align-items-center  rounded ${(current_step == tab.step || tab.completed) ? 'step_completed' : ' text-primary bg-pink'}`">
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
                <field disabled :field="{key: 'ticket_id'}" :entity="ticket"/>
              </b-col>
              <b-col cols="12" md="6">
                <field disabled :field="{key: 'document_id'}" :entity="ticket"/>
              </b-col>
              <b-col cols="12" md="6">
                <field disabled :field="{key: 'ticket_description'}" :entity="ticket"/>
              </b-col>
              <b-col cols="12" md="6">
                <field disabled :field="{key: 'document_description'}" :entity="ticket"/>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
        <b-card id="" class="mt-12">
          <step1 v-if="current_step===1" ref="step1" :context="context" :disabled="loading"/>
          <step2 v-if="current_step===2" ref="step2" :context="context" :disabled="loading"/>
          <step3 v-if="current_step===3" ref="step3" :context="context" :disabled="loading"/>
          <step4 v-if="current_step===4" ref="step4" :context="context" :disabled="loading"/>
          <step5 v-if="current_step===5" ref="step5" :context="context" :disabled="loading"/>
          <step6 v-if="current_step===6" ref="step6" :context="context" :disabled="loading"/>
          <step7 v-if="current_step===7" ref="step7" :context="context" :disabled="loading"/>
          <step8 v-if="current_step===8" ref="step8" :context="context" :disabled="loading"/>
          <step9 v-if="current_step===9" ref="step9" :context="context" :disabled="loading"/>
          <step10 v-if="current_step===10" ref="step10" :context="context" :disabled="loading"/>
          <div v-if="steps_progress == 100"
               class=" d-flex pt-5 pb-5 mb-2 justify-content-center align-items-center col-12">
            <img src="@/assets/images/icons/smile.png" alt="">
          </div>
          <b-col cols="12" class="d-flex align-items-center justify-content-between">
            <div>
              <small>
                {{ $t('app.content.new_busness_text_btn_msg') }}
              </small>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <b-button v-if="current_step >= 1 && current_step < max_steps" :disabled="loading" size="md" class="d-flex align-items-center"
                        variant="warning" @click="skip_step()">
                {{ $t('app.btn.skip') }}
              </b-button>
              <b-button v-if="current_step > 1" :disabled="loading" size="md" class="d-flex align-items-center ml-2" variant="danger"
                        @click="prev_step()">
                {{ $t('app.btn.prev') }}
              </b-button>
              <b-button v-if="current_step <= max_steps" size="md" :disabled="loading"
                        class="d-flex align-items-center ml-2" variant="info" @click="next_step()">
                <b-spinner v-if="loading" small/>
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
import {
  BCard, BTab, BFormCheckbox, BFormRadio, BInputGroup, BSpinner,
  BTabs, BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BModal,
} from 'bootstrap-vue'

import SPNBFormSteps from '@/views/app/SPNB/SPNBFormSteps.vue'
import Field from '@/views/app/Generic/Field.vue'
import Step1 from '@/views/app/SPNB/Step1'
import Step2 from '@/views/app/SPNB/Step2'
import Step3 from '@/views/app/SPNB/Step3'
import Step4 from '@/views/app/SPNB/Step4'
import Step5 from '@/views/app/SPNB/Step5'
import Step6 from '@/views/app/SPNB/Step6'
import Step7 from '@/views/app/SPNB/Step7'
import Step8 from '@/views/app/SPNB/Step8'
import Step9 from '@/views/app/SPNB/Step9'
import Step10 from '@/views/app/SPNB/Step10'

const Databases = () => import('@/layouts/components/DataTables.vue')
export default {
  components: {
    Step1,
    Field,
    BCard,
    BTab,
    BTabs,
    BSpinner,
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
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    Step10,
  },
  data() {
    return {
      ticket: {},
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
      current_step: 1,
      max_steps: 10,
      completed_step: 0,
      steps_progress: 0,
      steps_tabs: [
        {
          text: this.$t('app.tab.customer_group'),
          completed: false,
          step: 1,
        },
        {
          text: this.$t('app.tab.customers'),
          completed: false,
          step: 2,
        },
        {
          text: this.$t('app.tab.location'),
          completed: false,
          step: 3,
        },
        {
          text: this.$t('app.tab.area'),
          completed: false,
          step: 4,
        },
        {
          text: this.$t('app.tab.pos'),
          completed: false,
          step: 5,
        },
        {
          text: this.$t('app.tab.contract'),
          completed: false,
          step: 6,
        },

        {
          text: this.$t('app.tab.contract'),
          completed: false,
          step: 7,
          sub_step: true,
        },
        {
          text: this.$t('app.tab.contract'),
          completed: false,
          step: 8,
          sub_step: true,
        },
        {
          text: this.$t('app.tab.contract'),
          completed: false,
          step: 9,
          sub_step: true,
        },
        {
          text: this.$t('app.tab.contract'),
          completed: false,
          step: 10,
          sub_step: true,
        },
      ],
      context: {},
      loading: false,
    }
  },

  watch: {
    completed_step() {
      this.steps_progress = Math.floor((this.completed_step / this.max_steps) * 100)
    },
  },

  async mounted() {
    this.max_steps = this.steps_tabs.length // on défini la taille max de tabs
    this.steps_progress = Math.floor((this.completed_step / this.max_steps) * 100)

    const response = await this.$api({
      entity: 'ticket',
      action: 'read-rich',
      filter: { ticket_id: this.$route.params.id },
    })
    this.ticket = response.data.data.data[0]
  },
  methods: {
    async next_step() {
      this.loading = true
      try {
        if (this.current_step === 1) {
          this.context.customergroup_id = await this.$refs.step1.validate()
        } else if (this.current_step === 2) {
          this.context.company = await this.$refs.step2.validate()
        } else if (this.current_step === 3) {
          this.context.locations = this.$refs.step3.locations
        } else if (this.current_step === 4) {
          this.context.areas = this.$refs.step4.areas
        } else if (this.current_step === 5) {
          this.context.pos = this.$refs.step5.pos
        } else if (this.current_step === 6) {
          this.context.contract = await this.$refs.step6.validate()
        } else if (this.current_step === 7) {
          this.context.contractAreas = await this.$refs.step7.contractAreas
        } else if (this.current_step === 8) {
          this.context.contractcriterias = await this.$refs.step8.contractcriterias
        } else if (this.current_step === 9) {
          this.context.contractspecialrights = await this.$refs.step9.contractspecialrights
        } else if (this.current_step === 10) {
          this.context.recurringpayments = await this.$refs.step10.recurringpayments
        }
      } catch (e) {
        console.error(e)
        return
      } finally {
        this.steps_tabs[this.current_step - 1].completed = true
        this.loading = false
      }

      this.goToStep(this.current_step + 1)
    },
    goToStep(step) {
      this.current_step = step
      if (step <= 10) this.steps_tabs[this.current_step - 1].completed = false
      this.evaluate_completed_steps()
    },
    prev_step() {
      if (this.current_step === 5) {
        this.context.pos = this.$refs.step5.pos
      }
      this.goToStep(this.current_step - 1)
    },
    skip_step() {
      if (this.current_step !== this.max_steps) {
        this.current_step++
      }
    },
    jump_step_to(step) {
      this.current_step = step
    },

    validate_current_form() {
      // validation des formulaires
      return true
    },

    evaluate_completed_steps() {
      this.completed_step = 0
      this.steps_tabs.forEach(step => {
        this.completed_step += (step.completed) ? 1 : 0
      })
    },
  },

}
</script>

<style scoped>
@import '../../../assets/scss/pages/page-users.scss';

.bg-pink {
  background: #D5113010;
}

.step_tab {
  transition: 500ms;
}

.step_completed, .step_tab:hover > div > div, .step_tab:hover > div:first-child {
  background: #D51130;
  color: #fff !important;
  cursor: pointer;
}
</style>
