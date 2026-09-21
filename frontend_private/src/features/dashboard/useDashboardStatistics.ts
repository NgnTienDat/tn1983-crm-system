import { useQuery } from '@tanstack/react-query'
import { statisticApi } from '../../api/statistic.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { DASHBOARD_QUERY_KEYS } from './dashboard.keys.ts'
import type { DashboardStatistics } from './dashboard.types.ts'

export function useDashboardStatistics() {
  return useQuery<DashboardStatistics, ApiError>({
    queryKey: DASHBOARD_QUERY_KEYS.statistics(),
    queryFn: statisticApi.getDashboard,
  })
}
