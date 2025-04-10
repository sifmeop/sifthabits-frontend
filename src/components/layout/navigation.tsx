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
  // {
  //   href: ROUTER_LINKS.PROGRESS,
  //   Icon: ChartPie,
  //   label: 'Progress'
  // }
  {
    href: ROUTER_LINKS.STATISTICS,
    Icon: ChartArea,
    label: 'Statistics'
  }
]

export const Navigation = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return
  }

  return (
    <nav className='p-2 pb-5 border-t border-t-black/10 bg-white'>
      <ul className='flex justify-evenly gap-2'>
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
