import type { Role } from '../constants/roles'
export interface User { id: string; name: string; email: string; roles: Role[] }
