import type { ResPage } from '../interface'
import { PORT1 } from '@/api/config/servicePort'

import http from '@/api'

/**
 * @description 获取首页折线图数据
 * @param params
 * @returns ResPage
 */
export function getLineChartData(params?) {
  return http.post<ResPage>(`${PORT1}/admin/home/getLineChartData`, params, { headers: { noLoading: false } })
}

/**
 * @description 获取首页柱状图
 * @param params
 * @returns ResPage
 */
export function getBarChartData(params?) {
  return http.post<ResPage>(`${PORT1}/admin/home/getBarChartData`, params, { headers: { noLoading: false } })
}

/**
 * @description 获取用户排名
 * @param params
 * @returns ResPage
 */
export function getUserSort(params?) {
  return http.get<ResPage>(`${PORT1}/admin/home/getUserSort`, params, { headers: { noLoading: false } })
}
