<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>

        <b-card-title class="mb-1 font-weight-bolder">
          Forgot Password
        </b-card-title>
        <b-card-text class="mb-2">
          <span>{{
              !isSend ? 'Please enter your email address and Verify it from your Mail box.' : 'Congragulations your email is verified please enter your new password.'
            }}</span>

        </b-card-text>

        <!-- form -->
        <validation-observer ref="form" #default="{invalid}">
          <b-form class="auth-login-form mt-2" @submit.prevent>

            <!-- email -->
            <b-form-group v-if="!isSend">
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

            <!-- password -->
            <b-form-group v-if="isSend">
              <validation-provider #default="{ errors }" name="Password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="password" v-model="password" :type="passwordFieldType" class="form-control-merge"
                                :state="errors.length > 0 ? false:null" name="login-password" placeholder="Password"/>

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility"/>
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- re-enter password -->
            <b-form-group v-if="isSend">
              <validation-provider #default="{ errors }" name="Password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid':null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="password" v-model="password" :type="passwordFieldType" class="form-control-merge"
                                :state="errors.length > 0 ? false:null" name="login-password"
                                placeholder="Re-enter Password"/>

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility"/>
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-card-text v-if="isSend" class="mt-3">
              <div class="d-flex mx-auto">
                <svg class="mr-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect width="14" height="14" rx="7" fill="#D51130"/>
                </svg>

                <span class="text-sm-left">Minimum length, allowed/mandatory characters, upper/lower case, numbers, special characters, etc.</span>
              </div>
            </b-card-text>

            <!-- submit button -->
            <div class="text-center">
              <b-button variant="primary" type="submit" pill @click="validationForm()">
                <span style="line-height: 24px" class="mr-1">{{ !isSend ? 'Send' : 'Continue' }}</span>
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

        <!--        <b-card-text class="text-center mt-2">-->
        <!--          <span>Don't have an account? </span>-->
        <!--          <b-link :to="{name:'register'}">-->
        <!--            <span>Sign Up</span>-->
        <!--          </b-link>-->
        <!--        </b-card-text>-->
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
      isSend: false,
      userEmail: '',
      password: '',
      status: '',
      // validation rules
      required,
      email,
      loading: false,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      // console.log('submited==========>>>>>>>>>')
      this.$refs.form.validate().then(success => {
        if (success) {
          this.loading = true
          this.$http.post('/auth/reset-password/' + this.userEmail, {})
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                props: {
                  title: 'Form Submitted',
                  icon: 'EditIcon',
                  variant: 'success',
                },
              })
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
