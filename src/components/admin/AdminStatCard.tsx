import { Calendar, FileText, Mic, Ticket, TrendingDown, TrendingUp, Users, DollarSign } from 'lucide-react'
import type { AdminStatItem } from '../../types/admin'

const iconMap: Record<string, typeof Users> = {
  Users,
  Calendar,
  Mic,
  Ticket,
  FileText,
  TrendingUp,
  DollarSign,
}

interface AdminStatCardProps {
  stat: AdminStatItem
}

export function AdminStatCard({ stat }: AdminStatCardProps) {
  const IconComponent = iconMap[stat.icon] || Users

  return (
    <div className="az-admin-stat-card">
      <div className="az-admin-stat-card__top">
        <span className="az-admin-stat-card__title">{stat.title}</span>
        <div className="az-admin-stat-card__icon-wrap">
          <IconComponent size={20} className="az-admin-stat-card__icon" />
        </div>
      </div>
      <div className="az-admin-stat-card__body">
        <div className="az-admin-stat-card__value">{stat.value}</div>
        {(stat.change || stat.subtitle) && (
          <div className="az-admin-stat-card__meta">
            {stat.change && (
              <span
                className={`az-admin-stat-card__change az-admin-stat-card__change--${stat.trend ?? 'neutral'}`}
              >
                {stat.trend === 'up' && <TrendingUp size={13} />}
                {stat.trend === 'down' && <TrendingDown size={13} />}
                {stat.change}
              </span>
            )}
            {stat.subtitle && (
              <span className="az-admin-stat-card__subtitle">{stat.subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
