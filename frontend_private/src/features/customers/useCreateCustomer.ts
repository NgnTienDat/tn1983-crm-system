import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customerApi } from '../../api/customer.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { CUSTOMER_QUERY_KEYS } from './customer.keys.ts'
import type { CreateCustomerRequest, Customer } from './customer.types.ts'

export function useCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation<Customer, ApiError, CreateCustomerRequest>({
    mutationFn: customerApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEYS.all })
    },
  })
}