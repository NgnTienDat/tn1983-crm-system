export type LoginRequest = {
  phone: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: CurrentUser
}

export type CurrentUser = {
  id: string
  fullName: string
  email: string
  phone: string
  role: 'ADMIN' | 'CUSTOMER'
  active: boolean
  createdAt: string
}