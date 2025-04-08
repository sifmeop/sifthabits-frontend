import { useDeleteHabitMutation } from '~/api/habits'

export const useDeleteHabit = () => {
  const { mutateAsync, isPending } = useDeleteHabitMutation()

  const handleDelete = async (id: string) => {
    if (isPending) {
      return
    }

    try {
      await mutateAsync(id)
    } catch (error) {
      console.log('Error deleting habit', error)
    }
  }

  return { handleDelete, isLoading: isPending }
}
