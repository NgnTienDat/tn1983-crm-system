import type { ApiResponse } from '../types/api.types.ts'
import type { CreateCustomerRequest, Customer, CustomerPage, UpdateCustomerRequest } from '../features/customers/customer.types.ts'
import { apiClient } from './client.ts'

export const customerApi = {
  async create(request: CreateCustomerRequest): Promise<Customer> {
    const response = await apiClient.post<ApiResponse<Customer>>('/api/v1/customers', request)
    return response.data.data
  },

  async getAll(page: number, size: number, keyword: string): Promise<CustomerPage> {
    const response = await apiClient.get<ApiResponse<CustomerPage>>('/api/v1/customers', {
      params: { page, size, q: keyword || undefined },
    })
    return response.data.data
  },

  async update(id: string, request: UpdateCustomerRequest): Promise<Customer> {
    const response = await apiClient.patch<ApiResponse<Customer>>(`/api/v1/customers/${id}`, request)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<null>>(`/api/v1/customers/${id}`)
  },
}