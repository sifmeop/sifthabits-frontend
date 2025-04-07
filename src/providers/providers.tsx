'use client'

import { init } from '@telegram-apps/sdk-react'
import { TanstackProvider } from './tanstack-provider'

try {
  init()
} catch (error) {
  console.log(`Error initializing Telegram SDK: ${error}`)
}

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <TanstackProvider>{children}</TanstackProvider>
}
