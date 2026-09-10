export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  list: (active?: boolean) => [...PRODUCT_QUERY_KEYS.all, active] as const,
  detail: (id: string) => [...PRODUCT_QUERY_KEYS.all, 'detail', id] as const,
} as const
