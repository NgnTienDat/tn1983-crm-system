import { useMutation, useQueryClient } from '@tanstack/react-query'
import { customerApi } from '../../api/customer.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { CUSTOMER_QUERY_KEYS } from './customer.keys.ts'
import type { Customer, UpdateCustomerRequest } from './customer.types.ts'

type UpdateCustomerVariables = {
  id: string
  request: UpdateCustomerRequest
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  return useMutation<Customer, ApiError, UpdateCustomerVariables>({
    mutationFn: ({ id, request }) => customerApi.update(id, request),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CUSTOMER_QUERY_KEYS.all })
    },
  })
}