import Layouts from 'vite-plugin-vue-meta-layouts'
// vite 的 vue-router 的元信息布局系统
export default function createLayouts() {
  return Layouts({
    target: 'src/layouts', // 布局目录，默认 src/layouts
    defaultLayout: 'index', // 默认布局，默认为 default
    importMode: 'sync', // 加载模式，支持 sync 和 async。默认为自动处理，SSG 时为 sync，非 SSG 时为 async
    skipTopLevelRouteLayout: true, // 打开修复 https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134，默认为 false 关闭
  })
}
