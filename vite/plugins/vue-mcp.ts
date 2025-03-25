import { VueMcp } from 'vite-plugin-vue-mcp'

// 自定引入插件
export default function createVueMcp(env, isBuild) {
  if (!isBuild) {
    return VueMcp({})
  }
}
