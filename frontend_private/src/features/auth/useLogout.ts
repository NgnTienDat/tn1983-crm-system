import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../api/auth.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { QUERY_KEYS } from '../../lib/queryKeys.ts'
import { useAuthStore } from '../../store/authStore.ts'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation<void, ApiError>({
    mutationFn: authApi.logout,
    onSettled: () => {
      useAuthStore.getState().clearAuth()
      queryClient.removeQueries({ queryKey: QUERY_KEYS.CURRENT_USER })
    },
  })
}