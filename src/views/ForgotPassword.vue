<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>

        <template v-if="isSent">
          <b-card-text class="text-center">{{ message }}</b-card-text>
        </template>
        <template v-else>
          <b-card-title class="mb-1 font-weight-bolder">
            Forgot Password
          </b-card-title>
          <b-card-text class="mb-2">
            Please enter your email address and Verify it from your Mail box.
          </b-card-text>

          <!-- form -->
          <validation-observer ref="form" #default="{invalid}">
            <b-form class="auth-login-form mt-2" @submit.prevent>

              <!-- email -->
              <b-form-group>
                <validation-provider #default="{ errors }" name="Email" rules="required|email">
                  <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                    <b-input-group-prepend is-text>
                      <feather-icon class="cursor-pointer" icon="UserIcon"/>
                    </b-input-group-prepend>
                    <b-form-input id="email" v-model="userEmail" name="login-email"
                                  :state="errors.length > 0 ? false:null" placeholder="john@example.com" autofocus/>
                  </b-input-group>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit button -->
              <div class="text-center">
                <b-button variant="primary" type="submit" pill @click="validationForm()">
                  <span style="line-height: 24px" class="mr-1">Send</span>
                  <b-spinner v-if="loading" style="width: 24px;height: 24px"/>
                  <feather-icon v-else size="24" icon="ArrowRightIcon"/>
                </b-button>
              </div>

            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <!--          <span>Already have an account? </span>-->
            <b-link :to="{name:'login'}">
              <span>Sign In</span>
            </b-link>
          </b-card-text>

        </template>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
  BCard,
  BLink,
  BCardTitle,
  BCardText,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from "@core/components/toastification/ToastificationContent";

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      isSent: false,
      userEmail: '',
      message: '',
      // validation rules
      required,
      email,
      loading: false,
    }
  },
  methods: {
    validationForm() {
      // console.log('submited==========>>>>>>>>>')
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true
          this.$http.post('/auth/reset-password/' + this.userEmail, {})
            .then(({ data: { message } }) => {
              this.isSent = true
              this.message = message
            })
            .catch(e => {
              this.$errorToast(e.response.data.detail)
            })
            .finally(() => this.loading = false)
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '../assets/scss/pages/page-auth.scss';
</style>
