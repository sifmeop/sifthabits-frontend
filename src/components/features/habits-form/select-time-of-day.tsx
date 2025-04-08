import { motion } from 'motion/react'
import { useFormContext } from 'react-hook-form'
import { HabitTimeOfDay } from '~/interfaces/habits'
import { THabitForm } from './use-habit-form'

const options = [
  {
    label: 'Anytime',
    value: HabitTimeOfDay.ANYTIME
  },
  {
    label: 'Morning',
    value: HabitTimeOfDay.MORNING
  },
  {
    label: 'Afternoon',
    value: HabitTimeOfDay.AFTERNOON
  },
  {
    label: 'Evening',
    value: HabitTimeOfDay.EVENING
  }
]

export const SelectTimeOfDay = () => {
  const { watch, setValue } = useFormContext<THabitForm>()

  const selectedTimeOfDay = watch('timeOfDay')

  return (
    <div className='flex flex-col rounded-xl border border-grey-light p-1 gap-1'>
      <div className='grid grid-cols-4 w-full'>
        {options.map(({ label, value }) => (
          <button key={value} type='button' className='relative h-8' onClick={() => setValue('timeOfDay', value)}>
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
