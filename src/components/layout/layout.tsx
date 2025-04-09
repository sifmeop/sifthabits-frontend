import { Navigation } from './navigation'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div id='layout' className='grid bg-white overflow-hidden transition-all duration-300 grid-rows-[1fr_71px] h-dvh'>
      {children}
      <Navigation />
    </div>
  )
}
