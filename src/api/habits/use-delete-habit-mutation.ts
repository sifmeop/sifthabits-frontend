import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import { PopulatedUserHabit } from '~/interfaces/habits'
import API from '~/lib/api'

export interface IDeleteHabitBody {
  id: string
}

export const useDeleteHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: MUTATION_KEYS.DELETE_HABIT,
    mutationFn: async (data: IDeleteHabitBody) => {
      const response = await API.delete<PopulatedUserHabit>(`/habits/${data.id}/delete`)
      return response.data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS })
    }
  })
}
