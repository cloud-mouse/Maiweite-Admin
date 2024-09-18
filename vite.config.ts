import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { createProxy } from './vite/proxy'
import createVitePlugins from './vite/plugins'
import { wrapperEnv } from './vite/utils'

// https://vitejs.dev/config/
export default async ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PROXY, VITE_OPEN_PROXY } = viteEnv
  const isBuild = command === 'build'
  // 全局 scss 资源
  const scssResources = []
  fs.readdirSync('src/assets/styles/resources').forEach((dirname) => {
    if (fs.statSync(`src/assets/styles/resources/${dirname}`).isFile()) {
      scssResources.push(`@use "src/assets/styles/resources/${dirname}" as *;`)
    }
  })
  return defineConfig({
    base: './',
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      port: 5173,
      host: '0.0.0.0',
      proxy: createProxy(VITE_PROXY, VITE_OPEN_PROXY),
    },
    build: {
      outDir: 'dist', // 相对于根目录的构建输出位置。如果目录存在，则将在构建之前删除该目录。
      minify: 'esbuild', // 混淆器，terser 构建后文件体积更小，'boolean' | 'terser' | 'esbuild'
      reportCompressedSize: true,
      // 规定触发警告的 chunk 大小.默认500
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^/]*)\//)?.groups!.moduleName ?? 'vender'
            }
          },
        },
      },
    },
    esbuild: {
      // 清除全局的console.log和debug
      drop: isBuild ? ['console', 'debugger'] : [],
    },
    plugins: createVitePlugins(env, isBuild),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(''),
        },
      },
    },
  })
}
