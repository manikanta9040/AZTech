import { mockAbstracts } from '../data/abstracts'
import type { AbstractStatus, AbstractSubmission } from '../types/abstract'

const STORAGE_KEY = 'aztech.mock.admin.abstracts'

function loadAbstracts(): AbstractSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAbstracts))
      return mockAbstracts
    }
    return JSON.parse(raw) as AbstractSubmission[]
  } catch {
    return mockAbstracts
  }
}

function saveAbstracts(items: AbstractSubmission[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminAbstractService = {
  getAll: async (): Promise<AbstractSubmission[]> => {
    return loadAbstracts()
  },

  getById: async (id: string): Promise<AbstractSubmission | undefined> => {
    const items = loadAbstracts()
    return items.find((a) => a.id === id)
  },

  review: async (
    id: string,
    status: AbstractStatus,
    comments?: string,
    reviewer?: string
  ): Promise<AbstractSubmission> => {
    const items = loadAbstracts()
    const index = items.findIndex((a) => a.id === id)
    if (index === -1) throw new Error(`Abstract with id "${id}" not found.`)
    const current = items[index]
    const updated: AbstractSubmission = {
      ...current,
      status,
      reviewerComments: comments ?? current.reviewerComments,
      reviewer: reviewer ?? current.reviewer ?? 'Administrator',
      reviewedAt: new Date().toISOString().split('T')[0],
    }
    items[index] = updated
    saveAbstracts(items)
    return updated
  },

  assignReviewer: async (id: string, reviewer: string): Promise<AbstractSubmission> => {
    const items = loadAbstracts()
    const index = items.findIndex((a) => a.id === id)
    if (index === -1) throw new Error(`Abstract with id "${id}" not found.`)
    const current = items[index]
    const updated: AbstractSubmission = {
      ...current,
      reviewer,
      status: current.status === 'SUBMITTED' ? 'UNDER_REVIEW' : current.status,
    }
    items[index] = updated
    saveAbstracts(items)
    return updated
  },
}
