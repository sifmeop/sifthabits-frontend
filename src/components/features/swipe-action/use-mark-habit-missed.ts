import { useMarkHabitMissedMutation } from '~/api/habits'

export const useMarkHabitMissed = (onClose: () => void) => {
  const { mutateAsync, isPending } = useMarkHabitMissedMutation()

  const handleMarkMissed = async (id: string) => {
    if (isPending) {
      return
    }

    try {
      await mutateAsync(id)
      onClose()
    } catch (error) {
      console.log('Error marking habit missed', error)
    }
  }

  return { handleMarkMissed, isLoading: isPending }
}
