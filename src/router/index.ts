import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import '@/assets/styles/nprogress.scss'

import { asyncRoutes, constantRoutes } from './routes'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useRouteStore from '@/store/modules/route'
import useMenuStore from '@/store/modules/menu'

const { isLoading } = useNProgress()

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const routeStore = useRouteStore()
  const menuStore = useMenuStore()
  const settingsStore = useSettingsStore()
  settingsStore.settings.app.enableProgress && (isLoading.value = true)
  // 是否已登录
  if (userStore.isLogin) {
    // 是否已根据权限动态生成并注册路由
    if (routeStore.isGenerate) {
      // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
      settingsStore.settings.menu.menuMode !== 'single' && menuStore.setActived(to.path)
      // 如果已登录状态下，进入登录页会强制跳转到主页
      if (to.name === 'login') {
        next({
          path: settingsStore.settings.home.fullPath,
          replace: true,
        })
      }
      // 如果未开启主页，但进入的是主页，则会进入侧边栏导航第一个模块
      else if (!settingsStore.settings.home.enable && to.fullPath === settingsStore.settings.home.fullPath) {
        if (menuStore.sidebarMenus.length > 0) {
          next({
            path: menuStore.sidebarMenusFirstDeepestPath,
            replace: true,
          })
        }
        // 如果侧边栏导航第一个模块均无法命中，则还是进入主页
        else {
          next()
        }
      }
      else {
        // 正常访问页面
        next()
      }
    }
    else {
      // 获取用户权限
      // settingsStore.settings.app.enablePermission && await userStore.getPermissions()
      // 生成动态路由
      switch (settingsStore.settings.app.routeBaseOn) {
        case 'frontend':
          routeStore.generateRoutesAtFront(asyncRoutes)
          break
        case 'backend':
          await routeStore.generateRoutesAtBack()
          break
      }
      // 注册并记录路由数据
      // 记录的数据会在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
      const removeRoutes: (() => void)[] = []
      routeStore.flatRoutes.forEach((route) => {
        if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
          removeRoutes.push(router.addRoute(route as RouteRecordRaw))
        }
      })
      routeStore.flatSystemRoutes.forEach((route) => {
        removeRoutes.push(router.addRoute(route as RouteRecordRaw))
      })
      routeStore.setCurrentRemoveRoutes(removeRoutes)
      // 动态路由生成并注册后，重新进入当前路由
      next({
        path: to.path,
        query: to.query,
        replace: true,
      })
    }
  }
  else {
    if (to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath !== settingsStore.settings.home.fullPath ? to.fullPath : undefined,
        },
      })
    }
    else {
      next()
    }
  }
})

router.afterEach((to) => {
  const settingsStore = useSettingsStore()
  settingsStore.settings.app.enableProgress && (isLoading.value = false)
  // 设置页面 title
  settingsStore.setTitle(to.meta.breadcrumbNeste?.at(-1)?.title ?? to.meta.title)
})

export default router
/** Setup Vue Router */
export async function setupRouter(app: any) {
  app.use(router)
  await router.isReady()
}
