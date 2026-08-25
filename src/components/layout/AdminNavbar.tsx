import { useState, useRef, useEffect } from 'react'
import { Bell, ChevronDown, LogOut, Menu, Settings, User, ExternalLink, ShieldCheck } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Overview',
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/conferences': 'Conference Management',
  '/admin/conferences/new': 'Add New Conference',
  '/admin/speakers': 'Speaker Management',
  '/admin/speakers/new': 'Add New Speaker',
  '/admin/users': 'User & Role Management',
  '/admin/registrations': 'Registration Management',
  '/admin/abstracts': 'Abstract Submissions & Reviews',
  '/admin/blogs': 'Blog & Article Management',
  '/admin/blogs/new': 'Create New Blog Post',
  '/admin/faqs': 'FAQ Management',
  '/admin/gallery': 'Media & Gallery Management',
  '/admin/payments': 'Payment Transactions',
  '/admin/reports': 'Reports & Analytics',
  '/admin/settings': 'Platform & Admin Settings',
}

interface AdminNavbarProps {
  onMenuOpen: () => void
}

export default function AdminNavbar({ onMenuOpen }: AdminNavbarProps) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTitle = () => {
    if (pageTitles[pathname]) return pageTitles[pathname]
    if (pathname.includes('/conferences/') && pathname.includes('/edit')) return 'Edit Conference'
    if (pathname.includes('/speakers/') && pathname.includes('/edit')) return 'Edit Speaker'
    if (pathname.includes('/blogs/') && pathname.includes('/edit')) return 'Edit Blog Post'
    if (pathname.includes('/abstracts/')) return 'Abstract Peer Review'
    return 'Admin Portal'
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.adminLogin, { replace: true })
  }

  return (
    <header className="az-admin-navbar">
      <div className="az-admin-navbar__left">
        <button
          type="button"
          className="az-admin-navbar__menu-btn"
          onClick={onMenuOpen}
          aria-label="Open sidebar menu"
        >
          <Menu size={22} />
        </button>
        <div className="az-admin-navbar__heading">
          <h1 className="az-admin-navbar__title">{getTitle()}</h1>
        </div>
      </div>

      <div className="az-admin-navbar__right">
        <Link
          to={ROUTES.home}
          target="_blank"
          rel="noopener noreferrer"
          className="az-admin-navbar__public-link"
          title="View public website in new tab"
        >
          <span>Live Site</span>
          <ExternalLink size={14} />
        </Link>

        {/* Notifications Dropdown */}
        <div className="az-admin-dropdown-wrap" ref={notifRef}>
          <button
            type="button"
            className="az-admin-navbar__icon-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setProfileOpen(false)
            }}
            aria-label="Admin notifications"
            aria-expanded={notificationsOpen}
          >
            <Bell size={19} />
            <span className="az-admin-navbar__unread-dot" aria-label="3 new notifications" />
          </button>

          {notificationsOpen && (
            <div className="az-admin-notif-menu" role="menu">
              <div className="az-admin-notif-menu__header">
                <h3>Notifications</h3>
                <span className="az-badge az-badge--primary">3 New</span>
              </div>
              <div className="az-admin-notif-menu__list">
                <div className="az-admin-notif-item is-unread">
                  <div className="az-admin-notif-item__dot" />
                  <div>
                    <p className="az-admin-notif-item__text">
                      New registration for <strong>Global AI Summit</strong> by Dr. Aris Thorne
                    </p>
                    <span className="az-admin-notif-item__time">5 minutes ago</span>
                  </div>
                </div>
                <div className="az-admin-notif-item is-unread">
                  <div className="az-admin-notif-item__dot" />
                  <div>
                    <p className="az-admin-notif-item__text">
                      Abstract submitted: <strong>Deep Learning for CRISPR-Cas9</strong>
                    </p>
                    <span className="az-admin-notif-item__time">2 hours ago</span>
                  </div>
                </div>
                <div className="az-admin-notif-item is-unread">
                  <div className="az-admin-notif-item__dot" />
                  <div>
                    <p className="az-admin-notif-item__text">
                      Payment received: <strong>$549.00</strong> (INV-2026-0043)
                    </p>
                    <span className="az-admin-notif-item__time">4 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="az-admin-notif-menu__footer">
                <Link
                  to={ROUTES.adminRegistrations}
                  onClick={() => setNotificationsOpen(false)}
                >
                  View all activity
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="az-admin-dropdown-wrap" ref={profileRef}>
          <button
            type="button"
            className="az-admin-navbar__profile-btn"
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotificationsOpen(false)
            }}
            aria-expanded={profileOpen}
            aria-label="Admin user menu"
          >
            <div className="az-admin-navbar__avatar" aria-hidden="true">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="az-admin-navbar__user-details">
              <span className="az-admin-navbar__name">{user?.name || 'Administrator'}</span>
              <span className="az-admin-navbar__role">{user?.role || 'ADMIN'}</span>
            </div>
            <ChevronDown size={15} className="az-admin-navbar__chevron" />
          </button>

          {profileOpen && (
            <div className="az-admin-profile-menu" role="menu">
              <div className="az-admin-profile-menu__header">
                <p className="az-admin-profile-menu__user">{user?.name}</p>
                <p className="az-admin-profile-menu__email">{user?.email}</p>
                <div className="az-admin-profile-menu__role-badge">
                  <ShieldCheck size={13} />
                  <span>{user?.role === 'SUPER_ADMIN' ? 'Super Administrator' : 'Administrator'}</span>
                </div>
              </div>
              <div className="az-admin-profile-menu__divider" />
              <Link
                to={ROUTES.adminSettings}
                className="az-admin-profile-menu__item"
                onClick={() => setProfileOpen(false)}
                role="menuitem"
              >
                <User size={16} />
                <span>Admin Profile</span>
              </Link>
              <Link
                to={ROUTES.adminSettings}
                className="az-admin-profile-menu__item"
                onClick={() => setProfileOpen(false)}
                role="menuitem"
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <div className="az-admin-profile-menu__divider" />
              <button
                type="button"
                className="az-admin-profile-menu__item az-admin-profile-menu__item--logout"
                onClick={handleLogout}
                role="menuitem"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
