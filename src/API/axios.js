import Vue from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api/'
}
console.log(process.env.NODE_ENV )
axios.defaults.headers.Authorization = localStorage['token'] || "null"
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
    // Toast('数据加载中···');
  config.headers['x-csrf-token'] = Cookies.get('csrfToken')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 在这里对返回的数据进行处理
// 在这里添加你自己的逻辑
axios.interceptors.response.use(
  res => {
  if (res.data.code !== undefined) {
    if (res.data.code !== 0) {
      console.log(res.data.msg)
      return Promise.reject(res.data.msg)
    } else {
      return res.data.data
    }
  } else {
    return res.data
  }
},
 error => {
   console.log('error',error)
  if (error.response.status === 401) {
    console.log(this)

  } else {

    return Promise.reject(error)

  }
})
Vue.prototype.$axios = axios
console.log(axios.defaults)
export default axios
