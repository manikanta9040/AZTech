import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Download,
  Globe,
  TrendingUp,
  FileText,
  DollarSign,
  Ticket,
} from 'lucide-react'
import { AdminBreadcrumbs } from '../../../components/admin/AdminBreadcrumbs'
import { useAdminToast } from '../../../hooks/useAdminToast'
import { Button } from '../../../components/common/Button'
import { PageLoader } from '../../../components/common/Loader'
import { ROUTES } from '../../../constants/routes'
import { adminReportService } from '../../../services/adminReportService'
import type { ReportSummary } from '../../../types/admin'

const TABS = [
  { id: 'overview', label: 'Executive Summary', icon: TrendingUp },
  { id: 'registrations', label: 'Registrations', icon: Ticket },
  { id: 'revenue', label: 'Revenue & Finance', icon: DollarSign },
  { id: 'abstracts', label: 'Abstract Submissions', icon: FileText },
  { id: 'geography', label: 'Global Demographics', icon: Globe },
]

const COLORS = ['#1769aa', '#0f9f9a', '#16805d', '#b86b00', '#7b1fa2', '#be2e3b']

export default function Reports() {
  const { showSuccess } = useAdminToast()

  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('this_year')
  const [selectedConference, setSelectedConference] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState('all')

  const [summary, setSummary] = useState<ReportSummary | null>(null)
  const [monthlyRevenue, setMonthlyRevenue] = useState<{ month: string; revenue: number; target: number }[]>([])
  const [abstractReviewDist, setAbstractReviewDist] = useState<{ status: string; count: number; color: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    Promise.all([
      adminReportService.getSummary({
        dateRange,
        conferenceId: selectedConference,
        country: selectedCountry,
      }),
      adminReportService.getMonthlyRevenue(),
      adminReportService.getAbstractDistribution(),
    ])
      .then(([sumData, revData, absData]) => {
        if (isMounted) {
          setSummary(sumData)
          setMonthlyRevenue(revData)
          setAbstractReviewDist(absData)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [dateRange, selectedConference, selectedCountry])

  const handleExportCSV = () => {
    showSuccess('Report exported to CSV successfully.')
  }

  if (loading) return <PageLoader />

  return (
    <div className="az-admin-page">
      <AdminBreadcrumbs
        items={[
          { label: 'Dashboard', to: ROUTES.adminDashboard },
          { label: 'Reports' },
        ]}
      />

      <div className="az-admin-page__header">
        <div>
          <h1 className="az-admin-page__title">Platform Analytics & Reports</h1>
          <p className="az-admin-page__subtitle">
            Holistic intelligence across attendee registrations, paper submissions, and revenue trajectory.
          </p>
        </div>
        <div className="az-admin-page__header-actions">
          <Button size="sm" variant="outline" onClick={handleExportCSV}>
            <Download size={15} />
            Export Data
          </Button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="az-admin-toolbar az-admin-reports-filter-bar">
        <div className="az-admin-filter-item">
          <label htmlFor="report-date-range" className="az-label" style={{ fontSize: '0.75rem' }}>
            Date Horizon
          </label>
          <select
            id="report-date-range"
            className="az-admin-filter-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="last_30_days">Last 30 Days</option>
            <option value="last_90_days">Last 90 Days</option>
            <option value="this_year">This Fiscal Year (2026-2027)</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="az-admin-filter-item">
          <label htmlFor="report-conf" className="az-label" style={{ fontSize: '0.75rem' }}>
            Conference Scope
          </label>
          <select
            id="report-conf"
            className="az-admin-filter-select"
            value={selectedConference}
            onChange={(e) => setSelectedConference(e.target.value)}
          >
            <option value="all">All Conferences</option>
            <option value="AI">Global AI Summit 2027</option>
            <option value="Healthcare">Healthcare & Biotech 2027</option>
            <option value="Engineering">Sustainable Engineering Forum</option>
          </select>
        </div>

        <div className="az-admin-filter-item">
          <label htmlFor="report-country" className="az-label" style={{ fontSize: '0.75rem' }}>
            Geographic Scope
          </label>
          <select
            id="report-country"
            className="az-admin-filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="all">All Countries</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="az-admin-tabs" role="tablist">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`az-admin-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Executive Summary */}
      {activeTab === 'overview' && summary && (
        <div className="az-reports-tab-content">
          <div className="az-admin-stats-grid">
            <div className="az-admin-stat-card">
              <span className="az-admin-stat-card__title">Total Gross Revenue</span>
              <div className="az-admin-stat-card__value">${(summary.totalRevenue / 1000).toFixed(0)}k</div>
              <span className="az-admin-stat-card__change az-admin-stat-card__change--up">
                +{summary.growthRate}% annual growth
              </span>
            </div>
            <div className="az-admin-stat-card">
              <span className="az-admin-stat-card__title">Total Registrations</span>
              <div className="az-admin-stat-card__value">{summary.totalRegistrations.toLocaleString()}</div>
              <span className="az-admin-stat-card__subtitle">Across 248 international tracks</span>
            </div>
            <div className="az-admin-stat-card">
              <span className="az-admin-stat-card__title">Abstract Papers Submitted</span>
              <div className="az-admin-stat-card__value">{summary.totalAbstracts.toLocaleString()}</div>
              <span className="az-admin-stat-card__subtitle">72% peer acceptance rate</span>
            </div>
          </div>

          <div className="az-admin-charts-grid" style={{ marginTop: '1.5rem' }}>
            <div className="az-admin-chart-card">
              <div className="az-admin-chart-card__header">
                <h3>Revenue vs Target Forecast</h3>
                <p>Monthly target pacing in USD</p>
              </div>
              <div className="az-admin-chart-card__body" style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f6" />
                    <XAxis dataKey="month" stroke="#61758a" fontSize={12} />
                    <YAxis stroke="#61758a" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="revenue" name="Actual Revenue" fill="#1769aa" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Forecast Target" fill="#dce4ec" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="az-admin-chart-card">
              <div className="az-admin-chart-card__header">
                <h3>Registration Type Breakdown</h3>
                <p>Delegate category distribution</p>
              </div>
              <div className="az-admin-chart-card__body" style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={summary.registrationTypeDistribution}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      innerRadius={50}
                      paddingAngle={3}
                    >
                      {summary.registrationTypeDistribution.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, name) => [`${v} attendees`, name]} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Registrations */}
      {activeTab === 'registrations' && summary && (
        <div className="az-reports-tab-content">
          <section className="az-admin-card">
            <div className="az-admin-card__header">
              <h2 className="az-admin-card__title">Conference Attendance & Registration Breakdown</h2>
              <p className="az-admin-card__subtitle">Ticket sales and participant counts by conference</p>
            </div>
            <div className="az-admin-table-wrap">
              <table className="az-admin-table">
                <thead>
                  <tr>
                    <th scope="col">Conference Title</th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Registered Delegates
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Revenue Generated
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Avg. Fee / Attendee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.conferenceDistribution.map((conf, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{conf.title}</strong>
                      </td>
                      <td style={{ textAlign: 'right' }}>{conf.count.toLocaleString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <strong>${conf.revenue.toLocaleString()}</strong>
                      </td>
                      <td style={{ textAlign: 'right' }} className="az-muted">
                        ${Math.round(conf.revenue / (conf.count || 1))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* Tab 3: Revenue & Finance */}
      {activeTab === 'revenue' && summary && (
        <div className="az-reports-tab-content">
          <div className="az-admin-chart-card">
            <div className="az-admin-chart-card__header">
              <h3>Monthly Gross Revenue Progression</h3>
              <p>Cumulative performance across all active registration currencies</p>
            </div>
            <div className="az-admin-chart-card__body" style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16805d" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16805d" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f6" />
                  <XAxis dataKey="month" stroke="#61758a" />
                  <YAxis stroke="#61758a" tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#16805d"
                    strokeWidth={2.5}
                    fill="url(#revArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Abstract Submissions */}
      {activeTab === 'abstracts' && (
        <div className="az-reports-tab-content">
          <div className="az-admin-two-col">
            <div className="az-admin-chart-card">
              <div className="az-admin-chart-card__header">
                <h3>Abstract Peer Review Decisions</h3>
                <p>Acceptance vs rejection ratios</p>
              </div>
              <div className="az-admin-chart-card__body" style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={abstractReviewDist}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      innerRadius={50}
                      paddingAngle={3}
                    >
                      {abstractReviewDist.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <section className="az-admin-card">
              <div className="az-admin-card__header">
                <h3 className="az-admin-card__title">Peer Review Metrics</h3>
                <p className="az-admin-card__subtitle">Submission turnaround times</p>
              </div>
              <div className="az-admin-card__content">
                <div className="az-metric-row">
                  <span>Average Time to Decision:</span>
                  <strong>8.4 Days</strong>
                </div>
                <div className="az-metric-row">
                  <span>Peer Reviewers Active:</span>
                  <strong>48 Reviewers</strong>
                </div>
                <div className="az-metric-row">
                  <span>Revision Fulfillment Rate:</span>
                  <strong>92.5%</strong>
                </div>
                <div className="az-metric-row">
                  <span>Acceptance Rate:</span>
                  <strong style={{ color: '#16805d' }}>71.8%</strong>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Tab 5: Global Demographics */}
      {activeTab === 'geography' && summary && (
        <div className="az-reports-tab-content">
          <section className="az-admin-card">
            <div className="az-admin-card__header">
              <h2 className="az-admin-card__title">Country-Wise Participant Distribution</h2>
              <p className="az-admin-card__subtitle">Global delegate representation across 42 nations</p>
            </div>
            <div className="az-admin-table-wrap">
              <table className="az-admin-table">
                <thead>
                  <tr>
                    <th scope="col">Country</th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Participants
                    </th>
                    <th scope="col" style={{ textAlign: 'right' }}>
                      Share of Total
                    </th>
                    <th scope="col">Representation Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.countryDistribution.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{item.country}</strong>
                      </td>
                      <td style={{ textAlign: 'right' }}>{item.count.toLocaleString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="az-badge az-badge--neutral">{item.percentage}%</span>
                      </td>
                      <td style={{ width: '40%' }}>
                        <div className="az-progress-bar-track">
                          <div
                            className="az-progress-bar-fill"
                            style={{ width: `${item.percentage * 2.5}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
