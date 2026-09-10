import type { ApiResponse } from '../types/api.types.ts'
import type { CreateProductRequest, Product, UpdateProductRequest } from '../features/products/product.types.ts'
import { apiClient } from './client.ts'

export const productApi = {
  async create(request: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post<ApiResponse<Product>>('/api/v1/products', request)
    return response.data.data
  },

  async getAll(active?: boolean): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>('/api/v1/products', {
      params: { active },
    })
    return response.data.data
  },

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(`/api/v1/products/${id}`)
    return response.data.data
  },

  async update(id: string, request: UpdateProductRequest): Promise<Product> {
    const response = await apiClient.patch<ApiResponse<Product>>(`/api/v1/products/${id}`, request)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<null>>(`/api/v1/products/${id}`)
  },
}
