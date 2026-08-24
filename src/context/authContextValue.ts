import { createContext } from 'react'
import type { AuthContextValue } from '../types/auth'
export const authContextValue = createContext<AuthContextValue | undefined>(undefined)
