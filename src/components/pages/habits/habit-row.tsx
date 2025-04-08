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
        <div>
          <p className='font-bold'>{title}</p>
          <span>{repeats === 1 ? 'Once a day' : `Goal: ${repeats}`}</span>
        </div>
        <CircleProgressBar
          isMissed={isMissed}
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
      </div>
    </SwipeAction>
  )
}
