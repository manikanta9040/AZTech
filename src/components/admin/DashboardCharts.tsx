import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ConferenceCategoryStat, RegistrationGrowthPoint } from '../../types/admin'

const CATEGORY_COLORS = ['#1769aa', '#0f9f9a', '#16805d', '#b86b00', '#7b1fa2', '#be2e3b']

interface RegistrationTrendChartProps {
  data: RegistrationGrowthPoint[]
}

export function RegistrationTrendChart({ data }: RegistrationTrendChartProps) {
  return (
    <div className="az-admin-chart-card">
      <div className="az-admin-chart-card__header">
        <div>
          <h3>Registration & Submission Growth</h3>
          <p>Monthly attendee registrations vs abstract submissions (2026-2027)</p>
        </div>
      </div>
      <div className="az-admin-chart-card__body" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1769aa" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1769aa" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="absGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f9f9a" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0f9f9a" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f6" />
            <XAxis dataKey="month" stroke="#61758a" fontSize={12} tickLine={false} />
            <YAxis stroke="#61758a" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#dce4ec',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(16, 42, 67, 0.1)',
                fontSize: '12px',
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area
              type="monotone"
              dataKey="registrations"
              name="Registrations"
              stroke="#1769aa"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#regGrad)"
            />
            <Area
              type="monotone"
              dataKey="abstracts"
              name="Abstracts"
              stroke="#0f9f9a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#absGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface RevenueOverviewChartProps {
  data: RegistrationGrowthPoint[]
}

export function RevenueOverviewChart({ data }: RevenueOverviewChartProps) {
  return (
    <div className="az-admin-chart-card">
      <div className="az-admin-chart-card__header">
        <div>
          <h3>Monthly Revenue Trajectory</h3>
          <p>Gross registration revenue collected in USD equivalent</p>
        </div>
      </div>
      <div className="az-admin-chart-card__body" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f6" />
            <XAxis dataKey="month" stroke="#61758a" fontSize={12} tickLine={false} />
            <YAxis
              stroke="#61758a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#dce4ec',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(16, 42, 67, 0.1)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="revenue" name="Revenue" fill="#1769aa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface CategoryPieChartProps {
  data: ConferenceCategoryStat[]
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div className="az-admin-chart-card">
      <div className="az-admin-chart-card__header">
        <div>
          <h3>Conferences by Category</h3>
          <p>Distribution of active and planned scientific domains</p>
        </div>
      </div>
      <div className="az-admin-chart-card__body" style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} Conferences`, name]}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#dce4ec',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(16, 42, 67, 0.1)',
                fontSize: '12px',
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', paddingLeft: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
