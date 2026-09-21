import type { DashboardStatistics } from '../features/dashboard/dashboard.types.ts'
import type { ApiResponse } from '../types/api.types.ts'
import { apiClient } from './client.ts'

export const statisticApi = {
  async getDashboard(): Promise<DashboardStatistics> {
    const response = await apiClient.get<ApiResponse<DashboardStatistics>>('/api/v1/statistics/dashboard')
    return response.data.data
  },
}
