import type { ApiResponse } from '../types/api.types.ts'
import type { CurrentUser, LoginRequest, LoginResponse } from '../types/auth.types.ts'
import { apiClient, refreshClient } from './client.ts'

export const authApi = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/login', request)
    return response.data.data
  },

  async getCurrentUser(): Promise<CurrentUser> {
    const response = await apiClient.get<ApiResponse<CurrentUser>>('/api/v1/auth/me')
    return response.data.data
  },

  async refresh(): Promise<LoginResponse> {
    const response = await refreshClient.post<ApiResponse<LoginResponse>>('/api/v1/auth/refresh')
    return response.data.data
  },

  async logout(): Promise<void> {
    await apiClient.post<ApiResponse<null>>('/api/v1/auth/logout')
  },
}