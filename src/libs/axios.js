import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
<<<<<<< 8debbe8d3bc8043074c4b74dca4248b8f3b2c412
  baseURL: "http://192.168.1.29:8000",
  // baseURL: process.env.VUE_APP_BASE_URL,
=======
  // baseURL: 'https://api.preprod.seybold-fm.com',
  baseURL: process.env.VUE_APP_BASE_URL,
>>>>>>> 94e6082c427ee9be6d6ecf609436ffe5648414d7
  timeout: 120000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const axiosFileIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: "http://192.168.1.29:8000",
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
