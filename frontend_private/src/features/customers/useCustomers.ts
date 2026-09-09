import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { customerApi } from '../../api/customer.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { CUSTOMER_QUERY_KEYS } from './customer.keys.ts'
import type { CustomerPage } from './customer.types.ts'

export function useCustomers(page: number, size: number, keyword: string) {
  return useQuery<CustomerPage, ApiError>({
    queryKey: CUSTOMER_QUERY_KEYS.list(page, size, keyword),
    queryFn: () => customerApi.getAll(page, size, keyword),
    placeholderData: keepPreviousData,
  })
}