import { FieldValues, UseFormRegister } from 'react-hook-form'
import { cn } from '~/utils/cn'

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<FieldValues>
}

export const Input = ({ className, register, ...props }: IProps) => {
  return (
    <input
      {...register}
      className={cn(
        'transition-all focus:outline-none bg-grey-light duration-300 flex p-3 rounded-xl border-transparent w-full',
        className
      )}
      {...props}
    />
  )
}
