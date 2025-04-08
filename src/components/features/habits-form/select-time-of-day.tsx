import { motion } from 'motion/react'
import { useFormContext } from 'react-hook-form'
import { HabitTimeOfDay } from '~/interfaces/habits'
import { THabitForm } from './use-habit-form'

const options = [
  {
    label: 'Anytime',
    value: HabitTimeOfDay.ANYTIME,
    tabIndex: 8
  },
  {
    label: 'Morning',
    value: HabitTimeOfDay.MORNING,
    tabIndex: 9
  },
  {
    label: 'Afternoon',
    value: HabitTimeOfDay.AFTERNOON,
    tabIndex: 10
  },
  {
    label: 'Evening',
    value: HabitTimeOfDay.EVENING,
    tabIndex: 11
  }
]

export const SelectTimeOfDay = () => {
  const { watch, setValue } = useFormContext<THabitForm>()

  const selectedTimeOfDay = watch('timeOfDay')

  return (
    <div className='flex flex-col rounded-xl border border-grey-light p-1 gap-1'>
      <div className='grid grid-cols-4 w-full'>
        {options.map(({ label, value, tabIndex }) => (
          <button
            key={value}
            tabIndex={tabIndex}
            type='button'
            className='relative h-8'
            onClick={() => setValue('timeOfDay', value)}>
            {label}
            {selectedTimeOfDay === value && (
              <motion.div
                layoutId='tab-background'
                className='absolute inset-0 bg-blue/20 rounded-lg'
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
