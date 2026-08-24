import type { User } from './user'
export interface AuthState { user: User | null; accessToken: string | null; isAuthenticated: boolean }
export interface LoginCredentials { email: string; password: string }
