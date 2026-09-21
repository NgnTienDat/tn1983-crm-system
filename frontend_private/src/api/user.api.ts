import type { ApiResponse } from '../types/api.types.ts'
import type { CreateUserRequest, UpdateUserRequest, User } from '../features/users/user.types.ts'
import { apiClient } from './client.ts'

export const userApi = {
  async create(request: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/api/v1/users', request)
    return response.data.data
  },

  async getAll(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/api/v1/users')
    return response.data.data
  },

  async getById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/api/v1/users/${id}`)
    return response.data.data
  },

  async update(id: string, request: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/api/v1/users/${id}`, request)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<null>>(`/api/v1/users/${id}`)
  },
}
