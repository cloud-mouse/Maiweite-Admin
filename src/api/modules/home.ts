import type { ResultData } from '../interface'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

// * 获取首页信息
export function getHomeDataApi() {
  return http.get<ResultData>(`${PORT1}/admin/home/data`, {}, { headers: { noLoading: false } })
}
