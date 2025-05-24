import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MUTATION_KEYS } from '~/constants/mutation-keys'
import { QUERY_KEYS } from '~/constants/query-keys'
import API from '~/lib/api'

export const useUndoHabitMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: MUTATION_KEYS.DELETE_HABIT,
    mutationFn: async (id: string) => {
      const response = await API.put(`/habits/${id}/undo`)
      return response.data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('week') })
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.STATISTICS('month') })
    }
  })
}
