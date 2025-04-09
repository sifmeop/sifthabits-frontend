import { disableVerticalSwipes, expandViewport, init, isTMA, mountSwipeBehavior } from '@telegram-apps/sdk-react'
import { NODE_ENV } from '~/constants/common'

try {
  init()
  mountSwipeBehavior()
  expandViewport()
  disableVerticalSwipes()
} catch (error) {
  console.log(`Error initializing Telegram SDK: ${error}`)
}

export const TelegramProvider = ({ children }: React.PropsWithChildren) => {
  if (NODE_ENV === 'production' && !isTMA()) {
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
