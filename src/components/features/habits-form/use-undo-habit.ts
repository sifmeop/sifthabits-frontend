import { useUndoHabitMutation } from '~/api/habits'

export const useUndoHabit = (onClose: () => void) => {
  const { mutateAsync, isPending } = useUndoHabitMutation()

  const handleUndo = async (id: string) => {
    if (isPending) {
      return
    }

    try {
      await mutateAsync(id)
      onClose()
    } catch (error) {
      console.log('Error undo habit', error)
    }
  }

  return { handleUndo, isLoading: isPending }
}
