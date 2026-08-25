import { mockBlogs, type BlogPost } from '../data/blogs'

const STORAGE_KEY = 'aztech.mock.admin.blogs'

function loadBlogs(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBlogs))
      return mockBlogs
    }
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return mockBlogs
  }
}

function saveBlogs(items: BlogPost[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const adminBlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    return loadBlogs()
  },

  getById: async (id: string): Promise<BlogPost | undefined> => {
    const items = loadBlogs()
    return items.find((b) => b.id === id || b.slug === id)
  },

  create: async (data: Omit<BlogPost, 'id'> & { id?: string }): Promise<BlogPost> => {
    const items = loadBlogs()
    const id = data.id || `blog-${Date.now()}`
    const newBlog: BlogPost = {
      ...data,
      id,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      image: data.image || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
      author: data.author || 'AZTech Editorial',
      authorRole: data.authorRole || 'Contributing Editor',
      authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      publishedAt: data.publishedAt || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readingTime: data.readingTime || Math.max(1, Math.ceil((data.content?.split(/\s+/).length || 100) / 200)),
      tags: data.tags || ['Technology', 'Research'],
      category: data.category || 'Technology',
      status: data.status || 'PUBLISHED',
      views: data.views ?? 120,
      featured: Boolean(data.featured),
    }
    items.unshift(newBlog)
    saveBlogs(items)
    return newBlog
  },

  update: async (id: string, patch: Partial<BlogPost>): Promise<BlogPost> => {
    const items = loadBlogs()
    const index = items.findIndex((b) => b.id === id)
    if (index === -1) throw new Error(`Blog with id "${id}" not found.`)
    const updated: BlogPost = { ...items[index], ...patch }
    items[index] = updated
    saveBlogs(items)
    return updated
  },

  delete: async (id: string): Promise<void> => {
    const items = loadBlogs()
    const filtered = items.filter((b) => b.id !== id)
    saveBlogs(filtered)
  },

  togglePublish: async (id: string): Promise<BlogPost> => {
    const items = loadBlogs()
    const index = items.findIndex((b) => b.id === id)
    if (index === -1) throw new Error('Blog post not found')
    const current = items[index]
    const nextStatus: 'PUBLISHED' | 'DRAFT' = current.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT'
    items[index] = { ...current, status: nextStatus }
    saveBlogs(items)
    return items[index]
  },
}
