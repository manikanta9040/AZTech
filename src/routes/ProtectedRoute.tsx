import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
export function ProtectedRoute() { return useAuth().isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.login} replace /> }
