import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../api/user.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { USER_QUERY_KEYS } from './user.keys.ts'
import type { CreateUserRequest, User } from './user.types.ts'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation<User, ApiError, CreateUserRequest>({
    mutationFn: userApi.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all })
    },
  })
}
