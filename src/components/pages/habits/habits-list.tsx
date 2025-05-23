import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'motion/react'
import { useGetHabitsQuery } from '~/api/habits'
import { TimeOfDay } from '~/interfaces/habits'
import { Spinner } from '~/ui/spinner'
import { HabitSection } from './habit-section'
import { useSelectedDate } from './habits-provider'

export const HabitsList = () => {
  const { data, isLoading, isSuccess, isError } = useGetHabitsQuery()
  const { selectedDate } = useSelectedDate()
  const day = dayjs(selectedDate).isoWeekday()

  const anytimeHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === TimeOfDay.ANYTIME) ?? []
  const morningsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === TimeOfDay.MORNING) ?? []
  const afternoonsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === TimeOfDay.AFTERNOON) ?? []
  const eveningsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === TimeOfDay.EVENING) ?? []
  const isEmpty =
    isSuccess &&
    anytimeHabits?.length === 0 &&
    morningsHabits?.length === 0 &&
    afternoonsHabits?.length === 0 &&
    eveningsHabits?.length === 0
  const showAnytimeTitle = morningsHabits?.length > 0 || afternoonsHabits?.length > 0 || eveningsHabits?.length > 0

  return (
    <AnimatePresence mode='wait'>
      <div
        id='habits-list'
        className='p-3 space-y-3 overflow-x-hidden h-full border-t border-t-gray-light overflow-y-auto'>
        <Spinner screenCenter isLoading={isLoading} />
        {isError && (
          <motion.p
            key='error'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='text-center font-medium text-lg'>
            Something went wrong
          </motion.p>
        )}
        {isEmpty && (
          <motion.p
            key='no-habits'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='text-center font-medium text-lg'>
            No habits
          </motion.p>
        )}
        <HabitSection showTitle={showAnytimeTitle} timeOfDay={TimeOfDay.ANYTIME} data={anytimeHabits} />
        <HabitSection timeOfDay={TimeOfDay.MORNING} data={morningsHabits} />
        <HabitSection timeOfDay={TimeOfDay.AFTERNOON} data={afternoonsHabits} />
        <HabitSection timeOfDay={TimeOfDay.EVENING} data={eveningsHabits} />
      </div>
    </AnimatePresence>
  )
}
