<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card v-if="!show" class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>
        <b-card-text class="mb-2 text-center">
          {{ message }}
        </b-card-text>
      </b-card>
      <b-card v-if="show" class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>

        <b-card-title class="mb-1 font-weight-bolder"> Reset password </b-card-title>
        <b-card-text class="mb-2">
          Welcome, please enter your new password to proceed.
        </b-card-text>

        <!-- form -->
        <validation-observer ref="loginForm">
          <b-form class="auth-login-form mt-2" @submit.prevent>

            <!-- new password -->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="Password"
                vid="confirm"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="password"
                    v-model="password"
                    class="form-control-merge"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false : null"
                    name="password"
                    placeholder="New Password"
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

            <!-- new password confirmation-->
            <b-form-group>
              <validation-provider
                #default="{ errors }"
                name="PasswordConfirm"
                rules="required|confirmed:confirm"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-input-group-prepend is-text>
                    <feather-icon class="cursor-pointer" icon="LockIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="passwordConfirm"
                    v-model="passwordConfirm"
                    type="password"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    name="confirm-password"
                    placeholder="Confirm Password"
                  />

                  <!-- <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" icon="EyeIcon" />
                  </b-input-group-append> -->
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <div class="text-center">
              <b-button
                variant="primary"
                type="submit"
                style="display: inline-flex"
                pill
                @click="validationForm"
              >
                <span style="line-height: 24px" class="mr-1">Send</span>
                <b-spinner v-if="loading" style="width: 24px; height: 24px" />
                <feather-icon v-else size="24" icon="ArrowRightIcon" />
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
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
} from "bootstrap-vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent";
import useJwt from "@/auth/jwt/useJwt";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import { defineRules } from "@/libs/acl/ability";
import { EyeIcon } from "vue-feather-icons";

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
      password: "",
      passwordConfirm: "",
      status: "",
      loading: false,
      // validation rules
      required,
      show: true,
      message: "",
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          const data = {
            new_password: this.password,
            reset_password_oauth_token: this.$route.params.token
          };
          const userId = localStorage.getItem("userId")
          this.loading = true;
          this.$http
            .put('/auth/reset-password/confirmation', data)
            .then(async (resp) => {
              if (resp.data.message) {
                this.$toast({
                  component: ToastificationContent,
                  props: {
                    title: resp.data.message,
                    icon: 'BellIcon',
                  },
                })
                this.show = false;
                this.$router.push({
                  name: "login",
                });
              }
            })
            .catch((e) => {
              let title;
              if (e.response) {
                title = e.response.data.detail;
              }
              this.$errorToast(this.$t(title));
            })
            .finally(() => (this.loading = false));
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "../assets/scss/pages/page-auth.scss";
</style>
