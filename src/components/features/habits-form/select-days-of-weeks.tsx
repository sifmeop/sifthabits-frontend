'use client'

import { useFormContext } from 'react-hook-form'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { cn } from '~/utils/cn'
import { THabitForm } from './use-habit-form'

export const SelectDaysOfWeeks = () => {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<THabitForm>()

  const weekDays = watch('weekDays')

  const onClick = (day: string) => {
    const dayIndex = DAYS_OF_WEEKS.indexOf(day) + 1

    if (weekDays.includes(dayIndex)) {
      setValue(
        'weekDays',
        weekDays.filter((selectedDay) => selectedDay !== dayIndex)
      )
    } else {
      setValue('weekDays', [...weekDays, dayIndex])
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      <label className='font-semibold inline-flex'>Days of weeks</label>
      <div className='flex justify-between'>
        {DAYS_OF_WEEKS.map((day) => (
          <button
            type='button'
            key={day}
            className={cn(
              'grid transition-colors duration-300 place-items-center size-9 rounded-full border-4 text-blue border-blue text-xs font-semibold',
              {
                'text-white bg-blue': weekDays.includes(DAYS_OF_WEEKS.indexOf(day) + 1)
              }
            )}
            onClick={() => onClick(day)}>
            {day}
          </button>
        ))}
      </div>
      <span className='text-red text-sm'>{errors.weekDays?.message}</span>
    </div>
  )
}
