import Axios from 'axios'

const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  // timeout: 5000, // request timeout
  method: 'POST'
})

service.interceptors.request.use(config => {
  return config
}, error => {
  if (error.status === '504') {
    alert('网关超时')
  } else {
    alert('网络超时')
  }
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response.data instanceof String ? JSON.parse(response.data) : response.data)
  } else {
    alert(response.data.msg)
    return Promise.reject(response.data)
  }
}, error => {
  if (error.response && /^5/.test(error.response.status)) {
    alert('服务无响应, 请稍后重试')
  } else {
    alert(error.response.statusText)
  }
  return Promise.reject(error.response)
})

export default service
