import useMenuStore from './menu'
import useSettingsStore from './settings'
import useRouteStore from './route'
import router from '@/router'
import { getLocal, removeLocal, setLocal } from '@/utils/storage'
import type { ReqLoginForm } from '@/api/interface/modules/login'
import { loginApi } from '@/api/modules/login'

const useUserStore = defineStore('user', () => {
  const settingsStore = useSettingsStore()
  const routeStore = useRouteStore()
  const menuStore = useMenuStore()

  const account = ref<string>(getLocal('account') ?? '')
  const token = ref<string | null | undefined>(getLocal('token') ?? '')
  const permissions = ref<string[]>([])
  const avatar = ref<string>(getLocal('avatar') ?? '')
  const isLogin = computed(() => {
    if (token.value) {
      return true
    }
    return false
  })

  // 登录
  async function login(data: ReqLoginForm) {
    console.log('登录逻辑处理', data)
    const res = await loginApi(data)
    setLocal('account', res.data.account)
    setLocal('token', res.data.token)
    setLocal('avatar', res.data.avatar)
    account.value = res.data.account
    token.value = res.data.token
    avatar.value = res.data.avatar
    // 模拟登录成功
    // setLocal('account', data.account)
    // setLocal('token', 'adgsjhgajsdhgahjsdghjasgdhjasgjdhgajsd')
    // setLocal('avatar', '')
    // account.value = data.account
    // token.value = 'adgsjhgajsdhgahjsdghjasgdhjasgjdhgajsd'
    // avatar.value = ''
  }
  // 登出
  async function logout(redirect = router.currentRoute.value.fullPath) {
    removeLocal('account')
    removeLocal('token')
    removeLocal('avatar')
    account.value = ''
    token.value = ''
    avatar.value = ''
    permissions.value = []
    routeStore.removeRoutes()
    menuStore.setActived(0)
    router.push({
      name: 'login',
      query: {
        ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
      },
    })
  }
  // 登录过期 刷新
  async function refreshToken() {
    console.log('刷新token')
    // ... 这边就是通过拿刷新token,调用接口获取新的token
    // 成功之后重新设置一下token
    setLocal('token', 'adgsjhgajsdhgahjsdghjasgdhjasgjdhgajsd')
    return {
      code: 1,
      data: 'adgsjhgajsdhgahjsdghjasgdhjasgjdhgajsd',
      message: 'token刷新成功',
    }
  }

  // 获取权限
  async function getPermissions() {
    console.log('调用接口获取权限数据')
    // const res = await getAuthPermissionListApi()
    // permissions.value = res.data.permissions
  }
  return {
    account,
    token,
    avatar,
    permissions,
    isLogin,
    login,
    logout,
    getPermissions,
    refreshToken,
  }
})
export default useUserStore
