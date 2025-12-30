import process from 'node:process'
import TurboConsole from 'unplugin-turbo-console/vite'

export default function createConsole(isBuild = false) {
  // 只在开发环境启用
  if (isBuild) {
    return null
  }

  // 默认禁用 TurboConsole 插件，避免端口查找失败导致开发服务器无法启动
  // 由于插件在 configureServer 中需要查找随机端口，在某些系统环境下可能失败
  // 如果需要启用此插件，可以设置环境变量 ENABLE_TURBO_CONSOLE=true
  const enableTurboConsole = process.env.ENABLE_TURBO_CONSOLE === 'true'

  if (!enableTurboConsole) {
    return null
  }

  // 返回插件实例
  return TurboConsole()
}
