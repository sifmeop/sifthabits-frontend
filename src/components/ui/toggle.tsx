import ReactToggle, { ToggleProps } from 'react-toggle'
import 'react-toggle/style.css'
import { cn } from '~/utils/cn'

type IProps = ToggleProps

export const Toggle = ({ className, ...props }: IProps) => {
  return <ReactToggle icons={false} className={cn('', className)} {...props} />
}
