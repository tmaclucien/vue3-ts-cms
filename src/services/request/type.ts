import type {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'

export interface CustomInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  // 这里我们不用AxiosResponse的类型，而是实际数据库返回给我们的数据类型
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface HTTPRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  customInterceptors?: CustomInterceptors<T>
  showLoading?: boolean
}
