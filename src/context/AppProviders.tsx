import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import type { PropsWithChildren } from 'react'
import { store } from '../store'
import { AuthProvider } from './AuthContext'
import { ThemeProvider } from './ThemeContext'
const queryClient = new QueryClient()
export function AppProviders({ children }: PropsWithChildren) { return <Provider store={store}><QueryClientProvider client={queryClient}><ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider></QueryClientProvider></Provider> }
