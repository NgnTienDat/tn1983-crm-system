import { useQuery } from '@tanstack/react-query'
import { productApi } from '../../api/product.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { PRODUCT_QUERY_KEYS } from './product.keys.ts'
import type { Product } from './product.types.ts'

export function useProducts(active = true) {
  return useQuery<Product[], ApiError>({
    queryKey: PRODUCT_QUERY_KEYS.list(active),
    queryFn: () => productApi.getAll(active),
  })
}
