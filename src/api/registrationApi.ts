import { apiClient } from './axios'
export const registrationApi = { list: () => apiClient.get('/registrations') }
