import { FieldValues, UseFormRegister } from 'react-hook-form'
import { cn } from '~/utils/cn'

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegister<FieldValues>
  error?: string
}

export const Input = ({ className, register, error, ...props }: IProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <input
        {...register}
        className={cn(
          'transition-all focus:outline-none bg-gray-light duration-300 flex p-3 rounded-xl border-transparent w-full',
          className
        )}
        {...props}
      />
      {error && <p className='text-red'>{error}</p>}
    </div>
  )
}
