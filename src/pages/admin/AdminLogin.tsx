import { AuthLayout } from '../../components/auth/AuthLayout'
import { LoginForm } from '../../components/auth/LoginForm'
export default function AdminLogin() { return <AuthLayout admin><header className="az-auth__heading"><p className="az-auth__eyebrow">Restricted access</p><h1>AZTech Admin Portal</h1><p>Sign in with an authorized administrator account.</p></header><LoginForm admin /></AuthLayout> }
