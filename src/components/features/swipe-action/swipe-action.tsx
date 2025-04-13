import { CircleX, Edit2, Trash2, Undo2 } from 'lucide-react'
import { motion, PanInfo, useAnimation } from 'motion/react'
import { useEffect, useRef } from 'react'
import { IEditHabitBody } from '~/api/habits'
import { HabitForm } from '~/features/habits-form'
import { useToggle } from '~/hooks/use-toggle'
import { HabitStatus, PopulatedUserHabit } from '~/interfaces/habits'
import { HabitDeleteConfirmation } from './habit-delete-confirmation'
import { HabitUndoConfirmation } from './habit-undo-confirmation'
import { MarkHabitMissedConfirmation } from './mark-habit-missed-confirmation'

type IProps = PopulatedUserHabit & {
  index: number
  children: React.ReactNode
}

export const SwipeAction = ({ index, children, id, habit, status, repeats: currentRepeats }: IProps) => {
  const { title, timeOfDay, weekDays, repeats } = habit

  const [isOpenDeleteSheet, toggleDelete] = useToggle()
  const [isOpenEditSheet, toggleEdit] = useToggle()
  const [isOpenUndoSheet, toggleUndo] = useToggle()
  const [isOpenMarkMissedSheet, toggleMarkMissed] = useToggle()

  const controls = useAnimation()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const isCanUndo = currentRepeats > 0
  const isCanMarkMissed = status !== HabitStatus.MISSED

  const initData: IEditHabitBody & { currentRepeats: number } = {
    id,
    title,
    repeats,
    currentRepeats,
    timeOfDay,
    weekDays
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target

      if (constraintsRef.current && !constraintsRef.current.contains(target as Node)) {
        controls.start({ x: 0 })
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [controls])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { x } = info.offset

    if (x > -40) {
      controls.start({ x: 0 })
      return
    }

    let controlsX = 100

    if (isCanUndo) {
      controlsX += 50
    }

    if (isCanMarkMissed) {
      controlsX += 50
    }

    controls.start({ x: -controlsX })
  }

  return (
    <>
      <motion.div
        key={id}
        ref={constraintsRef}
        initial={{ opacity: 0, x: -100 - index * 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 + index * 100 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className='relative w-full overflow-hidden bg-gray-light rounded-xl shadow-xl border border-black/10'>
        <div className='absolute right-0 top-0 flex h-full shadow-xl z-[0]'>
          <div className='flex'>
            {isCanMarkMissed && (
              <button
                type='button'
                className='flex h-full w-[50px] items-center justify-center bg-red text-white'
                onClick={toggleMarkMissed}>
                <CircleX size={20} />
              </button>
            )}
            {isCanUndo && (
              <button
                type='button'
                className='flex h-full w-[50px] items-center justify-center bg-blue text-white'
                onClick={toggleUndo}>
                <Undo2 size={20} />
              </button>
            )}
            <button
              type='button'
              className='flex h-full w-[50px] items-center justify-center bg-yellow-500 text-white'
              onClick={toggleEdit}>
              <Edit2 size={20} />
            </button>
            <button
              type='button'
              className='flex h-full w-[50px] items-center justify-center bg-red text-white'
              onClick={toggleDelete}>
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <motion.div
          drag='x'
          dragConstraints={{ left: -150, right: 0 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          className='relative z-[1]'>
          {children}
        </motion.div>
      </motion.div>
      <HabitDeleteConfirmation id={habit.id} isOpen={isOpenDeleteSheet} onClose={toggleDelete} />
      <HabitUndoConfirmation id={id} isOpen={isOpenUndoSheet} onClose={toggleUndo} />
      <MarkHabitMissedConfirmation id={id} isOpen={isOpenMarkMissedSheet} onClose={toggleMarkMissed} />
      <HabitForm isOpen={isOpenEditSheet} onClose={toggleEdit} initData={initData} />
    </>
  )
}
