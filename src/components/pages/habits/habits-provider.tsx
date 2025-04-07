import { createContext, useContext, useMemo, useState } from 'react'

interface IContext {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<IContext['selectedDate']>>
}

const HabitsContext = createContext<IContext | null>(null)

export const HabitsProvider = ({ children }: React.PropsWithChildren) => {
  const [selectedDate, setSelectedDate] = useState<IContext['selectedDate']>(new Date())

  const value = useMemo(() => ({ selectedDate, setSelectedDate }), [selectedDate])

  return <HabitsContext value={value}>{children}</HabitsContext>
}

export const useSelectedDate = () => {
  const context = useContext(HabitsContext)

  if (!context) {
    throw new Error('`useSelectedDate` must be used within a `HabitsProvider`')
  }

  return context
}
