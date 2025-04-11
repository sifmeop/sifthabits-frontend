import dayjs from 'dayjs'

export const getMonthlyDates = () => {
  const startOfMonth = dayjs().startOf('month')
  const endOfMonth = dayjs().endOf('month')

  const dates: (string | null)[] = []

  const startDay = startOfMonth.isoWeekday()

  if (startDay !== 1) {
    for (let i = 1; i < startDay; i++) {
      // dates.push(dayjs(startOfMonth).subtract(i, 'day').format('YYYY-MM-DD'))
      dates.push(null)
    }
  }

  for (let i = 0; i <= endOfMonth.diff(startOfMonth, 'day'); i++) {
    dates.push(startOfMonth.add(i, 'day').format('YYYY-MM-DD'))
  }

  const endDay = dayjs(dates[dates.length - 1]).isoWeekday()

  if (endDay !== 7) {
    for (let i = 1; i <= 7 - endDay; i++) {
      // dates.push(endOfMonth.add(i, 'day').format('YYYY-MM-DD'))
      dates.push(null)
    }
  }

  return dates
}
