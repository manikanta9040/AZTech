import { apiClient } from './axios'
export const adminApi = { overview: () => apiClient.get('/admin/overview') }
