import { useDoneHabitMutation } from '~/api/habits'

export const useDoneHabit = () => {
  const { mutateAsync, isPending } = useDoneHabitMutation()

  const handleDoneHabit = async (id: string) => {
    if (isPending) {
      return
    }

    try {
      await mutateAsync(id)
    } catch (error) {
      console.log('error', error)
    }
  }

  return { handleDoneHabit }
}
