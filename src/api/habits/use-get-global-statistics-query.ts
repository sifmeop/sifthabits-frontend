import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/constants/query-keys'
import API from '~/lib/api'

interface IGlobalStatistic {
  user: IGlobalUserStatistic
  users: IGlobalUserStatistic[]
}

export interface IGlobalUserStatistic {
  id: string
  telegramId: string
  username: string
  level: string
  xp: string
  xpToNextLevel: number
  photoUrl: string | null
  createdAt: string
}

export const useGetGlobalStatisticsQuery = () => {
  const methods = useQuery({
    queryKey: QUERY_KEYS.GLOBAL_STATISTICS,

    queryFn: async () => {
      const response = await API.get<IGlobalStatistic>('/statistics/global')
      return response.data
    }
  })

  return methods
}
