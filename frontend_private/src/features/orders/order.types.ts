export type OrderStatus = 'RECEIVED' | 'ROASTING' | 'PACKAGING' | 'WAITING_FOR_SHIPPING' | 'SHIPPED' | 'COMPLETED'
export type OrderSource = 'PHONE' | 'ZALO' | 'DIRECT'
export type ShippingMethod = 'PICKUP' | 'VIETNAM_POST' | 'TIEN_OANH' | 'OTHER'
export type PackagingType = 'SILVER_BAG' | 'BRANDED_BAG'
export type PackageSize = 'KG_1' | 'GRAM_500' | 'GRAM_250'

export type CustomerSummary = {
  id: string
  name: string
}

export type Customer = CustomerSummary & {
  phone: string
  address: string
  note: string | null
  type: string
  active: boolean
  createdAt: string
}

export type OrderItemRequest = {
  productId: string
  quantityKg: number
  unitPricePerKg: number
  packagingType: PackagingType
  packageSize: PackageSize
  packageCount: number
}

export type CreateOrderRequest = {
  customerId: string
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  source?: OrderSource
  shippingMethod?: ShippingMethod
  note?: string
  items: OrderItemRequest[]
  changedBy?: string
}

export type UpdateOrderRequest = Partial<Omit<CreateOrderRequest, 'changedBy'>>

export type ChangeOrderStatusRequest = {
  status: OrderStatus
  note?: string
  changedBy?: string
}

export type OrderSummary = {
  id: string
  orderCode: string
  customer: CustomerSummary
  receiverName: string
  receiverPhone?: string
  totalAmount: number
  status: OrderStatus
  editable: boolean
  allowedNextStatuses: OrderStatus[]
  createdAt: string
}

export type OrderItem = OrderItemRequest & {
  id: string
  productName: string
  totalPrice: number
}

export type OrderStatusHistory = {
  id: string
  status: OrderStatus
  note: string | null
  changedAt: string
  changedBy: { id: string; fullName: string } | null
}

export type OrderDetail = Omit<OrderSummary, 'customer' | 'receiverName' | 'receiverPhone'> & {
  customer: Customer
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  source: OrderSource | null
  shippingMethod: ShippingMethod | null
  note: string | null
  items: OrderItem[]
  statusHistory: OrderStatusHistory[]
}

export type OrderPage = {
  content: OrderSummary[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

export type OrderSearchParams = {
  page: number
  size: number
  status?: OrderStatus
  customerId?: string
  keyword?: string
}
