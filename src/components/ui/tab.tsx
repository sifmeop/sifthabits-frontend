'use client'

import { motion } from 'motion/react'
import { cn } from '~/utils/cn'

interface IOption<T> {
  label: string
  value: T
}

interface IProps<T> {
  value: T
  onChange: (value: T) => void
  options: IOption<T>[]
  className?: string
}

export const Tabs = <T,>({ value: selectedValue, onChange, options, className }: IProps<T>) => {
  return (
    <div className={cn('flex flex-col rounded-xl border border-gray-light p-1 gap-1', className)}>
      <div style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }} className='grid w-full'>
        {options.map(({ label, value }) => (
          <button
            key={String(value)}
            type='button'
            className='relative h-8 px-2 font-medium'
            onClick={() => onChange(value)}>
            {label}
            {selectedValue === value && (
              <motion.div
                layoutId='tab-background'
                className='absolute inset-0 bg-blue/20 rounded-lg'
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
