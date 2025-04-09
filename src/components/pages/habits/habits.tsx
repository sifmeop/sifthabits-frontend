'use client'

import { HabitsHeader } from './habits-header'
import { HabitsList } from './habits-list'
import { HabitsProvider } from './habits-provider'
import { WeekDays } from './week-days'

export const Habits = () => {
  return (
    <HabitsProvider>
      <div className='grid grid-rows-[auto_auto_1fr] overflow-y-auto'>
        <HabitsHeader />
        <WeekDays />
        {/* <WeekCarousel> */}
        <HabitsList />
        {/* </WeekCarousel> */}
      </div>
    </HabitsProvider>
  )
}
