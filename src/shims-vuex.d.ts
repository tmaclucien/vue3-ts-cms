/* eslint-disable */
// 解决vue模板中使用$store报ts错误
import store from '@/store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: store
  }
}
