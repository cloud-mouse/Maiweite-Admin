import type { ResultData } from '../interface'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

// * 获取首页信息
export function getHomeDataApi() {
  return http.get<ResultData>(`${PORT1}/admin/home/data`, {}, { headers: { noLoading: false } })
}

export function getLineChartData(params) {
  return http.post<ResultData>(`${PORT1}/admin/home/getLineChartData`, params, { headers: { noLoading: false } })
}

export function getBarChartData(params) {
  return http.post<ResultData>(`${PORT1}/admin/home/getBarChartData`, params, { headers: { noLoading: false } })
}
export function getUserSort(params) {
  return http.get<ResultData>(`${PORT1}/admin/home/getUserSort`, params, { headers: { noLoading: false } })
}
