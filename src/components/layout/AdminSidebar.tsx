import {
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Image,
  LayoutDashboard,
  LogOut,
  Mic,
  Settings,
  Ticket,
  Users,
  X,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { to: ROUTES.adminDashboard, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: ROUTES.adminConferences, label: 'Conferences', icon: Calendar },
  { to: ROUTES.adminSpeakers, label: 'Speakers', icon: Mic },
  { to: ROUTES.adminUsers, label: 'Users', icon: Users },
  { to: ROUTES.adminRegistrations, label: 'Registrations', icon: Ticket },
  { to: ROUTES.adminAbstracts, label: 'Abstracts', icon: FileText },
  { to: ROUTES.adminBlogs, label: 'Blogs', icon: BookOpen },
  { to: ROUTES.adminFaqs, label: 'FAQs', icon: HelpCircle },
  { to: ROUTES.adminGallery, label: 'Gallery', icon: Image },
  { to: ROUTES.adminPayments, label: 'Payments', icon: CreditCard },
  { to: ROUTES.adminReports, label: 'Reports', icon: BarChart3 },
  { to: ROUTES.adminSettings, label: 'Settings', icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(ROUTES.adminLogin, { replace: true })
  }

  return (
    <>
      <button
        className={`az-dashboard-overlay ${open ? 'is-open' : ''}`}
        aria-label="Close admin navigation menu"
        onClick={onClose}
      />
      <aside className={`az-admin-sidebar ${open ? 'is-open' : ''}`} aria-label="Admin sidebar navigation">
        <div className="az-admin-sidebar__top">
          <div className="az-admin-sidebar__brand">
            <span className="az-logo">
              AZ<span>Tech</span>
            </span>
            <span className="az-admin-sidebar__badge">ADMIN</span>
          </div>
          <button
            type="button"
            className="az-admin-sidebar__close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="az-admin-sidebar__nav">
          <div className="az-admin-sidebar__section-title">Navigation</div>
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `az-admin-nav__link ${isActive ? 'is-active' : ''}`
              }
            >
              <Icon size={18} className="az-admin-nav__icon" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="az-admin-sidebar__footer">
          <div className="az-admin-sidebar__user-card">
            <div className="az-admin-sidebar__avatar" aria-hidden="true">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="az-admin-sidebar__user-info">
              <span className="az-admin-sidebar__user-name">{user?.name || 'Administrator'}</span>
              <span className="az-admin-sidebar__user-role">{user?.role || 'ADMIN'}</span>
            </div>
          </div>
          <button
            type="button"
            className="az-admin-nav__link az-admin-nav__logout"
            onClick={handleLogout}
          >
            <LogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
