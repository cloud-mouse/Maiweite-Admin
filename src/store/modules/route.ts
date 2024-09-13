import { cloneDeep } from 'lodash-es'
import type { RouteRecordRaw } from 'vue-router'
import { resolveRoutePath } from '@/utils'
import { systemRoutes } from '@/router/routes'
// import { getAuthMenuListApi } from '@/api/modules/auth'
import type { Route } from '#/global'
import { getAuthMenuListApi } from '@/api/modules/auth'

const useRouteStore = defineStore(
  // 唯一ID
  'route',
  () => {
    const isGenerate = ref(false)
    const routesRaw = ref<Route.recordMainRaw[]>([])
    const currentRemoveRoutes = ref<(() => void)[]>([])

    // 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
    function flatAsyncRoutes<T extends RouteRecordRaw>(route: T): T {
      if (route.children) {
        route.children = flatAsyncRoutesRecursive(route.children, [{
          path: route.path,
          title: route.meta?.title,
          icon: route.meta?.icon,
          hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
        }], route.path)
      }
      return route
    }
    function flatAsyncRoutesRecursive(routes: RouteRecordRaw[], breadcrumb: Route.breadcrumb[] = [], baseUrl = ''): RouteRecordRaw[] {
      const res: RouteRecordRaw[] = []
      routes.forEach((route) => {
        // threeMenu 是否支持三级路由菜单
        if (route.children && route.children?.length && !route.meta?.threeMenu) {
          const childrenBaseUrl = resolveRoutePath(baseUrl, route.path)
          const tmpBreadcrumb = cloneDeep(breadcrumb)
          tmpBreadcrumb.push({
            path: childrenBaseUrl,
            title: route.meta?.title,
            icon: route.meta?.icon,
            hide: !route.meta?.breadcrumb && route.meta?.breadcrumb === false,
          })
          const tmpRoute = cloneDeep(route)
          tmpRoute.path = childrenBaseUrl
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          delete tmpRoute.children
          res.push(tmpRoute)
          const childrenRoutes = flatAsyncRoutesRecursive(route.children, tmpBreadcrumb, childrenBaseUrl)
          childrenRoutes.forEach((item) => {
            // 如果 path 一样则覆盖，因为子路由的 path 可能设置为空，导致和父路由一样，直接注册会提示路由重复
            if (res.some(v => v.path === item.path)) {
              res.forEach((v, i) => {
                if (v.path === item.path) {
                  res[i] = item
                }
              })
            }
            else {
              res.push(item)
            }
          })
        }
        else {
          const tmpRoute = cloneDeep(route)
          tmpRoute.path = resolveRoutePath(baseUrl, tmpRoute.path)
          // 处理面包屑导航
          const tmpBreadcrumb = cloneDeep(breadcrumb)
          tmpBreadcrumb.push({
            path: tmpRoute.path,
            title: tmpRoute.meta?.title,
            icon: tmpRoute.meta?.icon,
            hide: !tmpRoute.meta?.breadcrumb && tmpRoute.meta?.breadcrumb === false,
          })
          if (!tmpRoute.meta) {
            tmpRoute.meta = {}
          }
          tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
          res.push(tmpRoute)
        }
      })
      return res
    }
    // 扁平化路由（将三级及以上路由数据拍平成二级）
    const flatRoutes = computed(() => {
      const returnRoutes: RouteRecordRaw[] = []
      if (routesRaw.value) {
        routesRaw.value.forEach((item) => {
          const tmpRoutes = cloneDeep(item.children) as RouteRecordRaw[] || []
          tmpRoutes?.map((v) => {
            if (!v.meta) {
              v.meta = {}
            }
            v.meta.auth = item.meta?.auth ?? v.meta?.auth
            return v
          })
          returnRoutes.push(...tmpRoutes)
        })
        returnRoutes.forEach(item => flatAsyncRoutes(item))
      }
      return returnRoutes
    })
    const flatSystemRoutes = computed(() => {
      const routes = [...systemRoutes]
      routes.forEach(item => flatAsyncRoutes(item))
      return routes
    })

    function converDeprecatedAttribute<T extends Route.recordMainRaw[]>(routes: T): T {
      routes.forEach((route) => {
        route.children = converDeprecatedAttributeRecursive(route.children)
      })
      return routes
    }
    function converDeprecatedAttributeRecursive(routes: RouteRecordRaw[]) {
      if (routes) {
        routes.forEach((route) => {
          if (route.children) {
            converDeprecatedAttributeRecursive(route.children)
          }
        })
      }
      return routes
    }

    // 生成路由（前端生成）
    function generateRoutesAtFront(asyncRoutes: Route.recordMainRaw[]) {
      // 设置 routes 数据
      routesRaw.value = converDeprecatedAttribute(cloneDeep(asyncRoutes) as any)
      isGenerate.value = true
    }
    // 格式化后端路由数据
    function formatBackRoutes(routes: any, views = import.meta.glob('../../views/**/*.vue')): Route.recordMainRaw[] {
      return routes?.map((route: any) => {
        switch (route.component) {
          case 'Layout':
            route.component = () => import('@/layouts/index.vue')
            break
          // case 'LinkLayout':
          //   route.component = () => import('@/layouts/modules/views/link.vue')
          //   break
          default:
            if (route.component) {
              route.component = views[`../../views/${route.component}`]
            }
            else {
              delete route.component
            }
        }
        if (route.children) {
          route.children = formatBackRoutes(route.children, views)
        }
        return route
      })
    }
    // 生成路由（后端获取）
    async function generateRoutesAtBack() {
      console.log('请求接口获取路由')
      await getAuthMenuListApi().then((res) => {
      // 设置 routes 数据
        routesRaw.value = converDeprecatedAttribute(formatBackRoutes(res.data) as any)
        isGenerate.value = true
      }).catch(() => {})
    }

    // 记录 accessRoutes 路由，用于登出时删除路由
    function setCurrentRemoveRoutes(routes: (() => void)[]) {
      currentRemoveRoutes.value = routes
    }
    // 清空动态路由
    function removeRoutes() {
      isGenerate.value = false
      routesRaw.value = []
      currentRemoveRoutes.value.forEach((removeRoute) => {
        removeRoute()
      })
      currentRemoveRoutes.value = []
    }

    return {
      isGenerate,
      routesRaw,
      currentRemoveRoutes,
      flatRoutes,
      flatSystemRoutes,
      generateRoutesAtFront,
      generateRoutesAtBack,
      setCurrentRemoveRoutes,
      removeRoutes,
    }
  },
)

export default useRouteStore
