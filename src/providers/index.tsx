'use client'
import { ReactQueryProvider } from "./react-query"
import { ThemeProvider } from "./theme-provider"

type Props = {
  children:React.ReactNode
}
export default function Providers({children}:Props){
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </ThemeProvider>

  )
}
