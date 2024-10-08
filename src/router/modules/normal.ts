import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: Array<RouteRecordRaw> = [{
  path: '/home',
  component: Layout,
  redirect: '/home/dashboard',
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
        activeMenu: '/home',
      },
    },
  ],
}, {
  path: '/base_comp',
  component: Layout,
  name: 'BaseComp',
  meta: {
    // title: () => useSettingsStore().settings.home.title,
    title: '组件',
    icon: 'ant-design:export',
  },
  children: [
    {
      path: 'file_upload',
      component: () => import('@/views/base_comp/file_upload/index.vue'),
      name: 'FileUpload',
      meta: {
        title: '文件上传',
      },
    },
  ],
}, {
  path: '/demo',
  component: Layout,
  name: 'Demo',
  meta: {
    // title: () => useSettingsStore().settings.home.title,
    title: '示例功能',
    icon: 'ant-design:code-sandbox-outlined',
  },
  children: [
    {
      path: 'large_file',
      component: () => import('@/views/demo/large_file/index.vue'),
      name: 'LargeFile',
      meta: {
        title: '大文件上传',
      },
    },
    {
      path: 'base_table',
      component: () => import('@/views/demo/base_table/index.vue'),
      name: 'BaseTable',
      meta: {
        title: '通用列表',
      },
    },
  ],
}]

export default routes
