<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card v-if="!show" class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>
        <b-card-text class="mb-2 text-center">
          {{ message }}
        </b-card-text>
      </b-card>
      <b-card v-if="show" class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>

        <b-card-title class="mb-1 font-weight-bolder">
          Login
        </b-card-title>
        <b-card-text class="mb-2">
          Welcome, enter your login credentials to proceed (Hello World!)
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- email -->
            <b-form-group>
              <validation-provider #default="{ errors }" name="Email" rules="required|email">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="UserIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="email" v-model="userEmail" name="login-email"
                                :state="errors.length > 0 ? false : null" placeholder="john@example.com" autofocus/>
                </b-input-group>

                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <validation-provider #default="{ errors }" name="Password" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="password" v-model="password" :type="passwordFieldType" class="form-control-merge"
                                :state="errors.length > 0 ? false : null" name="login-password" placeholder="Password"/>

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility"/>
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                  Remember Me
                </b-form-checkbox>
                <b-link :to="{ name: 'forgot-password' }">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
            </b-form-group>

            <!-- submit button -->
            <div class="text-center">
              <b-button variant="primary" type="submit" style="display: inline-flex" pill @click="validationForm">
                <span style="line-height: 24px" class="mr-1">Login</span>
                <b-spinner v-if="loading" style="width: 24px; height: 24px"/>
                <feather-icon v-else size="24" icon="ArrowRightIcon"/>
              </b-button>
            </div>
          </b-form>
        </validation-observer>

        <!--        <b-card-text class="text-center mt-2">-->
        <!--          <span>Dont have an account? </span>-->
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
  BSpinner,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from '@/auth/jwt/useJwt'
import BrowserId from 'browser-id'

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
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: '',
      password: '',
      status: '',
      loading: false,
      // validation rules
      required,
      email,
      show: true,
      message: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const data = {
            user_email: this.userEmail,
            user_password: this.password,
            user_browser_hash: BrowserId(),
          }
          this.loading = true
          this.$http
            .post('/auth/login', data)
            .then(async resp => {
              if (resp.data.reset_password) {
                await this.$router.push({
                  name: 'change-password',
                  query: { token: resp.data.token, email: this.userEmail },
                })
              }
              if (!resp.data.user_token) {
                this.message = this.$t(resp.data.message)
                this.show = false
                return
              }

              useJwt.setToken(resp.data.user_token)
              useJwt.setRefreshToken(resp.data.user_refresh_token)
              if (resp.data.user) {
                localStorage.setItem('userEmail', resp.data.user.user_email)
                await useJwt.redirectAfterLogin(this)
              }
            })
            .catch(e => {
              console.error(e)
              let title
              if (e.response) {
                title = e.response.data.detail
              }
              this.$errorToast(this.$t(title))
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "../assets/scss/pages/page-auth.scss";
</style>
