import { useId } from 'react'
import { IStatistic, ITimeRange } from '~/api/habits'
import { StatisticsRow } from './statistics-row'

interface IProps {
  data: IStatistic[]
  timeRange: ITimeRange
}

export const StatisticsTotal = ({ data, timeRange }: IProps) => {
  const id = useId()

  const { streak, longest, completed, summary } = data.flat().reduce(
    (acc, habit) => {
      acc.streak = Math.max(acc.streak, habit.streak)
      acc.longest = Math.max(acc.longest, habit.longest)
      acc.completed = Math.max(acc.completed, habit.completed)

      for (const date of Object.keys(habit.summary)) {
        if (!acc.summary[date]) {
          acc.summary[date] = {
            total: 0,
            count: 0,
            sum: 0
          }
        }
      }

      for (const [date, value] of Object.entries(habit.summary)) {
        if (value !== null) {
          acc.summary[date].total++
          acc.summary[date].count++
          acc.summary[date].sum += value
        }
      }

      return acc
    },
    {
      streak: 0,
      longest: 0,
      completed: 0,
      summary: {} as Record<string, { total: number; count: number; sum: number }>
    }
  )

  const finalSummary = Object.entries(summary).reduce<Record<string, number>>((result, [date, stats]) => {
    result[date] = stats.count > 0 ? Math.round(stats.sum / stats.count) : 0
    return result
  }, {})

  const totalData: IStatistic = {
    id,
    title: 'Total',
    streak,
    longest,
    completed,
    summary: finalSummary
  }

  return (
    <>
      <StatisticsRow isTotal {...totalData} index={0} timeRange={timeRange} />
      <div className='w-full h-[2px] bg-black/10' />
    </>
  )
}
