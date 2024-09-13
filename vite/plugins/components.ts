import components from 'unplugin-vue-components/vite'
// 自动导入 Vue 组件的插件
export default function createComponents() {
  return components({
    dirs: [
      'src/components',
      'src/layouts/ui-kit-components',
    ],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: './src/types/components.d.ts',
  })
}
