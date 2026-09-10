import { useQuery } from '@tanstack/react-query'
import { orderApi } from '../../api/order.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { ORDER_QUERY_KEYS } from './order.keys.ts'
import type { OrderDetail } from './order.types.ts'

export function useOrderDetail(id: string | null) {
  return useQuery<OrderDetail, ApiError>({
    queryKey: id ? ORDER_QUERY_KEYS.detail(id) : [...ORDER_QUERY_KEYS.all, 'detail', 'none'],
    queryFn: () => orderApi.getById(id as string),
    enabled: Boolean(id),
  })
}
