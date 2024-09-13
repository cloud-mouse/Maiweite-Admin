import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueLegacy from '@vitejs/plugin-legacy'

import createAutoImport from './auto-import'
import createDevtools from './devtools'
import createConsole from './console'
import createLayouts from './layouts'
import createUnocss from './unocss'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createVisualizer from './visualizer'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueLegacy({
      renderLegacyChunks: false,
      modernPolyfills: [
        'es.array.at',
        'es.array.find-last',
      ],
    }),
  ]
  vitePlugins.push(createDevtools(viteEnv))
  vitePlugins.push(createConsole())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createUnocss())
  vitePlugins.push(createLayouts())
  vitePlugins.push(...createCompression(viteEnv, isBuild))
  vitePlugins.push(createVisualizer() as any)
  return vitePlugins
}
