import VueDevTools from 'vite-plugin-vue-devtools'
// 引入VueDevTools支持 方便调试
export default function createDevtools(env) {
  const { VITE_OPEN_DEVTOOLS } = env
  return VITE_OPEN_DEVTOOLS === 'true' && VueDevTools()
}
