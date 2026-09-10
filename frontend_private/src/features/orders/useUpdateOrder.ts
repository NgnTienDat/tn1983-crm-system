import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'
import type { OrderDetail, UpdateOrderRequest } from './order.types.ts'

type UpdateOrderVariables = { id: string; request: UpdateOrderRequest }

export function useUpdateOrder() {
  const queryClient = useQueryClient()
  return useMutation<OrderDetail, ApiError, UpdateOrderVariables>({
    mutationFn: ({ id, request }) => orderApi.update(id, request),
    onSuccess: async (order) => {
      queryClient.setQueryData(ORDER_QUERY_KEYS.detail(order.id), order)
      await queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all })
    },
  })
}
