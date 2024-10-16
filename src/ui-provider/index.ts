import type { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 注册表单设计器
import { setupElementPlus } from '@/components/FormDesign/ui/index.ts'

async function install(app: App) {
  app.use(ElementPlus)
  // 注册Element UI
  setupElementPlus()
}

export default { install }
