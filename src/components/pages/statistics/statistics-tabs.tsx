import { ITimeRange } from '~/api/habits'
import { Tabs } from '~/ui/tab'

interface IProps {
  timeRange: ITimeRange
  setTimeRange: (value: ITimeRange) => void
}

export const StatisticsTabs = ({ timeRange, setTimeRange }: IProps) => {
  return (
    <div className='flex items-center justify-between border-b border-b-black/10 py-2 px-3'>
      <h1 className='text-xl font-bold'>Statistics</h1>
      <div>
        <Tabs
          value={timeRange}
          onChange={(val: ITimeRange) => {
            document.getElementById('statistics-list')?.scrollTo(0, 0)
            setTimeRange(val)
          }}
          className='w-fit'
          options={[
            { label: '7D', value: 'week' },
            { label: '30D', value: 'month' }
          ]}
        />
      </div>
    </div>
  )
}
