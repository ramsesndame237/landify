<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <b-card class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>

        <div class="d-flex justify-content-center">
          <b-spinner variant="primary" size="lg" v-if="loading"/>
          <div v-else>
            {{ message }}
          </div>
        </div>

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
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import useJwt from "@/auth/jwt/useJwt";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import { defineRules } from "@/libs/acl/ability";
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
      message: '',
    }
  },
  methods: {
    verify() {
      this.$http.post('/auth/login/2fa', {
        user_browser_hash: BrowserId(),
        login_activity_2fa_token: this.$route.params.token,
      })
        .then(({ data }) => {
          useJwt.setToken(data.user_token)
          localStorage.setItem('userEmail', data.user.user_email)
          useJwt.redirectAfterLogin(this)
        })
        .catch((e) => {
          this.message = e.response.data.detail
          this.loading = false
        })
    },
  },
  mounted() {
    this.verify()
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '../assets/scss/pages/page-auth.scss';
</style>
