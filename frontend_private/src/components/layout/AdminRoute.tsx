import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from '../../store/authStore.ts'

type AdminRouteProps = {
  children: ReactNode
  onUnauthenticated: () => void
  onForbidden: () => void
}

export function AdminRoute({ children, onUnauthenticated, onForbidden }: AdminRouteProps) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!accessToken) {
      onUnauthenticated()
      return
    }

    if (user && user.role !== 'ADMIN') {
      onForbidden()
    }
  }, [accessToken, onForbidden, onUnauthenticated, user])

  if (!accessToken || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-600">
        Đang tải...
      </main>
    )
  }

  if (user.role !== 'ADMIN') {
    return null
  }

  return children
}