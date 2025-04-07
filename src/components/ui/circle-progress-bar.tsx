'use client'

import { AnimatePresence, motion, useAnimation } from 'motion/react'
import { memo, useEffect, useRef } from 'react'
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
  onClick?: (e: React.MouseEvent) => void
}

export const CircleProgressBar = memo(
  ({
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
    onClick
  }: IProps) => {
    const percentage = Math.min(100, Math.max(0, (currentValue / maxValue) * 100))
    const isComplete = percentage >= 100

    const prevMaxValueRef = useRef(maxValue)

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
      if (prevMaxValueRef.current !== maxValue) {
        backgroundControls.start({
          fill: 'rgba(16, 185, 129, 0)',
          transition: { duration: 0.3 }
        })

        completionControls.start({
          scale: 0,
          opacity: 0,
          transition: { duration: 0.3 }
        })

        prevMaxValueRef.current = maxValue
      }
    }, [maxValue, backgroundControls, completionControls])

    useEffect(() => {
      controls.start({
        strokeDashoffset,
        transition: { duration: 0.8, ease: 'easeOut' }
      })

      if (isComplete && showCompletionAnimation && !onlyProgressBar) {
        completionControls.start({
          scale: [1, 1.2, 1],
          opacity: [0, 1, 1],
          transition: { duration: 0.5, delay: 0.3 }
        })
      } else {
        backgroundControls.start({
          fill: 'transparent',
          transition: { duration: 0.3 }
        })
      }
    }, [isComplete, strokeDashoffset, controls, completionControls, backgroundControls])

    const generateStars = () => {
      const stars = []
      const starCount = 8

      for (let i = 0; i < starCount; i++) {
        const angle = (i / starCount) * Math.PI * 2
        const distance = radius * 0.8
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const delay = i * 0.05 + 0.2
        const size = Math.random() * 10 + 5

        stars.push({ x, y, delay, size })
      }

      return stars
    }

    const stars = generateStars()

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
            stroke={backgroundColor}
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
          {/* {isComplete && showCompletionAnimation && ( */}
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            initial={{ scale: 0, opacity: 0 }}
            animate={completionControls}>
            <motion.div
              className='absolute inset-0 rounded-full bg-green-500'
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

            <svg width={width} height={height} className='absolute inset-0'>
              {stars.map((star, index) => (
                <g key={index} transform={`translate(${center.x}, ${center.y})`}>
                  <motion.path
                    d='M0,-5 L1,-1.5 L5,0 L1,1.5 L0,5 L-1,1.5 L-5,0 L-1,-1.5 Z'
                    fill='white'
                    filter='url(#glow)'
                    initial={{
                      scale: 0,
                      opacity: 0,
                      x: 0,
                      y: 0,
                      rotate: 0
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                      x: [0, star.x],
                      y: [0, star.y],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: star.delay,
                      ease: 'easeOut'
                    }}
                    style={{
                      transformOrigin: 'center',
                      transformBox: 'fill-box'
                    }}
                  />
                </g>
              ))}

              {[...Array(6)].map((_, index) => {
                const angle = Math.random() * Math.PI * 2
                const distance = radius * (Math.random() * 0.5 + 0.7)
                const x = Math.cos(angle) * distance
                const y = Math.sin(angle) * distance
                const delay = Math.random() * 0.5 + 0.5

                return (
                  <g key={`sparkle-${index}`} transform={`translate(${center.x}, ${center.y})`}>
                    <motion.circle
                      cx={0}
                      cy={0}
                      r={2}
                      fill='white'
                      filter='url(#glow)'
                      initial={{
                        scale: 0,
                        opacity: 0,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                        x: [0, x],
                        y: [0, y]
                      }}
                      transition={{
                        duration: 1,
                        delay: delay,
                        ease: 'easeOut'
                      }}
                    />
                  </g>
                )
              })}
            </svg>
          </motion.div>
          {/* )} */}
        </AnimatePresence>
      </div>
    )
  }
)

CircleProgressBar.displayName = 'CircleProgressBar'
