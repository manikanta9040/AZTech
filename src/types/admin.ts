import type { UserRole } from './auth'

export interface AdminStatItem {
  id: string
  title: string
  value: string | number
  rawNumber?: number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  subtitle?: string
  icon: string
}

export interface RegistrationGrowthPoint {
  month: string
  registrations: number
  abstracts: number
  revenue: number
}

export interface ConferenceCategoryStat {
  name: string
  count: number
  percentage: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  organization: string
  registrationCount: number
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  avatar?: string
}

export interface WebsiteSettings {
  websiteName: string
  websiteEmail: string
  phone: string
  address: string
  socialLinks: {
    twitter: string
    linkedin: string
    facebook: string
    github: string
  }
  footerText: string
}

export interface ConferenceSettings {
  defaultCurrency: string
  defaultDeadlineDays: number
  enablePublicSubmissions: boolean
  autoApproveFree: boolean
  allowNetworking: boolean
}

export interface NotificationSettings {
  newRegistration: boolean
  newAbstract: boolean
  paymentNotification: boolean
  newUser: boolean
  conferenceReminder: boolean
  systemAlerts: boolean
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeoutMinutes: number
  requireStrongPasswords: boolean
}

export interface SystemSettings {
  website: WebsiteSettings
  conference: ConferenceSettings
  notifications: NotificationSettings
  security: SecuritySettings
}

export interface ReportSummary {
  totalRevenue: number
  totalRegistrations: number
  totalConferences: number
  totalAbstracts: number
  growthRate: number
  countryDistribution: { country: string; count: number; percentage: number }[]
  conferenceDistribution: { title: string; count: number; revenue: number }[]
  registrationTypeDistribution: { type: string; count: number; revenue: number }[]
}
