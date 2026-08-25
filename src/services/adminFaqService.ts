import { mockFAQs, type FAQItem } from '../data/faqs'

const STORAGE_KEY = 'aztech.mock.admin.faqs'

function loadFaqs(): FAQItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const initialized = mockFAQs.map((item, index) => ({
        ...item,
        order: item.order ?? index + 1,
        status: item.status ?? 'PUBLISHED',
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized))
      return initialized
    }
    return JSON.parse(raw) as FAQItem[]
  } catch {
    return mockFAQs
  }
}

function saveFaqs(items: FAQItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminFaqService = {
  getAll: async (): Promise<FAQItem[]> => {
    return loadFaqs()
  },

  getById: async (id: string): Promise<FAQItem | undefined> => {
    const items = loadFaqs()
    return items.find((f) => f.id === id)
  },

  create: async (data: Omit<FAQItem, 'id'>): Promise<FAQItem> => {
    const items = loadFaqs()
    const newFaq: FAQItem = {
      ...data,
      id: `faq-${Date.now()}`,
      order: data.order ?? items.length + 1,
      status: data.status ?? 'PUBLISHED',
    }
    items.push(newFaq)
    saveFaqs(items)
    return newFaq
  },

  update: async (id: string, patch: Partial<FAQItem>): Promise<FAQItem> => {
    const items = loadFaqs()
    const index = items.findIndex((f) => f.id === id)
    if (index === -1) throw new Error(`FAQ with id "${id}" not found.`)
    const updated: FAQItem = { ...items[index], ...patch }
    items[index] = updated
    saveFaqs(items)
    return updated
  },

  delete: async (id: string): Promise<void> => {
    const items = loadFaqs()
    const filtered = items.filter((f) => f.id !== id)
    saveFaqs(filtered)
  },

  togglePublish: async (id: string): Promise<FAQItem> => {
    const items = loadFaqs()
    const index = items.findIndex((f) => f.id === id)
    if (index === -1) throw new Error('FAQ not found')
    const current = items[index]
    const nextStatus: 'PUBLISHED' | 'DRAFT' = current.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT'
    items[index] = { ...current, status: nextStatus }
    saveFaqs(items)
    return items[index]
  },
}
