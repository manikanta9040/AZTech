import { createContext } from 'react'
import type { AuthState } from '../types/auth'
export const authContextValue = createContext<AuthState>({ user: null, accessToken: null, isAuthenticated: false })
