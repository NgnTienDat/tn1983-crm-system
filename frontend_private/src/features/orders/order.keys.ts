export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
  list: (params: { page: number; size: number; status?: string; customerId?: string; keyword?: string }) => [...ORDER_QUERY_KEYS.all, 'list', params] as const,
  detail: (id: string) => [...ORDER_QUERY_KEYS.all, 'detail', id] as const,
} as const
