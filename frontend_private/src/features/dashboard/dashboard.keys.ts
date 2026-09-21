export const DASHBOARD_QUERY_KEYS = {
  all: ['dashboard'] as const,
  statistics: () => [...DASHBOARD_QUERY_KEYS.all, 'statistics'] as const,
} as const
