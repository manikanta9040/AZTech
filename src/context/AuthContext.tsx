import { useState, type PropsWithChildren } from 'react'
import type { AuthState } from '../types/auth'
import { authContextValue } from './authContextValue'
export function AuthProvider({ children }: PropsWithChildren) { const [auth] = useState<AuthState>({ user: null, accessToken: null, isAuthenticated: false }); return <authContextValue.Provider value={auth}>{children}</authContextValue.Provider> }
