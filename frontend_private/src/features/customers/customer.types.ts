export type CustomerType = 'COFFEE_SHOP' | 'AGENT' | 'INDIVIDUAL'

export type Customer = {
  id: string
  name: string
  phone: string
  address: string | null
  note: string | null
  type: CustomerType
  active: boolean
  createdAt: string
}

export type UpdateCustomerRequest = {
  name: string
  phone: string
  address: string
  note?: string
  type: CustomerType
  active: boolean
}

export type CreateCustomerRequest = {
  name: string
  phone: string
  address: string
  note?: string
  type: CustomerType
}

export type CustomerPage = {
  content: Customer[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}