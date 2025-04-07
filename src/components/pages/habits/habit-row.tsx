import { motion } from 'motion/react'
import { IEditHabitBody } from '~/api/habits'
import { HabitForm } from '~/features/habits-form'
import { useToggle } from '~/hooks/use-toggle'
import { HabitStatus, PopulatedUserHabit } from '~/interfaces/habits'
import { useDoneHabit } from '~/pages/habits/use-done-habit'
import { CircleProgressBar } from '~/ui/circle-progress-bar'

type IProps = PopulatedUserHabit & {
  index: number
}

export const HabitRow = ({ id, habit, repeats: currentRepeats, status, index }: IProps) => {
  const { title, timeOfDay, weekDays, repeats } = habit

  const [isOpen, toggle] = useToggle()
  const isDone = status === HabitStatus.DONE
  const initData: IEditHabitBody = {
    id,
    title,
    repeats,
    timeOfDay,
    weekDays
  }

  const { handleDoneHabit } = useDoneHabit()

  const onDone = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isDone) {
      return
    }

    handleDoneHabit(id)
  }

  return (
    <>
      <motion.div
        key={id}
        layout
        initial={{ opacity: 0, x: -100 - index * 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 + index * 100 }}
        transition={{ duration: 1, type: 'spring' }}
        className='rounded-xl border border-black/10 bg-white p-3 shadow-xl grid grid-cols-[1fr_auto] items-center gap-3'
        onClick={toggle}>
        {/* <div className='size-10 rounded-full bg-black/5 grid place-items-center'>
          <LayoutDashboard />
        </div> */}
        <div>
          <p className='font-bold'>{title}</p>
          <span>{repeats === 1 ? 'Once a day' : `Goal: ${repeats}`}</span>
        </div>
        <CircleProgressBar
          onlyProgressBar={false}
          showCompletionAnimation
          currentValue={currentRepeats}
          maxValue={repeats}
          width={35}
          height={35}
          strokeWidth={6}
          text={() => (repeats === 1 || currentRepeats === repeats ? undefined : <span>{currentRepeats}</span>)}
          textClassName='font-bold'
          onClick={onDone}
        />
      </motion.div>
      <HabitForm isOpen={isOpen} onClose={toggle} initData={initData} />
    </>
  )
}
