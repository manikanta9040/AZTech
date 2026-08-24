import type { Registration } from '../types/registration'
export const mockRegistrations: Registration[] = [
  { id: 'AZ-REG-00125', userId: 'dev-user-001', conferenceId: 'conf-001', registrationType: 'Delegate', amount: 499, paymentStatus: 'PAID', status: 'CONFIRMED', registeredAt: '2026-08-10' },
  { id: 'AZ-REG-00126', userId: 'dev-user-001', conferenceId: 'conf-003', registrationType: 'Presenter', amount: 450, paymentStatus: 'PAID', status: 'CONFIRMED', registeredAt: '2026-08-14' },
  { id: 'AZ-REG-00127', userId: 'dev-user-001', conferenceId: 'conf-009', registrationType: 'Delegate', amount: 299, paymentStatus: 'PENDING', status: 'PENDING', registeredAt: '2026-08-18' },
]
