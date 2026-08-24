import type { MockUser } from '../types/auth'

/** DEVELOPMENT ONLY: replace this mock data with a secured API in a future backend step. */
export const developmentUsers: MockUser[] = [
  { id: 'dev-user-001', name: 'AZTech Attendee', email: 'user@aztech.test', password: 'aztech123', role: 'USER' },
  { id: 'dev-admin-001', name: 'AZTech Administrator', email: 'admin@aztech.test', password: 'admin123', role: 'ADMIN' },
]
