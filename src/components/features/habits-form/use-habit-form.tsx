import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { ICreateHabitBody, IEditHabitBody, useCreateHabitMutation, useEditHabitMutation } from '~/api/habits'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { HabitTimeOfDay } from '~/interfaces/habits'

const schema = z.object({
  id: z.string().optional(),
  title: z.string(),
  weekDays: z.array(z.number()),
  repeats: z.number(),
  timeOfDay: z.nativeEnum(HabitTimeOfDay)
  // color: z.string()
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
    timeOfDay: initData?.timeOfDay ?? HabitTimeOfDay.ANYTIME
    // color: ''
  }

  const methods = useForm<THabitForm>({
    defaultValues,
    resolver: zodResolver(schema)
  })

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
          timeOfDay: data.timeOfDay,
          createdAt: new Date().toISOString()
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
