import { mockAbstractReviewDistribution, mockMonthlyRevenueData, mockReportSummary } from '../data/reports'
import type { ReportSummary } from '../types/admin'

export const adminReportService = {
  getSummary: async (filters?: {
    dateRange?: string
    conferenceId?: string
    country?: string
  }): Promise<ReportSummary> => {
    // Return filtered or base summary
    if (!filters || (!filters.conferenceId && !filters.country && (!filters.dateRange || filters.dateRange === 'all'))) {
      return mockReportSummary
    }

    let countryDist = [...mockReportSummary.countryDistribution]
    if (filters.country && filters.country !== 'all') {
      countryDist = countryDist.filter((c) => c.country.toLowerCase() === filters.country?.toLowerCase())
    }

    let confDist = [...mockReportSummary.conferenceDistribution]
    if (filters.conferenceId && filters.conferenceId !== 'all') {
      confDist = confDist.filter((c) => c.title.toLowerCase().includes(filters.conferenceId?.toLowerCase() || ''))
    }

    return {
      ...mockReportSummary,
      countryDistribution: countryDist.length > 0 ? countryDist : mockReportSummary.countryDistribution,
      conferenceDistribution: confDist.length > 0 ? confDist : mockReportSummary.conferenceDistribution,
    }
  },

  getMonthlyRevenue: async () => {
    return mockMonthlyRevenueData
  },

  getAbstractDistribution: async () => {
    return mockAbstractReviewDistribution
  },
}
