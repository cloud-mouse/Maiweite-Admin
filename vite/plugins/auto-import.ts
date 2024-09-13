import autoImport from 'unplugin-auto-import/vite'
// 自定引入插件
export default function createAutoImport() {
  return autoImport({
    // 需要全局引入的
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    // 生成ts类型文件的路径.
    // 如果本地安装了 ts, 默认是 './auto-imports.d.ts'
    // 设置成 `false` 关闭
    dts: './src/types/auto-imports.d.ts',
    // 自动导入的目录，默认只扫描一层
    dirs: [
      './src/hooks/**',
    ],
  })
}
