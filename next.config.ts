import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ['api.telegram.org']
  }
}

export default nextConfig
