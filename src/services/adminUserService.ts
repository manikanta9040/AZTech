import { initialAdminUsers } from '../data/users'
import type { AdminUser } from '../types/admin'
import type { UserRole } from '../types/auth'

const STORAGE_KEY = 'aztech.mock.admin.users_list'

function loadUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAdminUsers))
      return initialAdminUsers
    }
    return JSON.parse(raw) as AdminUser[]
  } catch {
    return initialAdminUsers
  }
}

function saveUsers(users: AdminUser[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const adminUserService = {
  getAll: async (): Promise<AdminUser[]> => {
    return loadUsers()
  },

  getById: async (id: string): Promise<AdminUser | undefined> => {
    const users = loadUsers()
    return users.find((u) => u.id === id)
  },

  create: async (data: Omit<AdminUser, 'id'>): Promise<AdminUser> => {
    const users = loadUsers()
    const newUser: AdminUser = {
      ...data,
      id: `user-${Date.now()}`,
      createdAt: data.createdAt || new Date().toISOString().split('T')[0],
      status: data.status || 'ACTIVE',
      registrationCount: data.registrationCount ?? 0,
    }
    users.unshift(newUser)
    saveUsers(users)
    return newUser
  },

  update: async (id: string, patch: Partial<AdminUser>): Promise<AdminUser> => {
    const users = loadUsers()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) throw new Error(`User with id "${id}" not found.`)
    const updated = { ...users[index], ...patch }
    users[index] = updated
    saveUsers(users)
    return updated
  },

  toggleStatus: async (id: string): Promise<AdminUser> => {
    const users = loadUsers()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('User not found')
    const nextStatus: 'ACTIVE' | 'INACTIVE' = users[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    users[index] = { ...users[index], status: nextStatus }
    saveUsers(users)
    return users[index]
  },

  changeRole: async (id: string, role: UserRole): Promise<AdminUser> => {
    const users = loadUsers()
    const index = users.findIndex((u) => u.id === id)
    if (index === -1) throw new Error('User not found')
    users[index] = { ...users[index], role }
    saveUsers(users)
    return users[index]
  },
}
