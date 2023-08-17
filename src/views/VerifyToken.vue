<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <b-card class="mb-0 card-transparent shadow-none">
        <b-link class="brand-logo">
          <vuexy-logo/>
        </b-link>

        <div class="d-flex justify-content-center">
          <b-spinner v-if="loading" variant="primary" size="lg"/>
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
import {
  BCard,
  BLink,
  BSpinner,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from '@/auth/jwt/useJwt'
import BrowserId from 'browser-id'

export default {
  components: {
    // BSV
    BCard,
    BLink,
    VuexyLogo,
    BSpinner,
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
  mounted() {
    this.verify()
  },
  methods: {
    verify() {
      this.loading = true
      this.$http.post('/auth/login/2fa', {
        user_browser_hash: BrowserId(),
        login_activity_2fa_token: this.$route.params.token,
      })
        .then(({ data }) => {
          useJwt.setToken(data.user_token)
          localStorage.setItem('userEmail', data.user.user_email)
          useJwt.redirectAfterLogin(this)
        })
        .catch(e => {
          this.message = this.$t(e.response.data.detail)
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '../assets/scss/pages/page-auth.scss';
</style>
