import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { IHabit, PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'
import { useSelectedDate } from '~/pages/habits/habits-provider'

export type ICreateHabitBody = Omit<IHabit, 'id' | 'status' | 'userId' | 'createdAt' | 'userHabits'>

export const useCreateHabitMutation = () => {
  const queryClient = useQueryClient()
  const { setSelectedDate } = useSelectedDate()

  return useMutation({
    mutationKey: MUTATION_KEYS.CREATE_HABIT,
    mutationFn: async (data: ICreateHabitBody) => {
      const response = await API.post<PopulatedUserHabit>('/habits', data)
      return response.data
    },
    onSuccess: (data) => {
      const date = dayjs()
      const today = dayjs().isoWeekday()
      const weekDays = data.habit.weekDays

      if (!weekDays.includes(today)) {
        return
      }

      const habits = queryClient.getQueryData(QUERY_KEYS.HABITS) as Record<number, PopulatedUserHabit[]>
      const upHabits = structuredClone(habits)
      upHabits[today] = [data, ...upHabits[today]]

      queryClient.setQueryData(QUERY_KEYS.HABITS, upHabits)

      setSelectedDate(date.toDate())
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('week') })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('month') })
    }
  })
}
