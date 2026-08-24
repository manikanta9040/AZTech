import { apiClient } from './axios'
export const paymentApi = { list: () => apiClient.get('/payments') }
