import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

type Props = {
  children:React.ReactNode
}

const query_client = new QueryClient()

export function ReactQueryProvider({children}:Props){
  return (
    <QueryClientProvider client={query_client}>
      {children}
    </QueryClientProvider>
  )
}
