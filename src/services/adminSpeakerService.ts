import { mockSpeakers } from '../data/speakers'
import type { Speaker } from '../types/speaker'

const STORAGE_KEY = 'aztech.mock.admin.speakers'

function loadSpeakers(): Speaker[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockSpeakers))
      return mockSpeakers
    }
    return JSON.parse(raw) as Speaker[]
  } catch {
    return mockSpeakers
  }
}

function saveSpeakers(speakers: Speaker[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(speakers))
}

export const adminSpeakerService = {
  getAll: async (): Promise<Speaker[]> => {
    return loadSpeakers()
  },

  getById: async (id: string): Promise<Speaker | undefined> => {
    const items = loadSpeakers()
    return items.find((s) => s.id === id || s.slug === id)
  },

  create: async (data: Omit<Speaker, 'id'> & { id?: string }): Promise<Speaker> => {
    const items = loadSpeakers()
    const id = data.id || `spk-${Date.now()}`
    const newSpeaker: Speaker = {
      ...data,
      id,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      image: data.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      shortBio: data.shortBio || data.biography?.slice(0, 120) || '',
      biography: data.biography || '',
      designation: data.designation || 'Speaker',
      organization: data.organization || '',
      country: data.country || 'Global',
      expertise: data.expertise || [],
      featured: Boolean(data.featured),
    }
    items.unshift(newSpeaker)
    saveSpeakers(items)
    return newSpeaker
  },

  update: async (id: string, patch: Partial<Speaker>): Promise<Speaker> => {
    const items = loadSpeakers()
    const index = items.findIndex((s) => s.id === id)
    if (index === -1) throw new Error(`Speaker with id "${id}" not found.`)
    const updated: Speaker = { ...items[index], ...patch }
    items[index] = updated
    saveSpeakers(items)
    return updated
  },

  delete: async (id: string): Promise<void> => {
    const items = loadSpeakers()
    const filtered = items.filter((s) => s.id !== id)
    saveSpeakers(filtered)
  },

  toggleFeatured: async (id: string): Promise<Speaker> => {
    const items = loadSpeakers()
    const index = items.findIndex((s) => s.id === id)
    if (index === -1) throw new Error('Speaker not found')
    items[index] = { ...items[index], featured: !items[index].featured }
    saveSpeakers(items)
    return items[index]
  },
}
