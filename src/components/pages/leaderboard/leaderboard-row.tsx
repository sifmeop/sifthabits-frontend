import Image from 'next/image'
import { IGlobalUserStatistic } from '~/api/habits'
import { DAYS_OF_WEEKS } from '~/constants/habit'
import { CircleProgressBar } from '~/ui/circle-progress-bar'

type IProps = IGlobalUserStatistic

export const LeaderboardRow = ({ username, photoUrl, xp, xpToNextLevel, level, weeklySummary }: IProps) => {
  const xpPercent = (+xp / xpToNextLevel) * 100

  return (
    <div className='bg-white rounded-xl shadow-xl border border-black/10 p-3'>
      <div className='flex flex-col items-center gap-2'>
        <div className='p-[2px] rounded-full border-2 border-blue w-fit bg-white'>
          <Image
            width={48}
            height={48}
            src={photoUrl ?? '/image/default-user.webp'}
            alt={username}
            className='rounded-full'
          />
        </div>
        <h4 className='text-base font-medium'>{username}</h4>
      </div>
      <div className='w-full h-[2px] my-2 bg-gray-light rounded-full' />
      <div>
        <p className='text-center font-medium'>
          {xp}/{xpToNextLevel}
        </p>
        <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 font-medium'>
          <span>{level} LVL</span>
          <div className='w-full h-2 bg-gray-light rounded-full'>
            <div style={{ width: `${xpPercent}%` }} className='h-full bg-blue rounded-full' />
          </div>
          <span>{+level + 1} LVL</span>
        </div>
      </div>
      <div className='w-full h-[2px] my-2 bg-gray-light rounded-full' />
      <div className='grid grid-cols-7 gap-1 justify-items-center'>
        {DAYS_OF_WEEKS.map((day) => (
          <p key={day} className='font-medium'>
            {day}
          </p>
        ))}
        {Object.keys(weeklySummary).map((day) => (
          <CircleProgressBar
            key={day}
            onlyProgressBar
            showCompletionAnimation={false}
            size={20}
            strokeWidth={4}
            maxValue={100}
            currentValue={weeklySummary[day]}
          />
        ))}
      </div>
    </div>
  )
}
