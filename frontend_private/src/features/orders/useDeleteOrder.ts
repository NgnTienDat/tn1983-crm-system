import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'

export function useDeleteOrder() {
  const queryClient = useQueryClient()
  return useMutation<void, ApiError, string>({
    mutationFn: orderApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all })
    },
  })
}
