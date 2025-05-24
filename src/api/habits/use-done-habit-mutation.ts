import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { IUserHabit, PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'

export const useDoneHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: MUTATION_KEYS.DONE_HABIT,
    mutationFn: async (id: string) => {
      const response = await API.put<IUserHabit>(`/habits/${id}/done`)
      return response.data
    },
    onMutate: (id) => {
      const previousHabits = queryClient.getQueryData(QUERY_KEYS.HABITS) as Record<number, PopulatedUserHabit[]>
      const upHabits = structuredClone(previousHabits)
      let day = Object.values(upHabits).findIndex((habits) => habits.some((habit) => habit.id === id))

      if (day === -1) {
        return { previousHabits }
      }

      day++

      const habitIndex = upHabits[day].findIndex((habit) => habit.id === id)
      upHabits[day][habitIndex].repeats++

      queryClient.setQueryData(QUERY_KEYS.HABITS, upHabits)

      return { previousHabits }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEYS.HABITS, context?.previousHabits)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('week') })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('month') })
    }
  })
}
