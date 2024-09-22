import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/sys_setting',
  component: Layout,
  redirect: '/sys_setting/index',
  name: 'systemSetting',
  meta: {
    title: '系统设置',
    icon: 'fluent:laptop-settings-20-regular',
  },
  children: [
    {
      path: 'sys_user',
      name: 'SysUser',
      component: () => import('@/views/sys_setting/user_center/index.vue'),
      meta: {
        title: '账号管理',
      },
    }, {
      path: 'sys_role',
      name: 'SysRole',
      component: () => import('@/views/sys_setting/roles/index.vue'),
      meta: {
        title: '角色管理',
      },
    },
    {
      path: 'index',
      name: 'Permission',
      component: () => import('@/views/sys_setting/permission/index.vue'),
      meta: {
        title: '权限管理',
      },
    },
  ],
}

export default routes
