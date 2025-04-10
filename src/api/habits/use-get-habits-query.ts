import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { QUERY_KEYS } from '~/constants/query-keys'
import { PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'

interface IGetHabitsResponse {
  [key: number]: PopulatedUserHabit[]
}

export const useGetHabitsQuery = () => {
  const from = dayjs().startOf('isoWeek').format('YYYY-MM-DD')
  const to = dayjs().endOf('isoWeek').format('YYYY-MM-DD')

  const searchParams = new URLSearchParams({ from, to })

  const methods = useQuery({
    queryKey: QUERY_KEYS.HABITS,
    queryFn: async () => {
      const response = await API.get<IGetHabitsResponse>(`/habits?${searchParams}`)
      return response.data
    }
  })

  return methods
}
