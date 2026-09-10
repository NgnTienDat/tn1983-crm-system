import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { normalizeApiError } from '../lib/apiError.ts'
import type { ApiResponse } from '../types/api.types.ts'
import type { LoginResponse } from '../types/auth.types.ts'
import { useAuthStore } from '../store/authStore.ts'

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const refreshClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

apiClient.interceptors.request.use((config) => {
	const accessToken = useAuthStore.getState().accessToken

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

let refreshPromise: Promise<string> | null = null

export async function refreshAccessToken(): Promise<string> {
	if (!refreshPromise) {
		refreshPromise = refreshClient
			.post<ApiResponse<LoginResponse>>('/api/v1/auth/refresh')
	        .then((response) => {
				const accessToken = response.data.data.accessToken
					useAuthStore.getState().setAuth(accessToken, response.data.data.user)
				return accessToken
			})
			.catch((error: unknown) => {
				useAuthStore.getState().clearAuth()
				throw normalizeApiError(error)
			})
			.finally(() => {
				refreshPromise = null
			})
	}

	return refreshPromise
}

apiClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const normalizedError = normalizeApiError(error)
		const originalRequest = error.config as RetryableRequestConfig | undefined
		const isRefreshExcludedRequest =
			originalRequest?.url?.includes('/api/v1/auth/login') ||
			originalRequest?.url?.includes('/api/v1/auth/refresh') ||
			originalRequest?.url?.includes('/api/v1/auth/logout')
		const hasAuthorization = Boolean(originalRequest?.headers?.Authorization)

		if (
			normalizedError.status !== 401 ||
			!originalRequest ||
			originalRequest._retry ||
			isRefreshExcludedRequest ||
			!hasAuthorization
		) {
			return Promise.reject(normalizedError)
		}

		originalRequest._retry = true

		try {
			const accessToken = await refreshAccessToken()
			originalRequest.headers.Authorization = `Bearer ${accessToken}`
			return apiClient(originalRequest)
		} catch (refreshError) {
			return Promise.reject(refreshError)
		}
	},
)

export { refreshClient }
