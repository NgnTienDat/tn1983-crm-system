export type ProductType = 'COFFEE_BEAN' | 'GROUND_COFFEE_NORMAL' | 'GROUND_COFFEE_PURE'

export type Product = {
  id: string
  name: string
  type: ProductType
  listedPrice: number
  active: boolean
  createdAt: string
}

export type CreateProductRequest = {
  name: string
  type: ProductType
  listedPrice: number
}

export type UpdateProductRequest = {
  name?: string
  type?: ProductType
  listedPrice?: number
}
