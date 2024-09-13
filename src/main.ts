import FloatingVue from 'floating-vue' // 轻巧高效的提示与下拉菜单
import 'floating-vue/dist/style.css'
import 'overlayscrollbars/overlayscrollbars.css' // 伪滚动条
import Message from 'vue-m-message' // 全局消息提示
import 'vue-m-message/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import ui from './ui-provider' // 加载ui框架库

import errorHandler from './utils/errorHandler'
import { setupRouter } from './router'
import directives from './directives'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'virtual:uno.css'
// 全局样式
import '@/assets/styles/globals.scss'
// element-plus样式覆盖
import '@/assets/styles/element.scss'

async function setupApp() {
  const app = createApp(App)
  // 注册Element UI
  app.config.errorHandler = errorHandler

  app.use(FloatingVue, {
    distance: 12,
  })
  app.use(Message)
  app.use(pinia)

  app.use(ui) // 注册UI库
  app.use(directives) // 注册自定义指令
  await setupRouter(app)
  if (icons.isOfflineUse) {
    for (const info of icons.collections) {
      downloadAndInstall(info)
    }
  }

  app.mount('#app')
}
setupApp()
