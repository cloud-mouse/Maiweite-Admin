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
    {
      path: 'form_design_demo',
      component: () => import('@/views/form_design_demo/index.vue'),
      name: 'FormDesignDemo',
      meta: {
        title: '表单设计',
      },
    },
  ],
}, {
  path: '/components_demo',
  component: Layout,
  redirect: '/components_demo/icon/iconify',
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'ri:layout-right-line',
  },
  children: [
    {
      path: 'icon',
      name: 'Icon',
      redirect: '/components_demo/icon/iconify',
      meta: {
        title: '扩展图标',
        icon: 'ri:remixicon-line',
      },
      children: [
        {
          path: 'iconify',
          name: 'Iconify',
          component: () => import('@/views/components_demo/svg_icon/iconify.vue'),
          meta: {
            title: 'Iconify',
          },
        },
        {
          path: 'svg_icon',
          name: 'SvgIcon',
          component: () => import('@/views/components_demo/svg_icon/svg_icon.vue'),
          meta: {
            title: 'SvgIcon',
          },
        },
        {
          path: 'icon_select',
          name: 'IconSelect',
          component: () => import('@/views/components_demo/svg_icon/icon_select.vue'),
          meta: {
            title: 'Icon图标选择器',
          },
        },
      ],
    },
    {
      path: 'table_select',
      name: 'TableSelectDemo',
      component: () => import('@/views/components_demo/table_select/index.vue'),
      meta: {
        title: '表格选择器',
        icon: 'mdi:table-plus',
      },
    }, {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/components_demo/upload/index.vue'),
      meta: {
        title: '文件上传',
        icon: 'mdi:folder-upload-outline',
      },
    }, {
      path: 'time_line',
      name: 'TimeLine',
      component: () => import('@/views/components_demo/time_line/index.vue'),
      meta: {
        title: '时间线',
        icon: 'ant-design:field-time-outlined',
      },
    },

  ],
}]

export default routes
