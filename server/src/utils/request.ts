import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  timeout: 5 * 1000
})

// 设置请求拦截
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 设置响应拦截
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
