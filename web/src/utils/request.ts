import axios from 'axios'

const ipConfig = {
  dev: 'http://localhost:3001',
  build: 'https://www.antzymo.icu'
}

// 创建一个axios实例
const service = axios.create({
  baseURL: import.meta.env.DEV ? ipConfig.dev : ipConfig.build,
  timeout: 50000
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
