import { baseConferences } from '../data/conferences'
import type { Conference } from '../types/conference'

const STORAGE_KEY = 'aztech.mock.admin.conferences'

function loadConferences(): Conference[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(baseConferences))
      return baseConferences
    }
    return JSON.parse(raw) as Conference[]
  } catch {
    return baseConferences
  }
}

function saveConferences(conferences: Conference[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conferences))
}

export const adminConferenceService = {
  getAll: async (): Promise<Conference[]> => {
    return loadConferences()
  },

  getById: async (id: string): Promise<Conference | undefined> => {
    const items = loadConferences()
    return items.find((c) => c.id === id || c.slug === id)
  },

  create: async (data: Omit<Conference, 'id'> & { id?: string }): Promise<Conference> => {
    const items = loadConferences()
    const id = data.id || `conf-${Date.now()}`
    const newConf: Conference = {
      ...data,
      id,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      status: data.status || 'registration_open',
      attendeesCount: data.attendeesCount ?? 0,
      speakersCount: data.speakersCount ?? 0,
      featured: Boolean(data.featured),
    }
    items.unshift(newConf)
    saveConferences(items)
    return newConf
  },

  update: async (id: string, patch: Partial<Conference>): Promise<Conference> => {
    const items = loadConferences()
    const index = items.findIndex((c) => c.id === id)
    if (index === -1) throw new Error(`Conference with id "${id}" not found.`)
    const updated: Conference = { ...items[index], ...patch }
    items[index] = updated
    saveConferences(items)
    return updated
  },

  delete: async (id: string): Promise<void> => {
    const items = loadConferences()
    const filtered = items.filter((c) => c.id !== id)
    saveConferences(filtered)
  },

  togglePublish: async (id: string): Promise<Conference> => {
    const items = loadConferences()
    const index = items.findIndex((c) => c.id === id)
    if (index === -1) throw new Error('Conference not found')
    const current = items[index]
    const nextStatus = current.status === 'closed' || current.status === 'completed' ? 'registration_open' : 'closed'
    items[index] = { ...current, status: nextStatus }
    saveConferences(items)
    return items[index]
  },

  toggleFeatured: async (id: string): Promise<Conference> => {
    const items = loadConferences()
    const index = items.findIndex((c) => c.id === id)
    if (index === -1) throw new Error('Conference not found')
    items[index] = { ...items[index], featured: !items[index].featured }
    saveConferences(items)
    return items[index]
  },
}
