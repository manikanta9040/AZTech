import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
export default function Dashboard() { const { logout } = useAuth(); const navigate = useNavigate(); const leave = () => { logout(); navigate(ROUTES.adminLogin, { replace: true }) }; return <main className="az-dashboard-placeholder az-dashboard-placeholder--admin"><section><p className="az-auth__eyebrow">Administrator access</p><h1>Welcome to AZTech Admin</h1><p>Admin dashboard modules will be implemented in Step 12.</p><Button onClick={leave}>Logout</Button></section></main> }
