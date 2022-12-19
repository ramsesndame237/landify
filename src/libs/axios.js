import Vue from 'vue'

// axios
import axios from 'axios'
import moment from 'moment'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'https://contabo.lx42.de/8001',
  timeout: 120000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const axiosFileIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'https://contabo.lx42.de/8001',
  timeout: 600000,
  headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer johndoe@example.com' },
})

axiosIns.interceptors.response.use(response => response,
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
Vue.prototype.$api = data => {
  return axiosIns.post(`/api/?${data.entity}`, { a: data })
    .catch(error => {
      if (data.entity !== '1__log') {
        console.log('my error', error)
        const userEmail = localStorage.getItem('userEmail')
        axiosIns.post('/api/?log', {
          a: {
            action: 'create',
            entity: '1__log',
            data: [
              {
                log_json_request: data,
                log_timestamp: moment().format('YYYY-MM-DD HH:mm'),
                log_json: {
                  user_email: userEmail,
                  url: window.location.href,
                  status: error.response?.status,
                  response: error.response?.data,
                  message: error.message,
                },
              },
            ],
          },
        })
      }
      return Promise.reject(error)
    })
}
Vue.prototype.$upload = data => axiosFileIns.post('/uploadxlsx/', data)

export default axiosIns

export const api = Vue.prototype.$api
export const upload = Vue.prototype.$upload
