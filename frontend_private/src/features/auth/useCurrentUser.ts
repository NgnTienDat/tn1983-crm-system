import { useQuery } from '@tanstack/react-query'
import type { CurrentUser } from '../../types/auth.types.ts'
import { authApi } from '../../api/auth.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { QUERY_KEYS } from '../../lib/queryKeys.ts'
import { useAuthStore } from '../../store/authStore.ts'

export function useCurrentUser() {
  const hasAccessToken = useAuthStore((state) => Boolean(state.accessToken))
  const hasUser = useAuthStore((state) => Boolean(state.user))

  return useQuery<CurrentUser, ApiError>({
    queryKey: QUERY_KEYS.CURRENT_USER,
    queryFn: async () => {
      const user = await authApi.getCurrentUser()
      useAuthStore.getState().setUser(user)
      return user
    },
    staleTime: 5 * 60 * 1000,
    enabled: hasAccessToken && !hasUser,
  })
}