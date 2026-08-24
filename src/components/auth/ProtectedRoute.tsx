import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { PageLoader } from '../common/Loader'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth(); const location = useLocation()
  if (isLoading) return <PageLoader />
  return isAuthenticated ? children : <Navigate to={ROUTES.login} replace state={{ from: location }} />
}
