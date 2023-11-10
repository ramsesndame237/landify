<template>
  <div class="d-stepper">
    <div class="d-stepper-header d-flex justify-content-around">
      <div
        v-for="(stepItem, i) in steps"
        :key="i"
        class="step-number-content text-center cursor-pointer"
        :class="{ active: step == i}"
        @click="step = i"
      >
        <div
          class="step-number align-items-center justify-content-center mx-auto"
          :class="stepNumberClasses(i)"
        >
          <feather-icon v-if="step > i" icon="CheckIcon"/>
          <i v-else-if="step === i && fatalError" class="fas fa-exclamation"/>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <div class="mt-1 small">
          {{ stepItem.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DStepper',
  props: {
    steps: {
      type: Number,
      default: 0
    },
    handleAction: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      step: 0,
      loading: false,
      error: false,
      fatalError: false,
      fatalErrorMsg: '',
      effect: 'in-out-translate-fade',
      shake: false,
    }
  },
  computed: {
    activeStep() {
      return this.steps[this.step]
    },
    stepComponent() {
      return this.steps[this.step].component
    },
    iconClasses() {
      if (!this.activeStep.icon) return ''
      if (/\s/.test(this.activeStep.icon)) return this.activeStep.icon
      return `fas ${this.activeStep.icon}`
    },
  },
  watch: {
    step(newValue) {
      this.$emit('send-step-value', newValue)
    },
    handleAction(newValue) {
      console.log({ newValue })
      if (newValue === 'next') {
        this.nextStepAction()
      } else if(newValue === 'back') {
        this.backStep()
      }else{
        this.handleAction = ''
      }
    },
  },
  methods: {
    setStep(step) {
      if (step >= 1 && step <= this.steps) this.step = step - 1
    },
    resetState() {
      this.store.state = {
        ...this.initialState,
      }
    },
    setState(key, value) {
      this.store.state = {
        ...this.store.state,
        [key]: value,
      }
    },
    errorHandler(payload) {
      this.error = payload
      this.shake = payload
      setTimeout(() => {
        this.shake = !payload
      }, 750)
    },
    blockStepper(msg) {
      this.resetParams()
      this.fatalErrorMsg = msg
      this.fatalError = true
    },
    resetParams() {
      this.error = false
      this.loading = false
      this.fatalErrorMsg = ''
      this.fatalError = false
    },
    stepNumberClasses(i) {
      return {
        'bg-primary text-white': this.step === i && !this.fatalError,
        'bg-success text-white': this.step > i && !this.fatalError,
        'bg-danger text-white': this.fatalError && this.step === i,
        'text-primary': this.step < i,
      }
    },
    nextStepAction() {
      this.effect = 'in-out-translate-fade'
      this.resetParams()
      console.log('this is the step', this.step)
      if (this.step < this.steps - 1) this.step++
      this.handleAction = ''
    },
    backStep() {
      this.effect = 'out-in-translate-fade'
      this.resetParams()
      if (this.step > 0) this.step--
      this.handleAction = ''
    },
    loadingAction(status) {
      this.loading = status
    },
  },

}
</script>

<style>
.d-stepper {
  width: 100%;
}

.d-stepper .d-stepper-header {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.d-stepper .d-stepper-header::before {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #DDD;
  top: 20px;
  left: 0;
  content: " ";
}

.d-stepper .step-number {
  background: #E9E9E9;
  border-radius: 50%;
  text-align: center;
  height: 2.78vw;
  width: 2.78vw;
  display: flex;
}

.d-stepper .step-number-content {
  transition: transform 0.2s;
  z-index: 2;
  width: 4.72vw;
}

.d-stepper .step-number-content div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.d-stepper .step-number-content.active {
  transform: scale(1.25);
}

.in-out-translate-fade-enter-active,
.in-out-translate-fade-leave-active {
  transition: all 0.15s;
}

.in-out-translate-fade-enter,
.in-out-translate-fade-leave-active {
  opacity: 0;
}

.in-out-translate-fade-enter {
  transform: translateX(100px);
}

.in-out-translate-fade-leave-active {
  transform: translateX(-100px);
}

.out-in-translate-fade-enter-active,
.out-in-translate-fade-leave-active {
  transition: all 0.15s;
}

.out-in-translate-fade-enter,
.out-in-translate-fade-leave-active {
  opacity: 0;
}

.out-in-translate-fade-enter {
  transform: translateX(-100px);
}

.out-in-translate-fade-leave-active {
  transform: translateX(100px);
}
</style>
