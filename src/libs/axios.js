import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://192.168.1.38:8001',
  // baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 120000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const axiosFileIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: 'http://192.168.1.38:8001',
  timeout: 600000,
  headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer johndoe@example.com' },
})

Vue.prototype.$http = axiosIns
Vue.prototype.$api = data => axiosIns.post(`/api/?${data.entity}`, { a: data })
Vue.prototype.$upload = data => axiosFileIns.post('/uploadxlsx/', data)

export default axiosIns

export const http = Vue.prototype.$http
export const api = Vue.prototype.$api
export const upload = Vue.prototype.$upload
