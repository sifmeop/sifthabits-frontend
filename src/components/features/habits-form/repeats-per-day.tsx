import { Minus, Plus } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button, ButtonColor } from '~/ui/button'
import { Input } from '~/ui/input'
import { THabitForm } from './use-habit-form'

export const RepeatsPerDay = () => {
  const { control, setValue, getValues } = useFormContext<THabitForm>()

  const increment = () => {
    const newValue = getValues('repeats') + 1
    setValue('repeats', newValue)
  }

  const decrement = () => {
    const newValue = getValues('repeats') - 1

    if (newValue < 1) {
      return
    }

    setValue('repeats', newValue)
  }

  return (
    <div className='flex items-center gap-2 justify-between'>
      <p>Repeats per day</p>
      <div className='flex items-center gap-2'>
        <Button color={ButtonColor.TERTIARY} onClick={decrement}>
          <Minus size={20} strokeWidth={2} color='#000000' />
        </Button>
        <Controller
          control={control}
          name='repeats'
          render={({ field: { value, onChange } }) => (
            <Input
              className='w-12 h-[36px] text-center font-semibold'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              type='number'
              inputMode='numeric'
            />
          )}
        />
        <Button color={ButtonColor.TERTIARY} onClick={increment}>
          <Plus size={20} strokeWidth={2} color='#000000' />
        </Button>
      </div>
    </div>
  )
}
