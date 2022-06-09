import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'https://contabo.lx42.de/8001/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const { $vue } = window
  if (error.response.status === 403) {
    $vue.$errorToast($vue.$t('general.unauthorized'))
  } else if (error.response.status === 503) {
    $vue.$errorToast($vue.$t('general.server_down'))
  }
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$http = axiosIns

export default axiosIns
