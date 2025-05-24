import { AnimatePresence, motion } from 'motion/react'
import { SwipeAction } from '~/features/swipe-action'
import { HabitStatus, PopulatedUserHabit } from '~/interfaces/habits'
import { useDoneHabit } from '~/pages/habits/use-done-habit'
import { CircleProgressBar } from '~/ui/circle-progress-bar'

type IProps = PopulatedUserHabit & {
  index: number
}

export const HabitRow = (props: IProps) => {
  const { id, habit, repeats: currentRepeats, status } = props
  const { title, repeats } = habit

  const isDone = status === HabitStatus.DONE
  const isMissed = status === HabitStatus.MISSED

  const { handleDoneHabit } = useDoneHabit()

  const onDone = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isDone) {
      return
    }

    handleDoneHabit(id)
  }

  return (
    <SwipeAction {...props}>
      <div className='bg-white p-3 grid grid-cols-[1fr_auto] items-center gap-3'>
        <div className='space-y-0.5'>
          <p className='font-semibold'>{title}</p>
          <div className='flex items-center gap-1.5'>
            <span className='text-sm text-gray-500'>{repeats === 1 ? 'Once a day' : `Goal: ${repeats}`}</span>
            <AnimatePresence>
              {(props.streak ?? 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className='rounded-2xl flex bg-red/10 items-center gap-0.5 pl-2 pr-2.5 py-0.5'>
                  🔥 <span className='text-orange-400 text-xs'>{props.streak}</span>
                  {/* <Flame size={16} fill='red' stroke='red' /> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <CircleProgressBar
          isMissed={isMissed}
          onlyProgressBar={false}
          showCompletionAnimation
          currentValue={currentRepeats}
          maxValue={repeats}
          size={32}
          strokeWidth={5}
          text={() => (repeats === 1 || currentRepeats === repeats ? undefined : <span>{currentRepeats}</span>)}
          textClassName='font-bold'
          onClick={onDone}
        />
      </div>
    </SwipeAction>
  )
}
