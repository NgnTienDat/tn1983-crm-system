import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DashboardOrder } from './dashboard.types.ts'
import { useDashboardStatistics } from './useDashboardStatistics.ts'

type RevenueRange = 7 | 30

const statusLabels: Record<string, string> = {
  received: 'Mới tiếp nhận',
  roasting: 'Đang rang',
  packaging: 'Đang đóng gói',
  waitingForShipping: 'Chờ giao hàng',
  shipped: 'Đã giao',
  completed: 'Hoàn thành',
}

const statusKeys = ['received', 'roasting', 'packaging', 'waitingForShipping', 'shipped', 'completed'] as const

function formatMoney(value: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function formatChartLabel(value: string) {
  const [, month, day] = value.split('-')
  return `${day}/${month}`
}

export function DashboardPage() {
  const dashboardQuery = useDashboardStatistics()
  const [revenueRange, setRevenueRange] = useState<RevenueRange>(7)

  if (dashboardQuery.isPending) {
    return <DashboardState message="Đang tải số liệu tổng quan..." />
  }

  if (dashboardQuery.isError) {
    return <DashboardState isError message={dashboardQuery.error.message} />
  }

  const { data } = dashboardQuery
  const revenuePoints = data.revenueChart.slice(-revenueRange)

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-base font-semibold">Tổng quan kinh doanh</h2>
        <p className="mt-1 text-sm text-gray-600">Số liệu vận hành và doanh thu cập nhật theo dữ liệu đơn hàng.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Doanh thu hôm nay" value={formatMoney(data.kpis.revenueToday)} />
        <KpiCard label="Đơn hàng hôm nay" value={String(data.kpis.ordersToday)} />
        <KpiCard label="Đơn mới" value={String(data.kpis.newOrders)} />
        <KpiCard label="Chờ giao hàng" value={String(data.kpis.waitingForShipping)} />
      </div>

      <section className="border border-gray-300 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><h3 className="font-semibold">Xu hướng doanh thu</h3><p className="mt-1 text-sm text-gray-600">Tổng doanh thu theo ngày.</p></div>
          <div className="flex gap-2"><RangeButton active={revenueRange === 7} onClick={() => setRevenueRange(7)}>7 ngày</RangeButton><RangeButton active={revenueRange === 30} onClick={() => setRevenueRange(30)}>30 ngày</RangeButton></div>
        </div>
        <div className="mt-5 h-72 w-full">
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={revenuePoints} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} tickFormatter={formatChartLabel} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value: number) => `${Math.round(value / 1000000)}tr`} width={44} />
              <Tooltip formatter={(value) => typeof value === 'number' ? formatMoney(value) : String(value ?? '')} labelFormatter={(label) => formatChartLabel(String(label))} />
              <Line dataKey="revenue" dot={false} name="Doanh thu" stroke="#111827" strokeWidth={2} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <OrderQueue dateLabel="Ngày tạo" dateValue={(order) => order.createdAt} emptyMessage="Không có đơn mới." orders={data.newOrders} title="Đơn mới" />
        <OrderQueue dateLabel="Cập nhật" dateValue={(order) => order.updatedAt} emptyMessage="Không có đơn chờ giao hàng." orders={data.waitingForShippingOrders} title="Đơn chờ giao hàng" />
      </div>

      <section>
        <h3 className="mb-3 font-semibold">Tổng quan trạng thái đơn hàng</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {statusKeys.map((status) => <div className="border border-gray-300 bg-white p-4" key={status}><p className="text-sm text-gray-600">{statusLabels[status]}</p><p className="mt-2 text-xl font-semibold">{data.statusOverview[status] ?? 0}</p></div>)}
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-semibold">Sản phẩm bán chạy tháng này</h3>
        {data.topProducts.length === 0 ? <EmptyPanel message="Chưa có dữ liệu sản phẩm trong tháng này." /> : <div className="overflow-x-auto border border-gray-300 bg-white"><table className="w-full min-w-150 text-left text-sm"><thead className="border-b border-gray-300 bg-gray-50"><tr><th className="px-4 py-3 font-medium">Sản phẩm</th><th className="px-4 py-3 font-medium">Đã bán (kg)</th><th className="px-4 py-3 font-medium">Doanh thu</th></tr></thead><tbody>{data.topProducts.map((product) => <tr className="border-b border-gray-200 last:border-0" key={product.productName}><td className="px-4 py-3">{product.productName}</td><td className="px-4 py-3">{product.quantitySold.toLocaleString('vi-VN')}</td><td className="px-4 py-3">{formatMoney(product.revenue)}</td></tr>)}</tbody></table></div>}
      </section>
    </section>
  )
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return <div className="border border-gray-300 bg-white p-4"><p className="text-sm text-gray-600">{label}</p><p className="mt-2 text-xl font-semibold">{value}</p></div>
}

function RangeButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return <button className={`border px-3 py-2 text-sm ${active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 hover:bg-gray-100'}`} onClick={onClick} type="button">{children}</button>
}

function OrderQueue({ title, orders, dateLabel, dateValue, emptyMessage }: { title: string; orders: DashboardOrder[]; dateLabel: string; dateValue: (order: DashboardOrder) => string; emptyMessage: string }) {
  return <section><h3 className="mb-3 font-semibold">{title}</h3>{orders.length === 0 ? <EmptyPanel message={emptyMessage} /> : <div className="overflow-x-auto border border-gray-300 bg-white"><table className="w-full min-w-175 text-left text-sm"><thead className="border-b border-gray-300 bg-gray-50"><tr><th className="px-4 py-3 font-medium">Mã đơn hàng</th><th className="px-4 py-3 font-medium">Khách hàng</th><th className="px-4 py-3 font-medium">Tổng tiền</th><th className="px-4 py-3 font-medium">{dateLabel}</th></tr></thead><tbody>{orders.map((order) => <tr className="border-b border-gray-200 last:border-0" key={order.orderCode}><td className="px-4 py-3 font-medium">{order.orderCode}</td><td className="px-4 py-3">{order.customerName}</td><td className="px-4 py-3">{formatMoney(order.totalAmount)}</td><td className="px-4 py-3 text-gray-600">{formatDate(dateValue(order))}</td></tr>)}</tbody></table></div>}</section>
}

function EmptyPanel({ message }: { message: string }) {
  return <div className="border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600">{message}</div>
}

function DashboardState({ message, isError = false }: { message: string; isError?: boolean }) {
  return <section className="space-y-4"><div><h2 className="text-base font-semibold">Tổng quan kinh doanh</h2></div><div className={isError ? 'border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700' : 'border border-gray-300 bg-white px-4 py-6 text-sm text-gray-600'} role={isError ? 'alert' : 'status'}>{message}</div></section>
}
