//service统一入口
import HTTPRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

/**
 * 一个项目中axios请求的baseUrl可能会不同，所以class封装的好处在于我们可以通过这个类去创建两个请求实例
 */
const http1 = new HTTPRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 每一个实例都可以自定义自己的请求拦截器(实例维度的拦截)
  customInterceptors: {
    requestInterceptor: (config) => {
      console.log('实例自定义拦截：请求拦截成功')
      const token = 'xxx'
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('实例自定义拦截：请求拦截失败')
      return err
    },
    responseInterceptor: (config) => {
      console.log('实例自定义拦截：响应拦截成功')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log('实例自定义拦截：响应拦截失败')
      return err
    }
  }
})

const http2 = new HTTPRequest({
  baseURL: '地址2',
  timeout: TIME_OUT
})

export { http1, http2 }
