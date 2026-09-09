import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customerApi } from '../../api/customer.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { CUSTOMER_QUERY_KEYS } from './customer.keys.ts'

export function useDeleteCustomer() {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: customerApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEYS.all })
    },
  })
}