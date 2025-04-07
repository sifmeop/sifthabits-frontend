import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { useSelectedDate } from './habits-provider'

export const WeekCarousel = ({ children }: React.PropsWithChildren) => {
  const { selectedDate, setSelectedDate } = useSelectedDate()
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setSelectedDate((prev) => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + newDirection)
      return newDate
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div ref={constraintsRef} className='relative overflow-hidden'>
      <AnimatePresence initial={false} custom={direction} mode='wait'>
        <motion.div
          key={selectedDate.toISOString()}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className='p-4 space-y-3 h-full'>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
