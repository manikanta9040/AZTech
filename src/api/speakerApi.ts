import { apiClient } from './axios'
export const speakerApi = { list: () => apiClient.get('/speakers') }
