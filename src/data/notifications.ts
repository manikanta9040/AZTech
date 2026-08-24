import type { Notification } from '../types/notification'
export const mockNotifications: Notification[] = [
  { id: 'note-001', userId: 'dev-user-001', title: 'Revision requested', message: 'Feedback is available for your circular design abstract.', createdAt: '2026-08-20', read: false },
  { id: 'note-002', userId: 'dev-user-001', title: 'Registration confirmed', message: 'Your Global AI Summit registration is confirmed.', createdAt: '2026-08-15', read: true },
]
