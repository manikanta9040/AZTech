import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastProvider } from '../components/admin/AdminToast'
import AdminNavbar from '../components/layout/AdminNavbar'
import AdminSidebar from '../components/layout/AdminSidebar'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ToastProvider>
      <div className="az-admin-layout">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="az-admin-layout__main">
          <AdminNavbar onMenuOpen={() => setSidebarOpen(true)} />
          <main className="az-admin-content" id="admin-main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
export default AdminLayout
