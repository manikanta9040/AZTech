import { mockRegistrations } from '../data/registrations'
import type { PaymentStatus, Registration, RegistrationStatus } from '../types/registration'

const STORAGE_KEY = 'aztech.mock.admin.registrations'

function loadRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRegistrations))
      return mockRegistrations
    }
    return JSON.parse(raw) as Registration[]
  } catch {
    return mockRegistrations
  }
}

function saveRegistrations(items: Registration[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminRegistrationService = {
  getAll: async (): Promise<Registration[]> => {
    return loadRegistrations()
  },

  getById: async (id: string): Promise<Registration | undefined> => {
    const items = loadRegistrations()
    return items.find((r) => r.id === id)
  },

  updateStatus: async (
    id: string,
    status: RegistrationStatus,
    paymentStatus?: PaymentStatus
  ): Promise<Registration> => {
    const items = loadRegistrations()
    const index = items.findIndex((r) => r.id === id)
    if (index === -1) throw new Error(`Registration with id "${id}" not found.`)
    const current = items[index]
    const updated: Registration = {
      ...current,
      status,
      paymentStatus: paymentStatus ?? current.paymentStatus,
    }
    items[index] = updated
    saveRegistrations(items)
    return updated
  },

  create: async (data: Omit<Registration, 'id'> & { id?: string }): Promise<Registration> => {
    const items = loadRegistrations()
    const id = data.id || `AZ-REG-${Date.now().toString().slice(-5)}`
    const newReg: Registration = {
      ...data,
      id,
      registeredAt: data.registeredAt || new Date().toISOString().split('T')[0],
      status: data.status || 'PENDING',
      paymentStatus: data.paymentStatus || 'PENDING',
    }
    items.unshift(newReg)
    saveRegistrations(items)
    return newReg
  },
}
