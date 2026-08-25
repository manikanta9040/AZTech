export const ROLES = { user: 'USER', admin: 'ADMIN', superAdmin: 'SUPER_ADMIN' } as const
export type Role = (typeof ROLES)[keyof typeof ROLES]
