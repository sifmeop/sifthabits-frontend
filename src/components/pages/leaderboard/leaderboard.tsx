'use client'

import { useGetGlobalStatisticsQuery } from '~/api/habits'
import { Spinner } from '~/ui/spinner'
import { LeaderboardRow } from './leaderboard-row'

export const Leaderboard = () => {
  const { data, isLoading } = useGetGlobalStatisticsQuery()

  return (
    <div className='p-3 overflow-y-auto'>
      <h1 className='text-xl font-bold text-center pb-2'>Leaderboard</h1>
      <Spinner centerX isLoading={isLoading} />
      <div className='flex flex-col gap-2'>
        {data?.users.map((user) => (
          <LeaderboardRow key={user.id} {...user} />
        ))}
      </div>
    </div>
  )
}
