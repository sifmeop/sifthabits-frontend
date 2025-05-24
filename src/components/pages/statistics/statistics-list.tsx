'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ITimeRange, useGetStatisticsQuery } from '~/api/habits'
import { TimeOfDay } from '~/interfaces/habits'
import { Spinner } from '~/ui/spinner'
import { StatisticsRow } from './statistics-row'
import { StatisticsTotal } from './statistics-total'

interface IProps {
  timeRange: ITimeRange
}

export const StatisticsList = ({ timeRange }: IProps) => {
  const { data = [], isError, isLoading, isSuccess } = useGetStatisticsQuery(timeRange)
  const isEmpty = !isLoading && isSuccess && data && data.length === 0

  const anytimeHabits = data.filter((habit) => habit.timeOfDay === TimeOfDay.ANYTIME) ?? []
  const morningsHabits = data.filter((habit) => habit.timeOfDay === TimeOfDay.MORNING) ?? []
  const afternoonsHabits = data.filter((habit) => habit.timeOfDay === TimeOfDay.AFTERNOON) ?? []
  const eveningsHabits = data.filter((habit) => habit.timeOfDay === TimeOfDay.EVENING) ?? []

  return (
    <div id='statistics-list' className='overflow-y-auto p-3'>
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
      {data && data.length > 0 && (
        <div className='space-y-3'>
          <AnimatePresence>
            <StatisticsTotal data={data} timeRange={timeRange} />
            {anytimeHabits.map((habit, index) => (
              <StatisticsRow key={habit.id} {...habit} index={index + 1} timeRange={timeRange} />
            ))}
            {morningsHabits.map((habit, index) => (
              <StatisticsRow key={habit.id} {...habit} index={index + 1} timeRange={timeRange} />
            ))}
            {afternoonsHabits.map((habit, index) => (
              <StatisticsRow key={habit.id} {...habit} index={index + 1} timeRange={timeRange} />
            ))}
            {eveningsHabits.map((habit, index) => (
              <StatisticsRow key={habit.id} {...habit} index={index + 1} timeRange={timeRange} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
