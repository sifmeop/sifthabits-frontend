'use client'

import {
  closeMiniApp,
  disableVerticalSwipes,
  expandViewport,
  init,
  isTMA,
  mountSwipeBehavior,
  on
} from '@telegram-apps/sdk-react'
import { useEffect, useState } from 'react'
import { NODE_ENV } from '~/constants/common'
import { Spinner } from '~/ui/spinner'

type IState = 'loading' | 'is_not_tma' | 'is_tma'

export const TelegramProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState<IState>('loading')

  useEffect(() => {
    const handleInit = () => {
      try {
        init()
        mountSwipeBehavior()
        expandViewport()
        disableVerticalSwipes()

        const removeListener = on('popup_closed', (event) => {
          const button_id = event.button_id

          switch (button_id) {
            case 'close_mini_app':
              closeMiniApp()
              break
            default:
              break
          }

          removeListener()
        })

        setState('is_tma')
      } catch (error) {
        console.log(`Error initializing Telegram SDK: ${error}`)
        setState('is_not_tma')
      }
    }

    if (isTMA()) {
      handleInit()
    } else if (NODE_ENV === 'production') {
      setState('is_not_tma')
    } else {
      setState('is_tma')
    }
  }, [])

  if (state === 'loading') {
    return <Spinner isLoading screenCenter />
  }

  if (state === 'is_not_tma') {
    return (
      <div className='grid place-items-center h-dvh bg-white'>
        <div className='flex flex-col items-center gap-1'>
          <h1 className='text-xl font-bold'>Not Telegram App</h1>
          <a href='https://t.me/sifthabits_bot' target='_blank' rel='noreferrer,noopener' className='underline'>
            Open in Telegram
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
