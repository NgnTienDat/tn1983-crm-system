export const USER_QUERY_KEYS = {
  all: ['users'] as const,
  list: () => [...USER_QUERY_KEYS.all, 'list'] as const,
  detail: (id: string) => [...USER_QUERY_KEYS.all, 'detail', id] as const,
} as const
