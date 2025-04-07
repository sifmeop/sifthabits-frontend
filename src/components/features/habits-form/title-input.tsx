import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '~/ui/input'
import { THabitForm } from './use-habit-form'

export const TitleInput = () => {
  const id = 'habit-title'

  const { control } = useFormContext<THabitForm>()

  return (
    <div>
      <label htmlFor={id} className='font-semibold inline-flex mb-1'>
        Title
      </label>
      <Controller
        control={control}
        name='title'
        render={({ field: { value, onChange } }) => (
          <Input value={value} onChange={(e) => onChange(e.target.value)} id={id} placeholder='Drink water' />
        )}
      />
    </div>
  )
}
