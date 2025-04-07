import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'
import { ICreateHabitBody } from './use-create-habit-mutation'

export type IEditHabitBody = Omit<ICreateHabitBody, 'createdAt'> & {
  id: string
}

export const useEditHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: MUTATION_KEYS.EDIT_HABIT,
    mutationFn: async (data: IEditHabitBody) => {
      const response = await API.put<PopulatedUserHabit>('/habits', data)
      return response.data
    },
    onSuccess: (data) => {
      const day = dayjs(data.createdAt).isoWeekday()
      const habits = queryClient.getQueryData(QUERY_KEYS.HABITS) as Record<number, PopulatedUserHabit[]>
      const upHabits = structuredClone(habits)
      const habitIndex = upHabits[day].findIndex((habit) => habit.id === data.id)
      upHabits[day][habitIndex] = data

      queryClient.setQueryData(QUERY_KEYS.HABITS, upHabits)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS })
    }
  })
}
