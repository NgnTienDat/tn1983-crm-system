const summary = [
  { label: 'Đơn hàng hôm nay', value: '24' },
  { label: 'Doanh thu hôm nay', value: '4.850.000 đ' },
  { label: 'Sản phẩm đang bán', value: '86' },
]

export function DashboardPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Tổng quan</h2>
        <p className="mt-1 text-sm text-gray-600">Số liệu hoạt động trong ngày.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((item) => (
          <div className="border border-gray-300 bg-white p-4" key={item.label}>
            <p className="text-sm text-gray-600">{item.label}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}