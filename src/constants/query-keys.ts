import { ITimeRange } from '~/api/habits'

export const QUERY_KEYS = {
  HABITS: ['habits'],
  STATISTICS: (timeRange: ITimeRange) => ['statistics', timeRange]
}
