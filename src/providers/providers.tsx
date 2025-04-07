'use client'

import { init } from '@telegram-apps/sdk-react'
import { Toaster } from 'react-hot-toast'
import { TanstackProvider } from './tanstack-provider'

try {
  init()
} catch (error) {
  console.log(`Error initializing Telegram SDK: ${error}`)
}

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TanstackProvider>
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 2500
        }}
      />
      {children}
    </TanstackProvider>
  )
}
