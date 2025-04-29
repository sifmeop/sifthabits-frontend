import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import axios from 'axios'
import { NODE_ENV } from '~/constants/common'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

API.interceptors.request.use((config) => {
  const { initDataRaw } = retrieveLaunchParams()
  config.headers['tma-init-data'] = NODE_ENV === 'production' ? initDataRaw : ''
  return config
})

export default API
