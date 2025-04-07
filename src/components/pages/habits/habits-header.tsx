import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { HabitForm } from '~/features/habits-form'
import { useToggle } from '~/hooks/use-toggle'
import { useSelectedDate } from './habits-provider'

export const HabitsHeader = () => {
  const [isOpen, toggle] = useToggle()

  const { selectedDate } = useSelectedDate()
  const selectedDateLabel = dayjs(selectedDate).format('dddd, D MMM. YYYY')

  return (
    <>
      <div className='grid grid-cols-[1fr_2fr_1fr] items-center p-2'>
        <h1 className='text-xl font-bold'>Habits</h1>
        <motion.p
          key={selectedDateLabel}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className='text-center text-sm font-medium'>
          {selectedDateLabel}
        </motion.p>
        <button className='ml-auto' onClick={toggle}>
          <Plus strokeWidth={2.5} />
        </button>
      </div>
      <HabitForm isOpen={isOpen} onClose={toggle} />
    </>
  )
}
