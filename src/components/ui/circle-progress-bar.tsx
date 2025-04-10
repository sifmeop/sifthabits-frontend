'use client'

import { AnimatePresence, motion, useAnimation } from 'motion/react'
import { useEffect } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { cn } from '~/utils/cn'

interface IProps {
  currentValue: number
  maxValue: number
  width?: number
  height?: number
  strokeWidth?: number
  gradientStart?: string
  gradientEnd?: string
  gradientId?: string
  backgroundColor?: string
  text?: React.ReactNode | ((percentage: number) => React.ReactNode)
  textClassName?: string
  showCompletionAnimation?: boolean
  onlyProgressBar?: boolean
  isMissed?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export const CircleProgressBar = ({
  currentValue,
  maxValue,
  width = 35,
  height = 35,
  strokeWidth = 6,
  gradientStart = '#6366F1',
  gradientEnd = '#8B5CF6',
  gradientId = 'circleGradient',
  backgroundColor = '#E5E7EB',
  text,
  textClassName = 'text-xl font-semibold',
  showCompletionAnimation = true,
  onlyProgressBar = false,
  isMissed = false,
  onClick
}: IProps) => {
  const percentage = Math.min(100, Math.max(0, (currentValue / maxValue) * 100))
  const isComplete = percentage >= 100

  const controls = useAnimation()
  const completionControls = useAnimation()
  const backgroundControls = useAnimation()

  const radius = (Math.min(width, height) - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const center = {
    x: width / 2,
    y: height / 2
  }

  useEffect(() => {
    if (currentValue !== maxValue) {
      backgroundControls.start({
        fill: 'rgba(16, 185, 129, 0)',
        transition: { duration: 0.3 }
      })

      completionControls.start({
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 }
      })
    }
  }, [currentValue, maxValue])

  useEffect(() => {
    controls.start({
      strokeDashoffset,
      transition: { duration: 0.8, ease: 'easeOut' }
    })

    if (isComplete && showCompletionAnimation && !onlyProgressBar) {
      completionControls.start({
        scale: [1, 1.2, 1],
        opacity: [0, 1, 1],
        transition: { duration: 0.5, delay: isMissed ? 1 : 0.3 }
      })
    } else {
      backgroundControls.start({
        fill: 'transparent',
        transition: { duration: 0.3 }
      })
    }
  }, [isComplete, strokeDashoffset, controls, completionControls, backgroundControls])

  const displayText = typeof text === 'function' ? text(percentage) : text

  return (
    <div style={{ width, height }} className='relative inline-flex items-center justify-center' onClick={onClick}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor={gradientStart} />
            <stop offset='100%' stopColor={gradientEnd} />
          </linearGradient>

          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='2' result='blur' />
            <feComposite in='SourceGraphic' in2='blur' operator='over' />
          </filter>
        </defs>
        <motion.circle
          cx={center.x}
          cy={center.y}
          r={radius}
          fill='transparent'
          animate={backgroundControls}
          stroke={isMissed ? 'var(--red)' : backgroundColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={controls}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill='none'
          stroke={isComplete ? '#10B981' : `url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap='round'
          transform={`rotate(-90 ${center.x} ${center.y})`}
        />
      </svg>
      {displayText && (
        <div
          className={cn(`absolute ${textClassName}`, {
            'text-white z-10': isComplete
          })}>
          {displayText}
        </div>
      )}
      <AnimatePresence>
        <motion.div
          className='absolute inset-0 flex items-center justify-center'
          initial={{ scale: 0, opacity: 0 }}
          animate={completionControls}>
          <motion.div
            className='absolute inset-0 rounded-full bg-green'
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <motion.div
            className='absolute inset-0 bg-white bg-opacity-30 rounded-full'
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.5, 1],
              opacity: [0.8, 0.2, 0]
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.svg
            width={width * 0.6}
            height={height * 0.6}
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='3'
            className='relative z-10'>
            <motion.path
              d='M20 6L9 17l-5-5'
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </motion.svg>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {isMissed && (
          <div className='absolute inset-0 grid place-items-center'>
            <motion.svg
              width={width * 0.6}
              height={height * 0.6}
              viewBox='0 0 24 24'
              fill='none'
              stroke='var(--red)'
              strokeWidth='4'>
              <motion.path
                d='M18 6 6 18'
                initial={{ pathLength: 0, rotate: 180, transformOrigin: 'center' }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0, transition: { duration: 0.1, delay: 0 } }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.path
                d='m6 6 12 12'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0, transition: { duration: 0.1, delay: 0 } }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.svg>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
