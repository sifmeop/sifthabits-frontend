'use client'

import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { IStatistic, ITimeRange } from '~/api/habits'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { CircleProgressBar } from '~/ui/circle-progress-bar'
import { cn } from '~/utils/cn'
import { getMonthlyDates } from '~/utils/getMonthlyDates'

const now = dayjs()

type IProps = IStatistic & {
  index: number
  timeRange: ITimeRange
  isTotal?: boolean
}

export const StatisticsRow = ({
  isTotal,
  index,
  id,
  title,
  timeOfDay,
  streak,
  longest,
  completed,
  summary,
  timeRange
}: IProps) => {
  const monthlyDates = getMonthlyDates()

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: -100 - index * 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 + index * 100 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className='bg-white rounded-xl shadow-xl border border-black/10 p-3'>
      <h4 className='text-base font-semibold'>{isTotal ? 'Total' : `${title} (${timeOfDay?.toLowerCase()})`}</h4>
      <div className='flex gap-2 mb-2 text-gray-500 text-xs'>
        <p>
          Streak: <span className='text-black font-bold'>{streak}</span>
        </p>
        <p>
          Longest: <span className='text-black font-bold'>{longest}</span>
        </p>
        <p>
          Completed: <span className='text-black font-bold'>{completed}</span>
        </p>
      </div>

      {timeRange === 'week' ? (
        <div className='grid grid-cols-7'>
          {Object.entries(summary).map(([date, value]) => {
            const dayOfWeek = dayjs(date).format('ddd')
            return (
              <div key={date} className='flex flex-col gap-2 items-center'>
                <div className='h-10 w-2.5 rounded-xl bg-gray-light relative'>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      'rotate-180 bottom-0 w-full absolute bg-gradient-to-t from-[#6366F1] to-[#8B5CF6] rounded-xl',
                      {
                        'bg-green': value === 100
                      }
                    )}
                  />
                </div>
                <span className='text-gray-500'>{dayOfWeek}</span>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='grid grid-cols-7 gap-2'>
          {DAYS_OF_WEEKS.map((day) => (
            <div key={day} className='text-center'>
              {day}
            </div>
          ))}
          {monthlyDates.map((date, index) => {
            const value = date ? summary[date] : 0
            const isMissed = value === 0 && !now.isSame(date, 'day')

            return (
              <div key={date ?? index} className='flex flex-col gap-2 items-center'>
                {date && (
                  <CircleProgressBar
                    onlyProgressBar
                    showCompletionAnimation={false}
                    isMissed={isTotal ? false : isMissed}
                    size={20}
                    strokeWidth={4}
                    maxValue={100}
                    currentValue={value}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
