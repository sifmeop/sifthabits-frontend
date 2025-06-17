'use client'

import { FormProvider } from 'react-hook-form'
import { IEditHabitBody } from '~/api/habits'
import { Button } from '~/ui/button'
import { Sheet } from '~/ui/sheet'
import { SelectDaysOfWeeks } from './select-days-of-weeks'
import { SelectTimeOfDay } from './select-time-of-day'
import { TitleInput } from './title-input'
import { useHabitForm } from './use-habit-form'

interface IProps {
  isOpen: boolean
  onClose: () => void
  initData?: IEditHabitBody
}

export const HabitForm = ({ isOpen, onClose, initData }: IProps) => {
  const { onSubmit, isLoading, ...methods } = useHabitForm(initData, onClose)

  const handleClose = () => {
    if (isLoading) {
      return
    }

    methods.reset()
    onClose()
  }

  return (
    <FormProvider {...methods}>
      <Sheet title='Creating a habit' isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={onSubmit} className='space-y-4'>
          <TitleInput />
          <SelectDaysOfWeeks />
          <SelectTimeOfDay />
          <div className='space-y-2'>
            <Button type='submit' isLoading={isLoading}>
              {initData ? 'Edit' : 'Create'}
            </Button>
          </div>
        </form>
      </Sheet>
    </FormProvider>
  )
}
