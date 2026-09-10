import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from '../../api/product.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { PRODUCT_QUERY_KEYS } from './product.keys.ts'
import type { CreateProductRequest, Product } from './product.types.ts'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation<Product, ApiError, CreateProductRequest>({
    mutationFn: productApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all })
    },
  })
}
