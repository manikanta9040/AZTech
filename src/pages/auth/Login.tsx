import { useLocation } from 'react-router-dom'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { LoginForm } from '../../components/auth/LoginForm'
export default function Login() { const location = useLocation(); const success = (location.state as { resetSuccess?: boolean } | null)?.resetSuccess; return <AuthLayout><header className="az-auth__heading"><p className="az-auth__eyebrow">Welcome to AZTech</p><h1>Welcome Back</h1><p>Sign in to continue to your AZTech account.</p></header>{success && <p className="az-auth-success" role="status">Your password has been reset successfully.</p>}<LoginForm /></AuthLayout> }
