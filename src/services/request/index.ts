/**
 * axios拦截器封装维度：全局/实例/请求
 */
import axios, {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig
} from 'axios'
import type { HTTPRequestConfig, CustomInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

/**
 * class类相对于函数式编程方式去封装axios，具备更强的封装性，同时也更易于扩展和继承
 */
class HTTPRequest {
  instance: AxiosInstance
  customInterceptors?: CustomInterceptors
  loading?: LoadingInstance
  showLoading?: boolean
  constructor(config: HTTPRequestConfig) {
    // 1. 创建axios实例
    this.instance = axios.create(config)
    // 2. 其他配置
    this.customInterceptors = config.customInterceptors
    this.showLoading = config.showLoading ?? true // 默认有加载效果
    /**
     * 实例自定义拦截器:从配置中取
     */
    this.instance.interceptors.request.use(
      this.customInterceptors?.requestInterceptor,
      this.customInterceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.customInterceptors?.responseInterceptor,
      this.customInterceptors?.responseInterceptorCatch
    )
    /**
     * 全局公共拦截器
     */
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log('公共拦截：请求拦截成功')
        // 全局loading效果
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err: any) => err
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('公共拦截：响应拦截成功')
        //关闭全局loading
        this.loading?.close()
        // 因为这里我们对返回结果处理了，所以再真正请求拿到的res就不是AxiosResponse类型了
        return res.data
      },
      (err: any) => {
        // 一般服务器返回的状态码 4xx或者5xx都会走到response err这里。但是实际项目中服务器会返回状态码2xx的错误情况，比如{status:200,success: false, returnCode: -100001}
        //关闭全局loading
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HTTPRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求的请求拦截器
      if (config.customInterceptors?.requestInterceptor) {
        config = config.customInterceptors.requestInterceptor(
          config as InternalAxiosRequestConfig
        )
      }
      // 2.单个请求判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //3. 单个请求的响应拦截
          if (config.customInterceptors?.responseInterceptor) {
            res = config.customInterceptors.responseInterceptor(res)
          }
          resolve(res)
          this.showLoading = true // 重要：如果某个请求设置了loading：false，其实是会影响到我们一开始设置的默认loading:true，这样就会导致其他请求也没有了loading。所以这里请求拿到结果之后得重新设置为true
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HTTPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HTTPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HTTPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  put<T>(config: HTTPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
}

export default HTTPRequest
