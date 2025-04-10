import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { QUERY_KEYS } from '~/constants/query-keys'
import API from '~/lib/api'

export interface IStatistic {
  id: string
  title: string
  streak: number
  longest: number
  completed: number
  summary: Record<string, number>
}

export type ITimeRange = 'week' | 'month'

export const useGetStatisticsQuery = (timeRange: ITimeRange) => {
  const from = dayjs()
    .startOf(timeRange === 'week' ? 'isoWeek' : 'month')
    .format('YYYY-MM-DD')
  const to = dayjs()
    .endOf(timeRange === 'week' ? 'isoWeek' : 'month')
    .format('YYYY-MM-DD')

  const searchParams = new URLSearchParams({ from, to })

  const methods = useQuery({
    queryKey: QUERY_KEYS.STATISTICS(timeRange),
    queryFn: async () => {
      const response = await API.get<IStatistic[]>(`/statistics?${searchParams}`)
      return response.data
    }
  })

  return methods
}
