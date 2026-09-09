import axios from 'axios'

const UNAUTHORIZED_MESSAGE = 'Số điện thoại hoặc mật khẩu không chính xác.'

export class ApiError extends Error {
  readonly status: number | undefined
  readonly code: number | undefined

  constructor(message: string, status?: number, code?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError('Đã xảy ra lỗi. Vui lòng thử lại.')
  }

  const status = error.response?.status
  const responseBody = error.response?.data as
    | { code?: number; message?: string }
    | undefined

  if (status === 401) {
    return new ApiError(UNAUTHORIZED_MESSAGE, status, responseBody?.code)
  }

  return new ApiError(
    responseBody?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại.',
    status,
    responseBody?.code,
  )
}