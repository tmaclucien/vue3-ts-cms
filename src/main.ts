import { createApp } from 'vue'
import App from './App.vue'
import registerPlugins from './plugins' // 注册插件

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
