import { Button, ButtonColor } from '~/ui/button'
import { Sheet } from '~/ui/sheet'
import { useUndoHabit } from './use-undo-habit'

interface IProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export const HabitUndoConfirmation = ({ id, isOpen, onClose }: IProps) => {
  const { handleUndo, isLoading } = useUndoHabit(onClose)

  return (
    <Sheet size='content' title='Undo' isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
      <div className='flex flex-col gap-2 justify-center h-full'>
        <p className='text-base font-semibold text-center'>Are you sure you want to undo this habit?</p>
        <Button onClick={() => handleUndo(id)}>Undo</Button>
        <Button color={ButtonColor.SECONDARY} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Sheet>
  )
}
