/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '~/utils/cn'
import styles from './styles.module.css'

interface IProps {
  isLoading?: boolean
  wrapperClassName?: string
  className?: string
  centerX?: boolean
  screenCenter?: boolean
  boxCenter?: boolean
  size?: number
}

export const Spinner = ({
  isLoading,
  className,
  wrapperClassName,
  screenCenter,
  boxCenter,
  centerX,
  size = 40
}: IProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('relative rounded-lg', wrapperClassName, {
            'absolute inset-0 grid place-items-center bg-black/60 z-[1]': boxCenter,
            'fixed inset-0 grid h-dvh rounded-none place-items-center z-10 bg-black/30': screenCenter,
            'flex justify-center': centerX
          })}>
          <div style={{ '--size': `${size}px` } as any} className={cn(styles.loader, className)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
