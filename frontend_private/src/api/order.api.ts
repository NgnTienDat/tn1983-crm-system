import type { CreateOrderRequest, ChangeOrderStatusRequest, OrderDetail, OrderPage, OrderSearchParams, UpdateOrderRequest } from '../features/orders/order.types.ts'
import type { ApiResponse } from '../types/api.types.ts'
import { apiClient } from './client.ts'

export const orderApi = {
  async getAll(params: OrderSearchParams): Promise<OrderPage> {
    const response = await apiClient.get<ApiResponse<OrderPage>>('/api/v1/orders', { params })
    return response.data.data
  },

  async getById(id: string): Promise<OrderDetail> {
    const response = await apiClient.get<ApiResponse<OrderDetail>>(`/api/v1/orders/${id}`)
    return response.data.data
  },

  async create(request: CreateOrderRequest): Promise<OrderDetail> {
    const response = await apiClient.post<ApiResponse<OrderDetail>>('/api/v1/orders', request)
    return response.data.data
  },

  async update(id: string, request: UpdateOrderRequest): Promise<OrderDetail> {
    const response = await apiClient.patch<ApiResponse<OrderDetail>>(`/api/v1/orders/${id}`, request)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<null>>(`/api/v1/orders/${id}`)
  },

  async changeStatus(id: string, request: ChangeOrderStatusRequest): Promise<OrderDetail> {
    const response = await apiClient.patch<ApiResponse<OrderDetail>>(`/api/v1/orders/${id}/status`, request)
    return response.data.data
  },
}
