export interface IHabit {
  id: string
  title: string
  status: HabitStatus
  weekDays: number[]
  repeats: number
  timeOfDay: TimeOfDay
  userId: string
  createdAt: string
}

export interface IUserHabit {
  id: string
  status: HabitStatus
  repeats: number
  habitId: string
  createdAt: string
  streak?: number
}

export type PopulatedUserHabit = IUserHabit & { habit: IHabit }

export enum HabitStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  MISSED = 'MISSED',
  SKIPPED = 'SKIPPED'
}

export enum TimeOfDay {
  ANYTIME = 'ANYTIME',
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING'
}
