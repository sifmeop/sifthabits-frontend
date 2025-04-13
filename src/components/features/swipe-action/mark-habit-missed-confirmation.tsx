import { Button, ButtonColor } from '~/ui/button'
import { Sheet } from '~/ui/sheet'
import { useMarkHabitMissed } from './use-mark-habit-missed'

interface IProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export const MarkHabitMissedConfirmation = ({ id, isOpen, onClose }: IProps) => {
  const { handleMarkMissed, isLoading } = useMarkHabitMissed(onClose)

  return (
    <Sheet size='content' title='Mark habit as missed' isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
      <div className='flex flex-col gap-2 justify-center h-full'>
        <p className='text-base font-semibold text-center'>Are you sure you want to mark this habit as missed?</p>
        <Button color={ButtonColor.SECONDARY} onClick={() => handleMarkMissed(id)}>
          Mark as missed
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Sheet>
  )
}
