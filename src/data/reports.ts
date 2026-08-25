import type { ReportSummary } from '../types/admin'

export const mockReportSummary: ReportSummary = {
  totalRevenue: 2450000,
  totalRegistrations: 8920,
  totalConferences: 248,
  totalAbstracts: 1420,
  growthRate: 18.5,
  countryDistribution: [
    { country: 'India', count: 2840, percentage: 31.8 },
    { country: 'United States', count: 2150, percentage: 24.1 },
    { country: 'Germany', count: 1120, percentage: 12.5 },
    { country: 'United Kingdom', count: 890, percentage: 10.0 },
    { country: 'United Arab Emirates', count: 680, percentage: 7.6 },
    { country: 'Japan', count: 540, percentage: 6.1 },
    { country: 'Singapore', count: 410, percentage: 4.6 },
    { country: 'Others', count: 290, percentage: 3.3 },
  ],
  conferenceDistribution: [
    { title: 'Global AI Summit 2027', count: 1200, revenue: 598800 },
    { title: 'Global Healthcare & Biotech 2027', count: 950, revenue: 521550 },
    { title: 'Sustainable Engineering & Green Tech', count: 820, revenue: 369000 },
    { title: 'International Cybersecurity Symposium', count: 760, revenue: 342000 },
    { title: 'Quantum Computing & Nanotech Forum', count: 610, revenue: 305000 },
    { title: 'Future of Education & EdTech Summit', count: 480, revenue: 192000 },
  ],
  registrationTypeDistribution: [
    { type: 'Regular Delegate', count: 4850, revenue: 1455000 },
    { type: 'Student / Scholar', count: 2120, revenue: 424000 },
    { type: 'Paper Presenter', count: 1420, revenue: 426000 },
    { type: 'Corporate VIP', count: 530, revenue: 145000 },
  ],
}

export const mockMonthlyRevenueData = [
  { month: 'Jan', revenue: 145000, target: 120000 },
  { month: 'Feb', revenue: 182000, target: 150000 },
  { month: 'Mar', revenue: 235000, target: 200000 },
  { month: 'Apr', revenue: 275000, target: 240000 },
  { month: 'May', revenue: 310000, target: 280000 },
  { month: 'Jun', revenue: 290000, target: 280000 },
  { month: 'Jul', revenue: 365000, target: 320000 },
  { month: 'Aug', revenue: 420000, target: 380000 },
  { month: 'Sep', revenue: 395000, target: 380000 },
  { month: 'Oct', revenue: 480000, target: 440000 },
  { month: 'Nov', revenue: 520000, target: 480000 },
  { month: 'Dec', revenue: 565000, target: 500000 },
]

export const mockAbstractReviewDistribution = [
  { status: 'Approved', count: 850, color: '#16805d' },
  { status: 'Under Review', count: 320, color: '#1769aa' },
  { status: 'Revision Required', count: 180, color: '#b86b00' },
  { status: 'Rejected', count: 70, color: '#be2e3b' },
]
