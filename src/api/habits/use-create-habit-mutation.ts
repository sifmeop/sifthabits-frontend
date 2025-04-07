import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { IHabit, PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'

export type ICreateHabitBody = Omit<IHabit, 'id' | 'status' | 'userId' | 'userHabits'>

export const useCreateHabitMutation = () => {
  const queryClient = useQueryClient()
  // const { setSelectedDate } = useSelectedDate()

  return useMutation({
    mutationKey: MUTATION_KEYS.CREATE_HABIT,
    mutationFn: async (data: ICreateHabitBody) => {
      const response = await API.post<PopulatedUserHabit>('/habits', data)
      return response.data
    },
    // onSuccess: (data) => {
    //   const date = new Date()
    //   const day = dayjs(date).isoWeekday()

    //   const habits = queryClient.getQueryData(QUERY_KEYS.HABITS) as Record<number, PopulatedUserHabit[]>
    //   const upHabits = structuredClone(habits)
    //   upHabits[day] = [data, ...upHabits[day]]

    //   queryClient.setQueryData(QUERY_KEYS.HABITS, upHabits)

    //   setSelectedDate(date)
    // }
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS })
    }
  })
}
