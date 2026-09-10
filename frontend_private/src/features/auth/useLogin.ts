import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginRequest, LoginResponse } from '../../types/auth.types.ts'
import { authApi } from '../../api/auth.api.ts'
import { type ApiError } from '../../lib/apiError.ts'
import { QUERY_KEYS } from '../../lib/queryKeys.ts'
import { useAuthStore } from '../../store/authStore.ts'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: async (request) => {
      const loginResponse = await authApi.login(request)
      queryClient.removeQueries({ queryKey: QUERY_KEYS.CURRENT_USER })
      useAuthStore.getState().setAuth(loginResponse.accessToken, loginResponse.user)
      queryClient.setQueryData(QUERY_KEYS.CURRENT_USER, loginResponse.user)
      return loginResponse
    },
  })
}