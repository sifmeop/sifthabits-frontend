'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface IProps extends React.PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export const Sheet = ({ isOpen, onClose, title, children }: IProps) => {
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
      layout.style.background = 'rgba(255, 255 ,255 ,0.8)'
    } else {
      body.removeAttribute('style')
      layout.removeAttribute('style')
    }
  }, [isOpen])

  if (typeof document === 'undefined') {
    return
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='sheet'
          initial={{ y: '100%' }}
          animate={{ y: 0, transition: { duration: 0.4, bounce: false, type: 'spring' } }}
          exit={{ y: '100%', transition: { duration: 0.4 } }}
          className='fixed top-0 left-0 w-full h-full'>
          <div className='h-[97dvh] fixed shadow-2xl rounded-t-lg p-3 bottom-0 left-0 w-full bg-white'>
            <div className='flex items-center mb-2'>
              {title && <p className='text-xl font-bold'>{title}</p>}
              <button className='flex ml-auto' onClick={onClose}>
                <X />
              </button>
            </div>
            <div className='overflow-y-auto'>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
