'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren, useState } from 'react'
{/*import { ReactQueryDevtools } from '@tanstack/react-query-devtools'{/*  */}
export const ProviderQueryClient: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*  <ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  )
}
