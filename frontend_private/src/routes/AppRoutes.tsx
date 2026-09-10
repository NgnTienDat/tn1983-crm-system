import { useCallback, useEffect, useRef, useState } from 'react'
import { startTransition } from 'react'
import { AdminLayout } from '../components/layout/AdminLayout.tsx'
import { AdminRoute } from '../components/layout/AdminRoute.tsx'
import { ForbiddenPage } from '../features/auth/ForbiddenPage.tsx'
import { LoginPage } from '../features/auth/LoginPage.tsx'
import { useLogout } from '../features/auth/useLogout.ts'
import { useCurrentUser } from '../features/auth/useCurrentUser.ts'
import { CustomerListPage } from '../features/customers/CustomerListPage.tsx'
import { DashboardPage } from '../features/dashboard/DashboardPage.tsx'
import { OrderListPage } from '../features/orders/OrderListPage.tsx'
import { ProductListPage } from '../features/products/ProductListPage.tsx'
import { SettingsPage } from '../features/settings/SettingsPage.tsx'
import { useAuthStore } from '../store/authStore.ts'
import { refreshAccessToken } from '../api/client.ts'

const routes = {
  '/login': { title: 'Đăng nhập' },
  '/403': { title: '403' },
  '/dashboard': { title: 'Dashboard', page: <DashboardPage /> },
  '/admin/dashboard': { title: 'Dashboard', page: <DashboardPage /> },
  '/products': { title: 'Sản phẩm', page: <ProductListPage /> },
  '/admin/products': { title: 'Sản phẩm', page: <ProductListPage /> },
  '/orders': { title: 'Đơn hàng', page: <OrderListPage /> },
  '/admin/orders': { title: 'Đơn hàng', page: <OrderListPage /> },
  '/customers': { title: 'Khách hàng', page: <CustomerListPage /> },
  '/admin/customers': { title: 'Khách hàng', page: <CustomerListPage /> },
  '/settings': { title: 'Cài đặt', page: <SettingsPage /> },
  '/admin/settings': { title: 'Cài đặt', page: <SettingsPage /> },
} as const

type RoutePath = keyof typeof routes
type SessionStatus = 'idle' | 'restoring' | 'restored' | 'failed'

function getRoutePath(): RoutePath {
  const path = window.location.pathname as RoutePath
  return path in routes ? path : '/login'
}

export function AppRoutes() {
  const [path, setPath] = useState<RoutePath>(getRoutePath)
  const currentUserQuery = useCurrentUser()
  const logoutMutation = useLogout()
  const accessToken = useAuthStore((state) => state.accessToken)
  const authUser = useAuthStore((state) => state.user)
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('idle')
  const restoreStarted = useRef(false)

  const navigate = useCallback((nextPath: RoutePath) => {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }, [])

  const handleLogout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSettled: () => navigate('/login'),
    })
  }, [logoutMutation, navigate])

  const handleLogin = useCallback(
    (user: { role: 'ADMIN' | 'CUSTOMER' }) => {
      navigate(user.role === 'ADMIN' ? '/dashboard' : '/403')
    },
    [navigate],
  )

  useEffect(() => {
    const handlePopState = () => setPath(getRoutePath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (path !== '/login' && !accessToken && sessionStatus === 'idle' && !restoreStarted.current) {
      restoreStarted.current = true
      setSessionStatus('restoring')
      refreshAccessToken()
        .then(() => setSessionStatus('restored'))
        .catch(() => setSessionStatus('failed'))
    }
  }, [accessToken, path, sessionStatus])

  useEffect(() => {
    if (path !== '/login' && !accessToken && (currentUserQuery.error?.status === 401 || sessionStatus === 'failed')) {
      startTransition(() => navigate('/login'))
    }
  }, [accessToken, currentUserQuery.error, navigate, path, sessionStatus])

  if (path === '/login') {
    return <LoginPage onLogin={handleLogin} />
  }

  if (path === '/403') {
    return (
      <ForbiddenPage
        onBackToLogin={() => {
          useAuthStore.getState().clearAuth()
          navigate('/login')
        }}
      />
    )
  }

  if (
    sessionStatus === 'restoring' ||
    !accessToken ||
    (!authUser && currentUserQuery.isPending) ||
    (!authUser && currentUserQuery.isError) ||
    !authUser
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 text-sm text-gray-600">
        Đang tải...
      </main>
    )
  }

  const route = routes[path]

  return (
    <AdminRoute onForbidden={() => navigate('/403')} onUnauthenticated={() => navigate('/login')}>
      <AdminLayout currentPath={path} pageTitle={route.title} onNavigate={navigate} onLogout={handleLogout}>
        {route.page}
      </AdminLayout>
    </AdminRoute>
  )
}