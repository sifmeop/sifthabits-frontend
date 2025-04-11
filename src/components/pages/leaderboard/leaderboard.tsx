'use client'

import { useGetGlobalStatisticsQuery } from '~/api/habits'
import { LeaderboardRow } from './leaderboard-row'

export const Leaderboard = () => {
  const { data } = useGetGlobalStatisticsQuery()

  return (
    <div>
      {data?.users.map((user) => (
        <LeaderboardRow key={user.id} {...user} />
      ))}
    </div>
  )
}
