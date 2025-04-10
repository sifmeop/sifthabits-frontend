import { cn } from '~/utils/cn'
import { Spinner } from './spinner'

export const enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  color?: ButtonColor
}

export const Button = ({ className, isLoading, children, color = ButtonColor.PRIMARY, ...props }: IProps) => {
  return (
    <button
      type='button'
      className={cn(
        'relative w-full grid place-items-center p-2 rounded-xl text-white transition-all duration-300',
        className,
        {
          'bg-blue': color === ButtonColor.PRIMARY,
          'bg-red': color === ButtonColor.SECONDARY,
          'bg-gray-light text-black': color === ButtonColor.TERTIARY,
          'pointer-events-none': isLoading
        }
      )}
      {...props}>
      <Spinner boxCenter size={24} isLoading={isLoading} />
      {children}
    </button>
  )
}
