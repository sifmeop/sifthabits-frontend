import { useDeleteHabit } from '~/features/habits-form/use-delete-habit'
import { Button, ButtonColor } from '~/ui/button'
import { Sheet } from '~/ui/sheet'

interface IProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

export const HabitDeleteConfirmation = ({ id, isOpen, onClose }: IProps) => {
  const { handleDelete, isLoading } = useDeleteHabit()

  const onDelete = () => {
    onClose()
    setTimeout(() => {
      handleDelete(id)
    }, 250)
  }

  return (
    <Sheet size='content' title='Delete' isOpen={isOpen} onClose={onClose} isLoading={isLoading}>
      <div className='flex flex-col gap-2 justify-center h-full'>
        <p className='text-base font-semibold text-center'>Are you sure you want to delete this habit?</p>
        <Button color={ButtonColor.SECONDARY} onClick={onDelete}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </Sheet>
  )
}
