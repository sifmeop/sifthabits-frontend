'use client'

import { redirect } from 'next/navigation'
import { ROUTER_LINKS } from '~/constants/router-links'

export default function Home() {
  return redirect(ROUTER_LINKS.HABITS)
}
