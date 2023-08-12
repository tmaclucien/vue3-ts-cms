/**
 * 项目所有插件
 */
import { App } from 'vue'
import router from '@/router' // 路由插件
import store from '@/store' // vuex插件
import registerComponents from './registerComponents' // 全局组件插件

const myPlugins = [router, store, registerComponents]

const registerPlugins = (app: App): void => {
  myPlugins.forEach((plugin) => {
    app.use(plugin)
  })
}

export default registerPlugins
