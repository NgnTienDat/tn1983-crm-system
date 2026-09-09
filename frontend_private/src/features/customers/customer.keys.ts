export const CUSTOMER_QUERY_KEYS = {
  all: ['customers'] as const,
  list: (page: number, size: number, keyword: string) =>
    [...CUSTOMER_QUERY_KEYS.all, page, size, keyword] as const,
} as const