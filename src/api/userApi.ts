import { apiClient } from './axios'
export const userApi = { current: () => apiClient.get('/users/me') }
