'use client'

import { FormProvider } from 'react-hook-form'
import { IEditHabitBody, useDeleteHabitMutation } from '~/api/habits'
import { Button, ButtonColor } from '~/ui/button'
import { Sheet } from '~/ui/sheet'
import { RepeatsPerDay } from './repeats-per-day'
import { SelectDaysOfWeeks } from './select-days-of-weeks'
import { TitleInput } from './title-input'
import { useHabitForm } from './use-habit-form'

interface IProps {
  isOpen: boolean
  onClose: () => void
  initData?: IEditHabitBody
}

export const HabitForm = ({ isOpen, onClose, initData }: IProps) => {
  const { onSubmit, isLoading, ...methods } = useHabitForm(initData, onClose)
  const { mutateAsync, isPending } = useDeleteHabitMutation()

  const handleClose = () => {
    if (isLoading || isPending) {
      return
    }

    methods.reset()
    onClose()
  }

  const onDelete = async () => {
    if (isPending) {
      return
    }

    try {
      await mutateAsync({ id: initData!.id })
      handleClose()
    } catch (error) {
      console.log('Error deleting habit', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <Sheet title='Creating a habit' isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={onSubmit} className='space-y-4'>
          <TitleInput />
          {/* <HabitEmojiPicker /> */}
          <SelectDaysOfWeeks />
          {/* <HabitColor /> */}
          <RepeatsPerDay />
          <div className='space-y-2'>
            <Button type='submit' isLoading={isLoading}>
              {initData ? 'Edit' : 'Create'}
            </Button>
            {initData && (
              <Button color={ButtonColor.SECONDARY} isLoading={isPending} onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </Sheet>
    </FormProvider>
  )
}
