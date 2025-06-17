import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { useGetHabitsQuery } from '~/api/habits'
import { CURRENT_DATE, WEEK_DATES } from '~/constants/habit'
import { HabitStatus } from '~/interfaces/habits'
import { CircleProgressBar } from '~/ui/circle-progress-bar'
import { cn } from '~/utils/cn'
import { useSelectedDate } from './habits-provider'

export const WeekDays = () => {
  const { data } = useGetHabitsQuery()
  const { selectedDate, setSelectedDate } = useSelectedDate()

  const onSelectedDate = (date: Date) => {
    document.getElementById('habits-list')?.scrollTo(0, 0)
    setSelectedDate(date)
  }

  return (
    <div className='grid grid-cols-7 gap-2 p-2'>
      {WEEK_DATES.map((date, index) => {
        const progressByDay = data?.[index + 1] ?? []
        const totalHabits = progressByDay.length || 1
        const totalCompleted = progressByDay.reduce((acc, { status }) => {
          if (status === HabitStatus.DONE) {
            acc++
          }

          return acc
        }, 0)

        return (
          <button
            key={date.toISOString()}
            className={cn(
              'font-semibold relative flex flex-col items-center py-1 gap-0.5 transition-colors duration-300 text-grey',
              {
                'text-black': dayjs(selectedDate).isSame(date, 'day'),
                'text-green': dayjs(new Date()).isSame(date, 'day')
              }
            )}
            onClick={() => onSelectedDate(date)}
            disabled={CURRENT_DATE.getTime() < date.getTime()}>
            <span>{dayjs(date).format('ddd')}</span>
            <CircleProgressBar
              onlyProgressBar
              maxValue={totalHabits}
              currentValue={totalCompleted}
              size={20}
              strokeWidth={4}
            />
            {dayjs(selectedDate).isSame(date, 'day') && (
              <motion.div
                layoutId='dot'
                className='absolute -top-1 size-1 bg-blue rounded-full'
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
