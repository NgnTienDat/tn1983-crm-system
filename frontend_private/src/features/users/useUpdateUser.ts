import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../api/user.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { USER_QUERY_KEYS } from './user.keys.ts'
import type { UpdateUserRequest, User } from './user.types.ts'

type UpdateUserVariables = {
  id: string
  request: UpdateUserRequest
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation<User, ApiError, UpdateUserVariables>({
    mutationFn: ({ id, request }) => userApi.update(id, request),
    onSuccess: async (user) => {
      queryClient.setQueryData(USER_QUERY_KEYS.detail(user.id), user)
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all })
    },
  })
}
