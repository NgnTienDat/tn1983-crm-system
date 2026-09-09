import type { ReactNode } from 'react'

const navigation = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/products', label: 'Sản phẩm' },
  { path: '/orders', label: 'Đơn hàng' },
  { path: '/customers', label: 'Khách hàng' },
  { path: '/settings', label: 'Cài đặt' },
] as const

type NavigationPath =
  | (typeof navigation)[number]['path']
  | '/admin/dashboard'
  | '/admin/products'
  | '/admin/orders'
  | '/admin/customers'
  | '/admin/settings'

type AdminLayoutProps = {
  currentPath: NavigationPath
  pageTitle: string
  onNavigate: (path: NavigationPath) => void
  onLogout: () => void
  children: ReactNode
}

export function AdminLayout({ currentPath, pageTitle, onNavigate, onLogout, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-gray-300 bg-white md:block">
        <div className="flex h-16 items-center border-b border-gray-300 px-5">
          <span className="text-base font-semibold">Coffee Admin</span>
        </div>
        <nav className="space-y-1 p-3" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <button
              className={`w-full px-3 py-2 text-left text-sm ${
                currentPath === item.path
                  ? 'bg-gray-200 font-medium text-gray-950'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
              }`}
              key={item.path}
              onClick={() => onNavigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="md:pl-60">
        <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-gray-300 bg-white px-4 py-3 sm:px-6">
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-600">Nguyễn Văn Admin</span>
            <button
              className="text-gray-700 underline underline-offset-4 hover:text-gray-950"
              onClick={onLogout}
              type="button"
            >
              Đăng xuất
            </button>
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-gray-300 bg-white p-2 md:hidden" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <button
              className={`whitespace-nowrap px-3 py-2 text-sm ${
                currentPath === item.path ? 'bg-gray-200 font-medium' : 'text-gray-600'
              }`}
              key={item.path}
              onClick={() => onNavigate(item.path)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}