import Image from 'next/image'
import { IGlobalUserStatistic } from '~/api/habits'

type IProps = IGlobalUserStatistic

export const LeaderboardRow = ({ username, photoUrl }: IProps) => {
  return (
    <div>
      <div className='p-[2px] rounded-full border-2 border-blue w-fit bg-white'>
        <Image
          width={48}
          height={48}
          src={photoUrl ?? '/image/default-user.webp'}
          alt={username}
          className='rounded-full'
        />
      </div>
    </div>
  )
}
