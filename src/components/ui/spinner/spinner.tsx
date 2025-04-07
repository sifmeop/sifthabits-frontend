/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '~/utils/cn'
import styles from './styles.module.css'

interface IProps {
  className?: string
  center?: boolean
  absoluteCenter?: boolean
  size?: number
}

export const Spinner = ({ className, absoluteCenter, center, size = 40 }: IProps) => {
  return (
    <div
      className={cn('relative', {
        'fixed inset-0 grid place-items-center': absoluteCenter,
        'flex justify-center': center
      })}>
      <div style={{ '--size': `${size}px` } as any} className={cn(styles.loader, className)} />
    </div>
  )
}
