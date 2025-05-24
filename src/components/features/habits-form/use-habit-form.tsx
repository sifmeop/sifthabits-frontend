import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { ICreateHabitBody, IEditHabitBody, useCreateHabitMutation, useEditHabitMutation } from '~/api/habits'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { TimeOfDay } from '~/interfaces/habits'

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  weekDays: z.array(z.number()).min(1, 'Please select at least one day'),
  repeats: z.number(),
  timeOfDay: z.nativeEnum(TimeOfDay)
})

export type THabitForm = z.infer<typeof schema>

export const useHabitForm = (initData?: IEditHabitBody, onClose?: () => void) => {
  const { mutateAsync: createMutate, isPending: isCreatePending } = useCreateHabitMutation()
  const { mutateAsync: editMutate, isPending: isEditPending } = useEditHabitMutation()

  const isLoading = isCreatePending || isEditPending

  const defaultValues: THabitForm = {
    title: initData?.title ?? '',
    weekDays: initData?.weekDays ?? DAYS_OF_WEEKS.map((day) => DAYS_OF_WEEKS.indexOf(day) + 1),
    repeats: initData?.repeats ?? 1,
    timeOfDay: initData?.timeOfDay ?? TimeOfDay.ANYTIME
  }

  const methods = useForm<THabitForm>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (initData) {
      methods.reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData])

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (initData) {
        const body: IEditHabitBody = {
          id: initData.id!,
          title: data.title,
          weekDays: data.weekDays.sort((a, b) => a - b),
          repeats: data.repeats,
          timeOfDay: data.timeOfDay
        }
        await editMutate(body as IEditHabitBody)
      } else {
        const body: ICreateHabitBody = {
          title: data.title,
          weekDays: data.weekDays.sort((a, b) => a - b),
          repeats: data.repeats,
          timeOfDay: data.timeOfDay
        }
        await createMutate(body as ICreateHabitBody)
      }
      onClose?.()
      methods.reset()
    } catch (error) {
      console.log(initData ? 'Error updating habit' : 'Error creating habit', error)
      toast.error(initData ? 'Error updating habit' : 'Error creating habit')
    }
  })

  return { ...methods, onSubmit, isLoading }
}
