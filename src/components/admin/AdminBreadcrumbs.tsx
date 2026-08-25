import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface AdminBreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function AdminBreadcrumbs({ items }: AdminBreadcrumbsProps) {
  return (
    <nav className="az-admin-breadcrumbs" aria-label="Breadcrumb">
      <ol className="az-admin-breadcrumbs__list">
        <li className="az-admin-breadcrumbs__item">
          <Link to={ROUTES.adminDashboard} className="az-admin-breadcrumbs__link" title="Dashboard">
            <Home size={14} aria-hidden="true" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className="az-admin-breadcrumbs__item">
              <ChevronRight size={14} className="az-admin-breadcrumbs__separator" aria-hidden="true" />
              {item.to && !isLast ? (
                <Link to={item.to} className="az-admin-breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="az-admin-breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
