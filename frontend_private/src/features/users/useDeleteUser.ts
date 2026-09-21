import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../api/user.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { USER_QUERY_KEYS } from './user.keys.ts'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError, string>({
    mutationFn: userApi.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all })
    },
  })
}
