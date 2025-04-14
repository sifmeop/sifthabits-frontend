import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { ICreateHabitBody, IEditHabitBody, useCreateHabitMutation, useEditHabitMutation } from '~/api/habits'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { HabitTimeOfDay } from '~/interfaces/habits'

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  weekDays: z.array(z.number()).min(1, 'Please select at least one day'),
  repeats: z.number(),
  timeOfDay: z.nativeEnum(HabitTimeOfDay),
  remindMe: z.boolean(),
  remindAt: z.string()
})

export type THabitForm = z.infer<typeof schema>

const getLocalTimeFromUTCRemindAt = (remindAt?: string | null) => {
  if (!remindAt) {
    return dayjs().format('HH:mm')
  }

  return dayjs.utc(remindAt, 'HH:mm').local().format('HH:mm')
}

export const useHabitForm = (isOpen: boolean, initData?: IEditHabitBody, onClose?: () => void) => {
  const { mutateAsync: createMutate, isPending: isCreatePending } = useCreateHabitMutation()
  const { mutateAsync: editMutate, isPending: isEditPending } = useEditHabitMutation()

  const isLoading = isCreatePending || isEditPending

  const defaultValues: THabitForm = {
    title: initData?.title ?? '',
    weekDays: initData?.weekDays ?? DAYS_OF_WEEKS.map((day) => DAYS_OF_WEEKS.indexOf(day) + 1),
    repeats: initData?.repeats ?? 1,
    timeOfDay: initData?.timeOfDay ?? HabitTimeOfDay.ANYTIME,
    remindMe: initData?.remindAt ? true : false,
    remindAt: getLocalTimeFromUTCRemindAt(initData?.remindAt)
  }

  const methods = useForm<THabitForm>({
    defaultValues,
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    if (isOpen && !initData?.remindAt) {
      methods.setValue('remindAt', dayjs().format('HH:mm'))
    }
  }, [isOpen])

  useEffect(() => {
    if (initData) {
      methods.reset(defaultValues)
    }
  }, [initData])

  const onSubmit = methods.handleSubmit(async (data) => {
    let remindAt: string | null = null

    if (data.remindMe) {
      remindAt = dayjs(data.remindAt, 'HH:mm').utc().format('HH:mm')
    }

    try {
      if (initData) {
        const body: IEditHabitBody = {
          id: initData.id!,
          title: data.title,
          weekDays: data.weekDays.sort((a, b) => a - b),
          repeats: data.repeats,
          timeOfDay: data.timeOfDay,
          remindAt
        }
        await editMutate(body as IEditHabitBody)
      } else {
        const body: ICreateHabitBody = {
          title: data.title,
          weekDays: data.weekDays.sort((a, b) => a - b),
          repeats: data.repeats,
          timeOfDay: data.timeOfDay,
          remindAt
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
