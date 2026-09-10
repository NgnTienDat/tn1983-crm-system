import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'
import type { ChangeOrderStatusRequest, OrderDetail } from './order.types.ts'

type ChangeStatusVariables = { id: string; request: ChangeOrderStatusRequest }

export function useChangeOrderStatus() {
  const queryClient = useQueryClient()
  return useMutation<OrderDetail, ApiError, ChangeStatusVariables>({
    mutationFn: ({ id, request }) => orderApi.changeStatus(id, request),
    onSuccess: async (order) => {
      queryClient.setQueryData(ORDER_QUERY_KEYS.detail(order.id), order)
      await queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all })
    },
  })
}
