import { retrieveRawInitData } from '@telegram-apps/sdk-react'
import axios from 'axios'
import { NODE_ENV } from '~/constants/common'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

API.interceptors.request.use((config) => {
  config.headers['tma-init-data'] = NODE_ENV === 'production' ? retrieveRawInitData() : ''
  return config
})

export default API
