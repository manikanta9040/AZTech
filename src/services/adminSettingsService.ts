import type { ConferenceSettings, NotificationSettings, SecuritySettings, SystemSettings, WebsiteSettings } from '../types/admin'

const STORAGE_KEY = 'aztech.mock.admin.settings'

const defaultSettings: SystemSettings = {
  website: {
    websiteName: 'AZTech Global Conference Platform',
    websiteEmail: 'contact@aztechconferences.org',
    phone: '+1 (555) 019-2834',
    address: 'AZTech World Headquarters, 500 Technology Square, Cambridge, MA 02139, USA',
    socialLinks: {
      twitter: 'https://twitter.com/aztechconf',
      linkedin: 'https://linkedin.com/company/aztech-conferences',
      facebook: 'https://facebook.com/aztechconferences',
      github: 'https://github.com/aztech-org',
    },
    footerText: '© 2027 AZTech Global Conferences. All rights reserved. Connecting global researchers and industry leaders.',
  },
  conference: {
    defaultCurrency: 'USD',
    defaultDeadlineDays: 14,
    enablePublicSubmissions: true,
    autoApproveFree: false,
    allowNetworking: true,
  },
  notifications: {
    newRegistration: true,
    newAbstract: true,
    paymentNotification: true,
    newUser: true,
    conferenceReminder: true,
    systemAlerts: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeoutMinutes: 60,
    requireStrongPasswords: true,
  },
}

function loadSettings(): SystemSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings))
      return defaultSettings
    }
    return JSON.parse(raw) as SystemSettings
  } catch {
    return defaultSettings
  }
}

function saveSettings(settings: SystemSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const adminSettingsService = {
  getSettings: async (): Promise<SystemSettings> => {
    return loadSettings()
  },

  updateWebsite: async (patch: Partial<WebsiteSettings>): Promise<WebsiteSettings> => {
    const current = loadSettings()
    const updated = { ...current.website, ...patch }
    saveSettings({ ...current, website: updated })
    return updated
  },

  updateConference: async (patch: Partial<ConferenceSettings>): Promise<ConferenceSettings> => {
    const current = loadSettings()
    const updated = { ...current.conference, ...patch }
    saveSettings({ ...current, conference: updated })
    return updated
  },

  updateNotifications: async (patch: Partial<NotificationSettings>): Promise<NotificationSettings> => {
    const current = loadSettings()
    const updated = { ...current.notifications, ...patch }
    saveSettings({ ...current, notifications: updated })
    return updated
  },

  updateSecurity: async (patch: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    const current = loadSettings()
    const updated = { ...current.security, ...patch }
    saveSettings({ ...current, security: updated })
    return updated
  },
}
