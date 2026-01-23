"use client"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

export default function Providers({ children,}: { children: React.ReactNode}) {
    
  return (
     <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
         <QueryClientProvider client={queryClient}>
        {children}
         <Toaster richColors position='bottom-center' />
        </QueryClientProvider>
        </ThemeProvider>
  );
}
