// * 后端接口请求地址1服务
const BASEURL1: any = {
  dev: '/mock',
  test: '/mock',
  sit: '/mock',
  prod: '/mock',
}
export const PORT1 = BASEURL1[import.meta.env.VITE_APP_MODE]
