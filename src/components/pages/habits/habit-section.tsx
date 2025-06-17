import { PopulatedUserHabit, TimeOfDay } from '~/interfaces/habits'
import { HabitRow } from './habit-row'

interface IProps {
  timeOfDay: TimeOfDay
  data: PopulatedUserHabit[] | undefined
  showTitle?: boolean
}

export const HabitSection = ({ timeOfDay, data, showTitle = true }: IProps) => {
  if (!data || data.length === 0) {
    return
  }

  return (
    <div className='space-y-2'>
      {showTitle && <p className='text-sm font-medium text-gray-400 tracking-wide'>{timeOfDay}</p>}
      <div className='flex flex-col rounded-lg shadow-lg border border-gray-100 divide-y divide-gray-100'>
        {data.map((props, index) => (
          <HabitRow key={props.id} {...props} index={index} />
        ))}
      </div>
    </div>
  )
}
