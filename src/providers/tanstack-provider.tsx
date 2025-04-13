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
      if (error instanceof AxiosError) {
        const isForbiddenError = error.response && error.response.status === 403

        if (isForbiddenError) {
          console.debug('Forbidden error', error)
          showPopup({
            title: 'Forbidden',
            message: 'You are not logged in. Please press "/start" in the bot to login.',
            buttons: [{ type: 'close' }]
          })
          // closeMiniApp()
        }
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
