import { Navigate, Outlet } from 'react-router-dom'
import type { Role } from '../constants/roles'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
export function RoleRoute({ role }: { role: Role }) { return useAuth().user?.role === role ? <Outlet /> : <Navigate to={ROUTES.home} replace /> }
