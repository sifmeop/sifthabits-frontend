'use client'

import { AnimatePresence } from 'motion/react'
import { ITimeRange, useGetStatisticsQuery } from '~/api/habits'
import { Spinner } from '~/ui/spinner'
import { StatisticsRow } from './statistics-row'

interface IProps {
  timeRange: ITimeRange
}

export const StatisticsList = ({ timeRange }: IProps) => {
  const { data, isLoading } = useGetStatisticsQuery(timeRange)

  return (
    <div id='statistics-list' className='overflow-y-auto p-3'>
      <Spinner screenCenter isLoading={isLoading} />
      <div className='space-y-3'>
        <AnimatePresence>
          {data?.map((habit, index) => (
            <StatisticsRow key={habit.id} {...habit} index={index + 1} timeRange={timeRange} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
