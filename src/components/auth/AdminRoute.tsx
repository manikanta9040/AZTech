import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { PageLoader } from '../common/Loader'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

export function AdminRoute({ children }: PropsWithChildren) {
  const { user, isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to={ROUTES.adminLogin} replace />
  return user?.role === 'ADMIN' ? children : <Navigate to={ROUTES.userDashboard} replace />
}
