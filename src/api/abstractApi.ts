import { apiClient } from './axios'
export const abstractApi = { list: () => apiClient.get('/abstracts') }
