type ForbiddenPageProps = {
  onBackToLogin: () => void
}

export function ForbiddenPage({ onBackToLogin }: ForbiddenPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md border border-gray-300 bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-950">403</h1>
        <p className="mt-3 text-sm text-gray-600">Bạn không có quyền truy cập chức năng này.</p>
        <button
          className="mt-6 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          onClick={onBackToLogin}
          type="button"
        >
          Quay về đăng nhập
        </button>
      </section>
    </main>
  )
}