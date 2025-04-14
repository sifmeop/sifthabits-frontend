import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'

export const useDeleteHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: MUTATION_KEYS.DELETE_HABIT,
    mutationFn: async (id: string) => {
      const response = await API.delete<PopulatedUserHabit>(`/habits/${id}/delete`)
      return response.data
    },
    onMutate: (id) => {
      const previousHabits = queryClient.getQueryData(QUERY_KEYS.HABITS) as Record<number, PopulatedUserHabit[]>
      const upHabits = Object.fromEntries(
        Object.entries(previousHabits).map(([key, value]) => [
          Number(key),
          value.filter(({ habit }) => habit.id !== id)
        ])
      )

      queryClient.setQueryData(QUERY_KEYS.HABITS, upHabits)

      return { previousHabits }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(QUERY_KEYS.HABITS, context?.previousHabits)
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('week') })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('month') })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.GLOBAL_STATISTICS })
    }
  })
}
