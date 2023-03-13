import Vue from 'vue'

// axios
import axios from 'axios'
import moment from 'moment'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_BASE_URL || 'https://vmd86703.contaboserver.net/8001',
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

Vue.prototype.$http = axiosIns
Vue.prototype.$api = data => axiosIns.post(`/api/?${data.entity}`, { a: data })
Vue.prototype.$upload = data => axiosFileIns.post('/uploadxlsx/', data)

export default axiosIns

export const api = Vue.prototype.$api
export const upload = Vue.prototype.$upload
