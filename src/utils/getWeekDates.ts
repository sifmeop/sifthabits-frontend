import dayjs from 'dayjs'

export const getWeekDates = () => {
  const today = dayjs()
  const startOfWeek = dayjs(today).startOf('isoWeek')
  const weekDates = []

  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.add(i, 'day').toDate())
  }

  return weekDates
}
