import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'
import type { OrderPage, OrderSearchParams } from './order.types.ts'

export function useOrders(params: OrderSearchParams) {
  return useQuery<OrderPage, ApiError>({
    queryKey: ORDER_QUERY_KEYS.list(params),
    queryFn: () => orderApi.getAll(params),
    placeholderData: keepPreviousData,
  })
}
