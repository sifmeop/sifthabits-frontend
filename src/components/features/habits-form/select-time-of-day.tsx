import { useFormContext } from 'react-hook-form'
import { TimeOfDay } from '~/interfaces/habits'
import { Tabs } from '~/ui/tab'
import { THabitForm } from './use-habit-form'

const options = [
  {
    label: 'Anytime',
    value: TimeOfDay.ANYTIME,
    tabIndex: 8
  },
  {
    label: 'Morning',
    value: TimeOfDay.MORNING,
    tabIndex: 9
  },
  {
    label: 'Afternoon',
    value: TimeOfDay.AFTERNOON,
    tabIndex: 10
  },
  {
    label: 'Evening',
    value: TimeOfDay.EVENING,
    tabIndex: 11
  }
]

export const SelectTimeOfDay = () => {
  const { watch, setValue } = useFormContext<THabitForm>()

  const selectedTimeOfDay = watch('timeOfDay')

  return <Tabs options={options} value={selectedTimeOfDay} onChange={(val) => setValue('timeOfDay', val)} />
}
