export type UserRole = 'ADMIN' | 'CUSTOMER'

export type User = {
  id: string
  fullName: string
  email: string
  phone: string
  role: UserRole
  active: boolean
  createdAt: string
}

export type CreateUserRequest = {
  fullName: string
  email: string
  phone: string
  password: string
  role: UserRole
}

export type UpdateUserRequest = {
  fullName: string
  email?: string
  phone: string
  role: UserRole
  active?: boolean
}
