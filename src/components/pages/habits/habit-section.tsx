import { AnimatePresence } from 'motion/react'
import { HabitTimeOfDay, PopulatedUserHabit } from '~/interfaces/habits'
import { HabitRow } from './habit-row'

interface IProps {
  timeOfDay: HabitTimeOfDay
  data: PopulatedUserHabit[] | undefined
}

export const HabitSection = ({ timeOfDay, data }: IProps) => {
  if (!data || data.length === 0) {
    return
  }

  return (
    <div className='space-y-1'>
      {timeOfDay !== HabitTimeOfDay.ANYTIME && <p className='font-bold text-xs'>{timeOfDay}</p>}
      <div className='space-y-2'>
        <AnimatePresence mode='wait'>
          {data.map((props, index) => (
            <HabitRow key={props.id} {...props} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
