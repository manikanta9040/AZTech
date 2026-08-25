import { mockPayments } from '../data/payments'
import type { AdminPaymentStatus, Payment } from '../types/payment'

const STORAGE_KEY = 'aztech.mock.admin.payments'

function loadPayments(): Payment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPayments))
      return mockPayments
    }
    return JSON.parse(raw) as Payment[]
  } catch {
    return mockPayments
  }
}

function savePayments(items: Payment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminPaymentService = {
  getAll: async (): Promise<Payment[]> => {
    return loadPayments()
  },

  getById: async (id: string): Promise<Payment | undefined> => {
    const items = loadPayments()
    return items.find((p) => p.id === id || p.transactionId === id)
  },

  updateStatus: async (id: string, status: AdminPaymentStatus): Promise<Payment> => {
    const items = loadPayments()
    const index = items.findIndex((p) => p.id === id || p.transactionId === id)
    if (index === -1) throw new Error(`Payment with id "${id}" not found.`)
    const updated: Payment = { ...items[index], status }
    items[index] = updated
    savePayments(items)
    return updated
  },
}
