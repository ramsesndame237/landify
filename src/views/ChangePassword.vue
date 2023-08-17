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
          Change password
        </b-card-title>
        <b-card-text class="mb-2">
          Welcome, please change your password to proceed.
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm" #default="">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!--            &lt;!&ndash; old password &ndash;&gt;-->
            <!--            <b-form-group label="Enter your old password">-->
            <!--              <validation-provider #default="{ errors }" name="OldPassword" rules="required">-->
            <!--                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">-->
            <!--                  <b-input-group-prepend is-text>-->
            <!--                    <feather-icon class="cursor-pointer" icon="LockIcon" />-->
            <!--                  </b-input-group-prepend>-->
            <!--                  <b-form-input id="oldPassword" v-model="oldPassword" :type="passwordFieldType" name="login-email"-->
            <!--                                :state="errors.length > 0 ? false : null" placeholder="Old Password" autofocus-->
            <!--                  />-->

            <!--                  <b-input-group-append is-text>-->
            <!--                    <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />-->
            <!--                  </b-input-group-append>-->
            <!--                </b-input-group>-->

            <!--                <small class="text-danger">{{ errors[0] }}</small>-->
            <!--              </validation-provider>-->
            <!--            </b-form-group>-->

            <!-- new password -->
            <b-form-group label="Enter your new password">
              <validation-provider #default="{ errors }" name="Password" vid="confirm" rules="required">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="password" v-model="password" class="form-control-merge" :type="newPasswordFieldType"
                                :state="errors.length > 0 ? false : null" name="password" placeholder="New Password"/>

                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="newPasswordToggleIcon"
                                  @click="toggleNewPasswordVisibility"/>
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- new password confirmation-->
            <b-form-group>
              <validation-provider #default="{ errors }" name="PasswordConfirm" rules="required|confirmed:confirm">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon"/>
                  </b-input-group-prepend>
                  <b-form-input id="passwordConfirm" v-model="passwordConfirm" type="password"
                                class="form-control-merge" :state="errors.length > 0 ? false : null"
                                name="confirm-password" placeholder="Confirm Password"/>

                  <!-- <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" icon="EyeIcon" />
                  </b-input-group-append> -->
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <div class="text-center">
              <b-button variant="primary" type="submit" style="display: inline-flex" pill @click="validationForm">
                <span style="line-height: 24px" class="mr-1">Send</span>
                <b-spinner v-if="loading" style="width: 24px; height: 24px"/>
                <feather-icon v-else size="24" icon="ArrowRightIcon"/>
              </b-button>
            </div>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <!--          <span>Already have an account? </span>-->
          <b-link :to="{ name: 'login' }">
            <span>Sign In</span>
          </b-link>
        </b-card-text>

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
  BSpinner,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from '@/auth/jwt/useJwt'

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
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      status: '',
      loading: false,
      // validation rules
      required,
      show: true,
      message: '',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    newPasswordToggleIcon() {
      return this.newPasswordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          const data = {
            old_password: this.oldPassword,
            new_password: this.password,
            reset_password_oauth_token: this.$route.query.token,
          }
          this.loading = true
          this.$http
            .put('/users/new-password', data)
            .then(async resp => {
              if (!resp.data.user_token) {
                this.message = this.$t(resp.data.message)
                this.show = false
                return
              }
              useJwt.setToken(resp.data.user_token)
              useJwt.setRefreshToken(resp.data.user_refresh_token)
              localStorage.setItem('userEmail', resp.data.user.user_email)
              await useJwt.redirectAfterLogin(this)
            })
            .catch(e => {
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
