import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { showPopup } from '@telegram-apps/sdk-react'
import { AxiosError } from 'axios'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: 1
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.debug('Error on query:', error)

      if (error instanceof AxiosError) {
        showPopup({
          title: 'Something went wrong',
          message: 'Please try again later',
          buttons: [{ id: 'close_mini_app', type: 'close' }]
        })
      }
    }
  })
})

export const TanstackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition='bottom-right' />
    </QueryClientProvider>
  )
}
