import { useFormContext } from 'react-hook-form'
import { HabitTimeOfDay } from '~/interfaces/habits'
import { Tabs } from '~/ui/tab'
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

  return <Tabs options={options} value={selectedTimeOfDay} onChange={(val) => setValue('timeOfDay', val)} />
}
