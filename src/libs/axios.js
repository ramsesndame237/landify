import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:8081/',
  timeout: 60000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const axiosFileIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:8081/',
  timeout: 600000,
  headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer johndoe@example.com' },
})

axiosIns.interceptors.response.use(response =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const { $vue } = window
    if (error.response) {
      if (error.response.status === 403) {
        $vue.$errorToast($vue.$t('general.unauthorized'))
      } else if (error.response.status === 503) {
        $vue.$errorToast($vue.$t('general.server_down'))
      }
    }
    // Do something with response error
    return Promise.reject(error)
  })

Vue.prototype.$http = axiosIns
Vue.prototype.$api = data => axiosIns.post(`/api/?${data.entity}`, { a: data })
Vue.prototype.$upload = data => axiosFileIns.post('/uploadxlsx/', data)

export default axiosIns

export const api = Vue.prototype.$api
export const upload = Vue.prototype.$upload
