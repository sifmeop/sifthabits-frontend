import dayjs from 'dayjs'
import { useGetHabitsQuery } from '~/api/habits'
import { HabitTimeOfDay } from '~/interfaces/habits'
import { Spinner } from '~/ui/spinner'
import { HabitSection } from './habit-section'
import { useSelectedDate } from './habits-provider'

export const HabitsList = () => {
  const { data, isLoading, isSuccess, isError } = useGetHabitsQuery()
  const { selectedDate } = useSelectedDate()
  const day = dayjs(selectedDate).isoWeekday()

  const anytimeHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === HabitTimeOfDay.ANYTIME)
  const morningsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === HabitTimeOfDay.MORNING)
  const afternoonsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === HabitTimeOfDay.AFTERNOON)
  const eveningsHabits = data?.[day]?.filter(({ habit }) => habit.timeOfDay === HabitTimeOfDay.EVENING)
  const isEmpty =
    anytimeHabits?.length === 0 &&
    morningsHabits?.length === 0 &&
    afternoonsHabits?.length === 0 &&
    eveningsHabits?.length === 0

  return (
    <div className='p-4 space-y-3 h-full border-t border-t-grey-light'>
      {isLoading && <Spinner center />}
      {isError && <p>Error</p>}
      {isSuccess && isEmpty && <p className='text-center font-medium text-lg'>No habits</p>}
      <>
        <HabitSection timeOfDay={HabitTimeOfDay.ANYTIME} data={anytimeHabits} />
        <HabitSection timeOfDay={HabitTimeOfDay.MORNING} data={morningsHabits} />
        <HabitSection timeOfDay={HabitTimeOfDay.AFTERNOON} data={afternoonsHabits} />
        <HabitSection timeOfDay={HabitTimeOfDay.EVENING} data={eveningsHabits} />
      </>
    </div>
  )
}
