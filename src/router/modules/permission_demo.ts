import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/permission_demo',
  component: Layout,
  redirect: '/permission_demo/index',
  name: 'permissionDemo',
  meta: {
    title: '权限验证',
    icon: 'ri:shield-keyhole-line',
  },
  children: [
    {
      path: 'index',
      name: 'permissionDemoIndex',
      component: () => import('@/views/permission_demo/index.vue'),
      meta: {
        title: '权限验证',
        activeMenu: '/permission_demo',
      },
    }, {
      path: 'test',
      name: 'permissionDemoTest',
      component: () => import('@/views/permission_demo/test1.vue'),
      meta: {
        title: '权限验证',
      },
    },
  ],
}

export default routes
