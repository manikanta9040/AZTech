import { apiClient } from './axios'
import type { LoginCredentials } from '../types/auth'
export const authApi = { login: (credentials: LoginCredentials) => apiClient.post('/auth/login', credentials) }
