import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from '../../api/product.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { PRODUCT_QUERY_KEYS } from './product.keys.ts'

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: productApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all })
    },
  })
}
