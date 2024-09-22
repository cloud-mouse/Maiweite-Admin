import type { RouteRecordRaw } from 'vue-router'
import Normal from './modules/normal'
import System from './modules/system_demo'
import useSettingsStore from '@/store/modules/settings'
import type { Route } from '@/types/global'
// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    redirect: () => useSettingsStore().settings.home.fullPath,
    meta: {
      title: () => useSettingsStore().settings.home.title,
      breadcrumb: false,
    },
    children: [
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '基础功能',
      icon: 'ep:set-up',
    },
    children: [
      Normal,
    ],
  },
  {
    meta: {
      title: '系统配置',
      icon: 'ep:setting',
    },
    children: [
      System,
    ],
  },
]

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
}
