'use client'

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
import { Toaster } from 'react-hot-toast'
import { TanstackProvider } from './tanstack-provider'
import { TelegramProvider } from './telegram-provider'

dayjs.extend(isoWeek)
dayjs.extend(utc)

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TelegramProvider>
      <TanstackProvider>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 2500
          }}
        />
        {children}
      </TanstackProvider>
    </TelegramProvider>
  )
}
