import { createApp } from 'vue'
import App from './App.vue'
import registerPlugins from './plugins' // 注册插件
import 'element-plus/dist/index.css'
import { http1 } from '@/services'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

interface ResDataType {
  data: any
  returnCode: string
  success: boolean
}

http1
  .request<ResDataType>({
    url: '/home/multidata',
    showLoading: false,
    customInterceptors: {
      requestInterceptor: (config) => {
        console.log('单个自定义请求拦截')
        return config
      }
    }
  })
  .then((res) => {
    console.log(res)
  })
