<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>

        <b-card-title class="mb-1 font-weight-bolder">
          Login
        </b-card-title>
        <b-card-text class="mb-2">
          Welcome,  enter your login credentials to proceed
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
                label-for="password"
                label="Password">
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
                <b-link :to="{name:'auth-forgot-password-v1'}">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
            </b-form-group>

            <!-- submit button -->
            <div class="text-center">
              <b-button
                  variant="primary"
                  type="submit"
                  pill

                  @click="validationForm"
              >
                <span style="line-height: 24px" class="mr-1">Login</span>
                <feather-icon size="24" icon="ArrowRightIcon" />
              </b-button>
            </div>

          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Dont have an account? </span>
          <b-link :to="{name:'auth-register-v1'}">
            <span>Sign Up</span>
          </b-link>
        </b-card-text>

<!--        <div class="divider my-2">-->
<!--          <div class="divider-text">-->
<!--            or-->
<!--          </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; social button &ndash;&gt;-->
<!--        <div class="auth-footer-btn d-flex justify-content-center">-->
<!--          <b-button-->
<!--            href="javascript:void(0)"-->
<!--            variant="facebook"-->
<!--          >-->
<!--            <feather-icon icon="FacebookIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--            href="javascript:void(0)"-->
<!--            variant="twitter"-->
<!--          >-->
<!--            <feather-icon icon="TwitterIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--            href="javascript:void(0)"-->
<!--            variant="google"-->
<!--          >-->
<!--            <feather-icon icon="MailIcon" />-->
<!--          </b-button>-->
<!--          <b-button-->
<!--            href="javascript:void(0)"-->
<!--            variant="github"-->
<!--          >-->
<!--            <feather-icon icon="GithubIcon" />-->
<!--          </b-button>-->
<!--        </div>-->
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
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
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: '',
      password: '',
      status: '',
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Form Submitted',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
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
