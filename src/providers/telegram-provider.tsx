import { disableVerticalSwipes, init, isTMA, requestFullscreen, viewport } from '@telegram-apps/sdk-react'
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

        if (requestFullscreen.isAvailable()) {
          await requestFullscreen()
        }
      } catch (error) {
        console.log('Error initializing Telegram SDK from useLayoutEffect: ', error)
      }
    }

    if (isTMA()) {
      handleInit()
    }
  }, [])

  return <>{children}</>
}
