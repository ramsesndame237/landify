import ability, { defineRules } from '@/libs/acl/ability'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { initialAbility } from '@/libs/acl/config'
import store from '@/store'
import BrowserId from 'browser-id'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  // Will be used by this service for making API calls
  axiosIns = null

  // jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // For Refreshing Token
  subscribers = []

  constructor(axiosIns, jwtOverrideConfig) {
    this.axiosIns = axiosIns
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // Request Interceptor
    this.axiosIns.interceptors.request.use(
      config => {
        // Get token from localStorage
        const accessToken = this.getToken()

        // If token is present add it to request's Authorization Header
        if (accessToken) {
          // eslint-disable-next-line no-param-reassign
          // config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          config.headers.Authorization = `${accessToken}`
        }
        config.headers['Accept-Language'] = store.state.app.lang
        return config
      },
      error => Promise.reject(error),
    )

    // Add request/response interceptor
    this.axiosIns.interceptors.response.use(
      response => response,
      error => {
        // const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        const { $vue } = window
        // if (status === 401) {
        if (response.status === 403) {
          if (error.response.data?.detail) {
            $vue.$errorToast($vue.$t((error.response.data?.detail)))
          } else {
            $vue.$errorToast($vue.$t('general.unauthorized'))
          }
        } else if (response.status === 503) {
          $vue.$errorToast($vue.$t('general.server_down'))
        }
        if (response && response.status === 401 && ['/auth/refresh/token'].indexOf(config.url) === -1) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true
            this.refreshToken().then(r => {
              // Update accessToken in localStorage
              this.setToken(r.data.user_token)
              this.setRefreshToken(r.data.user_refresh_token)
              this.onAccessTokenFetched(r.data.user_token)
            }).catch(e => {
              console.error(e)
              // just push to login
              this.logout()
                .then(() => {
                  this.onAccessTokenFetched('')
                  return $vue.$router.push({ name: 'login' })
                })
            }).finally(() => {
              this.isAlreadyFetchingAccessToken = false
            })
          }
          const retryOriginalRequest = new Promise((resolve, reject) => {
            this.addSubscriber(accessToken => {
              if (!accessToken) {
                reject(new Error('Invalid refresh token'))
                return
              }
              // Make sure to assign accessToken according to your response.
              // Check: https://pixinvent.ticksy.com/ticket/2413870
              // Change Authorization header
              originalRequest.headers.Authorization = `${accessToken}`
              resolve(this.axiosIns(originalRequest))
            })
          })
          return retryOriginalRequest
        }
        return Promise.reject(error)
      },
    )
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      user_browser_hash: BrowserId(),
      user_refresh_token: this.getRefreshToken(),
    })
  }

  async logout() {
    // await this.axiosIns.post('/auth/logout/', {}, { query: { access_token: this.getToken() } })
    // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName)

    // Remove userData from localStorage
    localStorage.removeItem('userData')

    // Reset ability
    ability.update(initialAbility)
  }

  async redirectAfterLogin($vm) {
    const userData = await $vm.$store.dispatch('app/fetchUserData', localStorage.getItem('userEmail'))
    console.log(userData)
    $vm.$ability.update(defineRules())
    // get full user data
    await $vm.$router.replace(getHomeRouteForLoggedInUser(''))
    $vm.$toast({
      component: ToastificationContent,
      props: {
        title: 'Welcome back to ZELOS',
        icon: 'successIcon',
        variant: 'success',
      },
    })
  }
}
