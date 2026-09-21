export type DashboardKpis = {
  revenueToday: number
  ordersToday: number
  newOrders: number
  waitingForShipping: number
}

export type RevenuePoint = {
  label: string
  revenue: number
}

export type DashboardOrder = {
  orderCode: string
  customerName: string
  totalAmount: number
  createdAt: string
  updatedAt: string
}

export type TopProduct = {
  productName: string
  quantitySold: number
  revenue: number
}

export type DashboardStatistics = {
  kpis: DashboardKpis
  revenueChart: RevenuePoint[]
  newOrders: DashboardOrder[]
  waitingForShippingOrders: DashboardOrder[]
  statusOverview: Record<string, number>
  topProducts: TopProduct[]
}
