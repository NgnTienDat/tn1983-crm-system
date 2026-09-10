import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from '../../api/product.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { PRODUCT_QUERY_KEYS } from './product.keys.ts'
import type { Product, UpdateProductRequest } from './product.types.ts'

type UpdateProductVariables = {
  id: string
  request: UpdateProductRequest
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation<Product, ApiError, UpdateProductVariables>({
    mutationFn: ({ id, request }) => productApi.update(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all })
    },
  })
}
