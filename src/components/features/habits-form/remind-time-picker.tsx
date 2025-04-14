import { useFormContext } from 'react-hook-form'
import { Toggle } from '~/ui/toggle'
import { cn } from '~/utils/cn'
import { THabitForm } from './use-habit-form'

export const RemindTimePicker = () => {
  const { watch, setValue } = useFormContext<THabitForm>()

  const remindMe = watch('remindMe')
  const remindAt = watch('remindAt')

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center gap-2'>
        <p className='font-semibold'>Remind me</p>
        <Toggle checked={remindMe} onChange={() => setValue('remindMe', !remindMe)} />
      </div>
      <div className='flex items-center gap-4'>
        <p className='font-semibold'>Remind At</p>
        <div
          className={cn('rounded-lg bg-gray-light px-3 py-2 transition-opacity duration-300', {
            'opacity-50': !remindMe
          })}>
          <input
            type='time'
            value={remindAt}
            onChange={(e) => setValue('remindAt', e.target.value)}
            disabled={!remindMe}
          />
        </div>
      </div>
    </div>
  )
}
