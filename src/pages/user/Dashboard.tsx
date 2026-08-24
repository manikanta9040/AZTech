import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/common/Button'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
export default function Dashboard() { const { user, logout } = useAuth(); const navigate = useNavigate(); const leave = () => { logout(); navigate(ROUTES.login, { replace: true }) }; return <main className="az-dashboard-placeholder"><section><p className="az-auth__eyebrow">AZTech account</p><h1>Welcome, {user?.name}</h1><p>Your AZTech dashboard is coming soon.</p><Button onClick={leave}>Logout</Button></section></main> }
