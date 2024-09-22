import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Home',
  meta: {
    // title: () => useSettingsStore().settings.home.title,
    title: '首页',
    icon: 'ant-design:home-twotone',
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      name: 'Dashboard',
      meta: {
        menu: false,
        activeMenu: '',
      },
    },
  ],
}

export default routes
