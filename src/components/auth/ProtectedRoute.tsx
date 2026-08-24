import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PageLoader } from '../common/Loader'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isAuthenticated, isLoading } = useAuth(); const location = useLocation()
  if (isLoading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace state={{ from: location }} />
  return user?.role === 'USER' ? children : <Navigate to={ROUTES.adminDashboard} replace />
}
