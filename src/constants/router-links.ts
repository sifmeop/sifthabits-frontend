export const ROUTER_LINKS = {
  AWARDS: '/awards',
  HABITS: '/habits',
  HABIT_BY_ID: (id: string) => `/habits/${id}`,
  PROGRESS: '/progress',
  STATISTICS: '/statistics'
} as const
