import { HabitTimeOfDay, PopulatedUserHabit } from '~/interfaces/habits'
import { HabitRow } from './habit-row'

interface IProps {
  timeOfDay: HabitTimeOfDay
  data: PopulatedUserHabit[] | undefined
  showTitle?: boolean
}

export const HabitSection = ({ timeOfDay, data, showTitle = true }: IProps) => {
  if (!data || data.length === 0) {
    return
  }

  return (
    <div className='space-y-1'>
      {showTitle && <p className='font-bold text-xs'>{timeOfDay}</p>}
      <div className='space-y-2'>
        {data.map((props, index) => (
          <HabitRow key={props.id} {...props} index={index} />
        ))}
      </div>
    </div>
  )
}
