import { useQuery } from '@tanstack/react-query'
import { userApi } from '../../api/user.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { USER_QUERY_KEYS } from './user.keys.ts'
import type { User } from './user.types.ts'

export function useUsers() {
  return useQuery<User[], ApiError>({
    queryKey: USER_QUERY_KEYS.list(),
    queryFn: userApi.getAll,
  })
}
