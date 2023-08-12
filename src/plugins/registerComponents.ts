/**
 * 该插件为全局注册自定义组件
 */
import { App, Component } from 'vue'
import GlobalComponents from '@/components/index'

export default {
  install: (app: App): void => {
    Array.from(GlobalComponents).forEach((component: Component) => {
      app.component(component.name as string, component as Component)
    })
  }
}
