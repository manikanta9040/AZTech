import type { Role } from '../constants/roles'
export interface User { id: string; name: string; email: string; roles: Role[] }
export interface UserProfile { id: string; name: string; email: string; phone?: string; organization?: string; jobTitle?: string; country?: string; city?: string; biography?: string; interests?: string[]; linkedin?: string; website?: string }
