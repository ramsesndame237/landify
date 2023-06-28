<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card class="" >
          <b-row>
            <b-col cols="12" class="b-light d-flex justify-content-between">
              <span> {{ $t('headline~new_business~subframe~progress') }} :</span>
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
                  <b-col cols="4">
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
      <b-col cols="12" >
        <b-card id="" class="mt-12">
          <step1 v-if="current_step===1" ref="step1" :context="context" :disabled="loading"/>
          <step2 v-if="current_step===2" ref="step2" :context="context" :disabled="loading"/>

          <div class="d-flex align-items-center justify-content-between">
            <div>
              <small>
                {{ $t('headline~new_business~subframe~customergroup') }}
              </small>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <b-button v-if="current_step > 1 && current_step < max_steps" :disabled="loading" size="md"
                        class="d-flex align-items-center" variant="warning" @click="skip_step()">
                {{ $t('app.btn.skip') }}
              </b-button>
              <b-button v-if="current_step > 1" :disabled="loading" size="md" class="d-flex align-items-center ml-2"
                        variant="danger" @click="prev_step()">
                {{ $t('app.btn.prev') }}
              </b-button>
              <b-button v-if="current_step <= max_steps" size="md" :disabled="loading"
                        class="d-flex align-items-center ml-2" variant="info" @click="next_step()">
                <b-spinner v-if="loading" small/>
                {{ $t('app.btn.next') }}
              </b-button>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard, BSpinner, BRow, BCol, BForm, BButton,
} from 'bootstrap-vue'

import Field from '@/views/app/Generic/Field.vue'
import Step1 from '@/views/app/FormComponent/SpecialrightForm/Step1.vue'
import Step2 from '@/views/app/FormComponent/SpecialrightForm/Step2.vue'

export default {
  name: "contractForm",
  components: {
    Step1,
    Step2,
    Field,
    BCard,
    BSpinner,
    BRow,
    BCol,
    BForm,
    BButton,
  },
  data() {
    return {
      table: "contract_specialright_rel",
      current_step: 1,
      max_steps: 2,
      completed_step: 0,
      steps_progress: 0,
      steps_tabs: [
        {
          text: this.$t('headline~new_contract~progress~maininfos'),
          completed: false,
          step: 1,
        },
        {
          text: this.$t('headline~new_contract~progress~areaunitusage'),
          completed: false,
          step: 2,
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

    await this.loadDefinition()
  },
  methods: {
    async next_step() {
      let hasError = false
      this.loading = true
      try {
        if (this.current_step === 1) {
          await this.$refs.step1.save()
          // this.context.contract_main_infos = await this.$refs.step1.validate()
          console.log('step 1 passed ', this.context);
        } else if (this.current_step === 2) {
          // await this.$refs.step2.submit()
          // this.context.areaUnitUsage = this.$refs.step2.areaUnitUsage
          console.log('step 2 passed ', this.context);
        }
      } catch (e) {
        hasError = true
        console.error(e)
        return
      } finally {
        this.loading = false
      }
      if (!hasError) {
        this.steps_tabs[this.current_step - 1].completed = true
      }

      this.goToStep(this.current_step + 1)
    },
    goToStep(step) {
      this.current_step = step
      if (step <= this.max_steps) this.steps_tabs[this.current_step - 1].completed = false
      this.evaluate_completed_steps()
    },
    prev_step() {
      this.goToStep(this.current_step - 1)
    },
    skip_step() {
      if (this.current_step !== this.max_steps) {
        this.current_step++
      }
    },
    jump_step_to(step) {
      // if (!this.steps_tabs[step].completed) return
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
    async loadDefinition() {
      const { data } = await this.$api({
        action: 'read-rich',
        entity: this.table,
      })
      this.$store.commit('table/setDefinition', {
        data,
        table: this.table
      })
    },
    submit(){
      console.log(this.context);
      return Promise.reject(new Error("bar"))
    }
  },

}
</script>

<style scoped>

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
