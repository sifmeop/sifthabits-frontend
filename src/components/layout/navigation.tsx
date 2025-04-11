'use client'

import { ChartArea, List } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTER_LINKS } from '~/constants/router-links'
import { cn } from '~/utils/cn'

const LINKS = [
  // {
  //   href: ROUTER_LINKS.AWARDS,
  //   Icon: Trophy,
  //   label: 'Awards'
  // },
  {
    href: ROUTER_LINKS.HABITS,
    Icon: List,
    label: 'Habits'
  },
  {
    href: ROUTER_LINKS.STATISTICS,
    Icon: ChartArea,
    label: 'Statistics'
  }
  // {
  //   href: ROUTER_LINKS.LEADERBOARD,
  //   Icon: ChartArea,
  //   label: 'Leaderboard'
  // }
]

export const Navigation = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return
  }

  return (
    <nav className='px-2 py-3 pb-5 border-t border-t-black/10 bg-white'>
      <ul style={{ gridTemplateColumns: `repeat(${LINKS.length}, 1fr)` }} className='grid gap-2'>
        {LINKS.map(({ label, href, Icon }) => (
          <li
            key={href}
            className={cn('text-grey transition-colors duration-300', {
              'text-blue': pathname === href
            })}>
            <Link href={href} className='flex items-center flex-col gap-0.5'>
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
