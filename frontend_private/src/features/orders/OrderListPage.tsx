const orders = [
  { code: '#DH-1024', customer: 'Nguyễn Minh Anh', status: 'Đang xử lý', total: '125.000 đ' },
  { code: '#DH-1023', customer: 'Trần Quốc Bình', status: 'Hoàn tất', total: '85.000 đ' },
  { code: '#DH-1022', customer: 'Lê Thu Hà', status: 'Hoàn tất', total: '210.000 đ' },
]

export function OrderListPage() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Danh sách đơn hàng</h2>
        <p className="mt-1 text-sm text-gray-600">Các đơn hàng gần đây.</p>
      </div>
      <div className="overflow-x-auto border border-gray-300 bg-white">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="border-b border-gray-300 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium">Mã đơn</th>
              <th className="px-4 py-3 font-medium">Khách hàng</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="border-b border-gray-200 last:border-0" key={order.code}>
                <td className="px-4 py-3">{order.code}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3 text-gray-600">{order.status}</td>
                <td className="px-4 py-3">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}