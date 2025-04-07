'use client'

import { retrieveRawInitData } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { Spinner } from '~/ui/spinner'

export default function Home() {
  useEffect(() => {
    const initDataRaw = retrieveRawInitData()
    console.log('initDataRaw', initDataRaw)
  }, [])

  return <Spinner absoluteCenter />
}
