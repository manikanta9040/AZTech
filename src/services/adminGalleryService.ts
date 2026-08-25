import { mockGalleryItems, type GalleryItem } from '../data/gallery'

const STORAGE_KEY = 'aztech.mock.admin.gallery'

function loadGallery(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const initialized = mockGalleryItems.map((item) => ({
        ...item,
        date: item.date || '2026-06-15',
        status: item.status || 'PUBLISHED',
        featured: item.featured ?? true,
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized))
      return initialized
    }
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    return mockGalleryItems
  }
}

function saveGallery(items: GalleryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminGalleryService = {
  getAll: async (): Promise<GalleryItem[]> => {
    return loadGallery()
  },

  getById: async (id: string): Promise<GalleryItem | undefined> => {
    const items = loadGallery()
    return items.find((g) => g.id === id)
  },

  create: async (data: Omit<GalleryItem, 'id'>): Promise<GalleryItem> => {
    const items = loadGallery()
    const newItem: GalleryItem = {
      ...data,
      id: `gal-${Date.now()}`,
      date: data.date || new Date().toISOString().split('T')[0],
      featured: Boolean(data.featured),
      status: data.status || 'PUBLISHED',
    }
    items.unshift(newItem)
    saveGallery(items)
    return newItem
  },

  update: async (id: string, patch: Partial<GalleryItem>): Promise<GalleryItem> => {
    const items = loadGallery()
    const index = items.findIndex((g) => g.id === id)
    if (index === -1) throw new Error(`Gallery item with id "${id}" not found.`)
    const updated: GalleryItem = { ...items[index], ...patch }
    items[index] = updated
    saveGallery(items)
    return updated
  },

  delete: async (id: string): Promise<void> => {
    const items = loadGallery()
    const filtered = items.filter((g) => g.id !== id)
    saveGallery(filtered)
  },

  toggleFeatured: async (id: string): Promise<GalleryItem> => {
    const items = loadGallery()
    const index = items.findIndex((g) => g.id === id)
    if (index === -1) throw new Error('Gallery item not found')
    items[index] = { ...items[index], featured: !items[index].featured }
    saveGallery(items)
    return items[index]
  },
}
