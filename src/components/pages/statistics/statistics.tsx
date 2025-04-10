'use client'

import { useState } from 'react'
import { ITimeRange } from '~/api/habits'
import { StatisticsList } from './statistics-list'
import { StatisticsTabs } from './statistics-tabs'

export const Statistics = () => {
  const [timeRange, setTimeRange] = useState<ITimeRange>('week')

  return (
    <div className='overflow-y-auto grid grid-rows-[auto_1fr] gap-1'>
      <StatisticsTabs timeRange={timeRange} setTimeRange={setTimeRange} />
      <StatisticsList timeRange={timeRange} />
    </div>
  )
}
