import { useMemo, useState, type PropsWithChildren } from 'react'
import { developmentUsers } from '../data/users'
import type { AuthContextValue, AuthState, LoginCredentials, MockUser, RegisterData, ResetPasswordData, User } from '../types/auth'
import { authContextValue } from './authContextValue'

const SESSION_KEY = 'aztech.mock.auth.session'
const USERS_KEY = 'aztech.mock.auth.users'
const RESET_EMAIL_KEY = 'aztech.mock.auth.reset-email'
const emptyState: AuthState = { user: null, isAuthenticated: false, isLoading: false }
const normalizeEmail = (email: string) => email.trim().toLowerCase()
const toPublicUser = (account: MockUser): User => ({ id: account.id, name: account.name, email: account.email, role: account.role })

function readStoredUsers(): MockUser[] {
  try {
    const value = localStorage.getItem(USERS_KEY)
    if (!value) return developmentUsers
    const users: unknown = JSON.parse(value)
    return Array.isArray(users) ? users.filter((user): user is MockUser => Boolean(user && typeof user === 'object' && 'email' in user && 'password' in user && 'role' in user)) : developmentUsers
  } catch { return developmentUsers }
}

function readSession(): AuthState {
  try {
    const value = localStorage.getItem(SESSION_KEY)
    const user: unknown = value ? JSON.parse(value) : null
    return user && typeof user === 'object' && 'id' in user && 'role' in user ? { user: user as User, isAuthenticated: true, isLoading: false } : emptyState
  } catch { localStorage.removeItem(SESSION_KEY); return emptyState }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<AuthState>(readSession)
  const value = useMemo<AuthContextValue>(() => ({
    ...auth,
    login: async ({ email, password }: LoginCredentials) => {
      const account = readStoredUsers().find((user) => user.email === normalizeEmail(email) && user.password === password)
      if (!account) throw new Error('Invalid email or password.')
      const user = toPublicUser(account)
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      setAuth({ user, isAuthenticated: true, isLoading: false })
      return user
    },
    register: async ({ name, email, password }: RegisterData) => {
      const users = readStoredUsers(); const normalizedEmail = normalizeEmail(email)
      if (users.some((user) => user.email === normalizedEmail)) throw new Error('An account with this email already exists.')
      const account: MockUser = { id: `dev-user-${Date.now()}`, name: name.trim(), email: normalizedEmail, password, role: 'USER' }
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]))
      const user = toPublicUser(account)
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      setAuth({ user, isAuthenticated: true, isLoading: false })
      return user
    },
    logout: () => { localStorage.removeItem(SESSION_KEY); setAuth({ user: null, isAuthenticated: false, isLoading: false }) },
    forgotPassword: async (email) => { localStorage.setItem(RESET_EMAIL_KEY, normalizeEmail(email)) },
    resetPassword: async ({ password }: ResetPasswordData) => {
      const email = localStorage.getItem(RESET_EMAIL_KEY)
      if (!email) throw new Error('This password reset link is invalid or has expired.')
      const users = readStoredUsers(); const index = users.findIndex((user) => user.email === email)
      if (index === -1) throw new Error('This password reset link is invalid or has expired.')
      users[index] = { ...users[index], password }
      localStorage.setItem(USERS_KEY, JSON.stringify(users)); localStorage.removeItem(RESET_EMAIL_KEY)
    },
  }), [auth])
  return <authContextValue.Provider value={value}>{children}</authContextValue.Provider>
}
