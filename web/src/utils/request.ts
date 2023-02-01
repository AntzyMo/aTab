import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000
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
    const { code, data, msg } = res.data
    if (code === 200) {
      return data
    } else {
      return Promise.reject(msg)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
