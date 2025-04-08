import { Navigation } from './navigation'

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div id='layout' className='grid bg-white transition-all duration-300 grid-rows-[1fr_auto] h-dvh'>
      {children}
      <Navigation />
    </div>
  )
}
