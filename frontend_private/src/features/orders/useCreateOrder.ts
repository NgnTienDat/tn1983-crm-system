import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'
import type { CreateOrderRequest, OrderDetail } from './order.types.ts'

export function useCreateOrder() {
  const queryClient = useQueryClient()
  return useMutation<OrderDetail, ApiError, CreateOrderRequest>({
    mutationFn: orderApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all })
    },
  })
}
