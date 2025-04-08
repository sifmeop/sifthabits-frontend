'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Spinner } from './spinner'

interface IProps extends React.PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'content'
  isLoading?: boolean
}

export const Sheet = ({ isOpen, onClose, title, size = 'lg', children, isLoading = false }: IProps) => {
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layout = document.getElementById('layout')
    const body = document.body

    if (!layout) {
      return
    }

    if (isOpen) {
      body.style.overflow = 'hidden'
      layout.style.scale = '0.96'
      layout.style.borderRadius = '12px'
    } else {
      body.removeAttribute('style')
      layout.removeAttribute('style')
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getHeightSize = () => {
    switch (size) {
      case 'sm':
        return '30dvh'
      case 'md':
        return '60dvh'
      case 'lg':
        return '97dvh'
      case 'content':
        return 'auto'
    }
  }

  const height = getHeightSize()

  if (typeof document === 'undefined') {
    return
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key='sheet'
            initial={{ y: '100%' }}
            animate={{ y: 0, transition: { duration: 0.4, bounce: false, type: 'spring' } }}
            exit={{ y: '100%', transition: { duration: 0.4 } }}
            className='fixed top-0 left-0 w-full h-full z-[1]'>
            <div
              ref={sheetRef}
              style={{ height }}
              className='fixed shadow-2xl flex flex-col rounded-t-lg bottom-0 left-0 w-full bg-white'>
              <div className='relative p-3'>
                <Spinner boxCenter isLoading={isLoading} wrapperClassName='rounded-t-lg rounded-b-none' />
                <div className='flex items-center mb-2'>
                  {title && <p className='text-xl font-bold'>{title}</p>}
                  <button className='flex ml-auto' onClick={onClose}>
                    <X />
                  </button>
                </div>
                <div className='h-full flex flex-col overflow-y-auto'>{children}</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 w-full h-full bg-black/40'
          />
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
