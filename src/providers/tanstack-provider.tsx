import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { retrieveRawInitData, retrieveRawLaunchParams, showPopup } from '@telegram-apps/sdk-react'
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
        const isErrorNetwork = error.code === 'ERR_NETWORK'

        if (isErrorNetwork) {
          showPopup({
            title: 'Network error',
            message: 'Please try again later.',
            buttons: [{ type: 'close' }]
          })
          return
        }

        const isForbiddenError = error.response && error.response.status === 403

        if (isForbiddenError) {
          showPopup({
            title: 'ERROR',
            message:
              `retrieveRawInitData: ${retrieveRawInitData()}` ||
              `retrieveRawLaunchParams: ${retrieveRawLaunchParams()}`,
            buttons: [{ type: 'close' }]
          })
          // showPopup({
          //   title: 'Forbidden',
          //   message: 'You are not logged in. Please press "/start" in the bot to login.',
          //   buttons: [{ type: 'close' }]
          // })
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
