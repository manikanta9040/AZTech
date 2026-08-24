import { apiClient } from './axios'
export const conferenceApi = { list: () => apiClient.get('/conferences') }
