import { disableVerticalSwipes, init, isTMA, viewport } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'

try {
  init()
  disableVerticalSwipes()
  viewport.expand()
} catch (error) {
  console.log(`Error initializing Telegram SDK: ${error}`)
}

export const TelegramProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    const handleInit = async () => {
      try {
        if (viewport.mount.isAvailable()) {
          await viewport.mount()
          viewport.expand()
        }

        if (disableVerticalSwipes.isAvailable()) {
          disableVerticalSwipes()
        }
      } catch (error) {
        console.log('Error initializing Telegram SDK from useLayoutEffect: ', error)
      }
    }

    if (isTMA()) {
      handleInit()
    }
  }, [])

  if (!isTMA()) {
    return (
      <div className='grid place-items-center h-dvh bg-white'>
        <div className='flex flex-col items-center gap-1'>
          <h1 className='text-xl font-bold'>Not Telegram App</h1>
          <a href='https://t.me/sifthabits_bot' target='_blank' className='underline'>
            Open in Telegram
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
