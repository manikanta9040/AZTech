export const ROLES = { user: 'USER', admin: 'ADMIN' } as const
export type Role = (typeof ROLES)[keyof typeof ROLES]
