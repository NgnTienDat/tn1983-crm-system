import { create } from 'zustand'
import type { CurrentUser } from '../types/auth.types.ts'

type AuthState = {
  accessToken: string | null
  user: CurrentUser | null
  setAccessToken: (accessToken: string) => void
  setUser: (user: CurrentUser) => void
  setAuth: (accessToken: string, user: CurrentUser) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}))