import { defaultsDeep } from 'lodash-es'
import type { RouteMeta } from 'vue-router'
import settingsDefault from '@/settings'
import type { Settings } from '#/global'
import { setLocal } from '@/utils/storage'

const useSettingsStore = defineStore(
  // 唯一ID
  'settings', () => {
    const settings = ref(settingsDefault)
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const currentColorScheme = ref<Exclude<Settings.app['colorScheme'], ''>>()
    // 设置主题颜色模式
    function setColorScheme(color: Required<Settings.app>['colorScheme']) {
      settings.value.app.colorScheme = color
    }
    // 设置主题颜色
    function setThemeColor(color: Required<Settings.app>['themeColor']) {
      settings.value.app.themeColor = color
      setLocal('themeColor', color)
    }
    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        prefersColorScheme.addEventListener('change', updateTheme)
      }
      else {
        prefersColorScheme.removeEventListener('change', updateTheme)
      }
    }, {
      immediate: true,
    })
    watch(() => settings.value.app.colorScheme, updateTheme, {
      immediate: true,
    })
    function updateTheme() {
      let colorScheme = settings.value.app.colorScheme
      if (colorScheme === '') {
        colorScheme = prefersColorScheme.matches ? 'dark' : 'light'
      }
      currentColorScheme.value = colorScheme
      switch (colorScheme) {
        case 'light':
          document.documentElement.classList.remove('dark')
          break
        case 'dark':
          document.documentElement.classList.add('dark')
          break
      }
    }
    // 更新应用配置
    function updateSettings(data: Settings.all, fromBase = false) {
      settings.value = defaultsDeep(data, fromBase ? settingsDefault : settings.value)
    }

    watch(() => settings.value.menu.menuMode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })

    // 操作系统
    const os = ref<'mac' | 'windows' | 'linux' | 'other'>('other')
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.includes('mac os'):
        os.value = 'mac'
        break
      case agent.includes('windows'):
        os.value = 'windows'
        break
      case agent.includes('linux'):
        os.value = 'linux'
        break
    }

    // 页面标题
    const title = ref<RouteMeta['title']>()
    // 记录页面标题
    function setTitle(_title: RouteMeta['title']) {
      title.value = _title
    }

    // 显示模式
    const mode = ref<'pc' | 'mobile'>('pc')
    // 设置显示模式
    function setMode(width: number) {
      if (settings.value.layout.enableMobileAdaptation) {
        // 先判断 UA 是否为移动端设备（手机&平板）
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          mode.value = 'mobile'
        }
        else {
          // 如果是桌面设备，则根据页面宽度判断是否需要切换为移动端展示
          mode.value = width < 992 ? 'mobile' : 'pc'
        }
      }
      else {
        mode.value = 'pc'
      }
    }

    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse
    }

    return {
      settings,
      os,
      currentColorScheme,
      setColorScheme,
      setThemeColor,
      updateSettings,
      title, setTitle,
      mode, setMode,
      toggleSidebarCollapse,
    }
  })
export default useSettingsStore
