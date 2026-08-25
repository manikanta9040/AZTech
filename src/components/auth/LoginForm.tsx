import { useState, type FormEvent } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../common/Button'
import { Checkbox } from '../common/FormControls'
import { Input } from '../common/Input'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const emailValid = (email: string) => /^\S+@\S+\.\S+$/.test(email)
export function LoginForm({ admin = false }: { admin?: boolean }) {
  const { login, logout } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [show, setShow] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setError('')
    if (!email) return setError('Email is required.'); if (!emailValid(email)) return setError('Please enter a valid email address.'); if (!password) return setError('Password is required.'); if (password.length < 8) return setError('Password must contain at least 8 characters.')
    setLoading(true); try { const user = await login({ email, password }); const isAdminRole = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'; if (admin && !isAdminRole) { logout(); setError('This account does not have admin access.'); return } const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname; navigate(admin ? ROUTES.adminDashboard : from ?? (isAdminRole ? ROUTES.adminDashboard : ROUTES.userDashboard), { replace: true }) } catch { setError('Invalid email or password.') } finally { setLoading(false) }
  }
  return <form className="az-auth-form" onSubmit={submit} noValidate><Input label={admin ? 'Admin Email' : 'Email'} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /><div className="az-password-field"><Input label="Password" type={show ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" className="az-password-toggle" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{error && <p className="az-auth-error" role="alert">{error}</p>}{!admin && <div className="az-auth-form__options"><Checkbox label="Remember me" /><Link to={ROUTES.forgotPassword}>Forgot password?</Link></div>}<Button type="submit" fullWidth loading={loading}>{loading ? 'Signing in...' : admin ? 'Admin Sign In' : 'Sign In'}</Button>{!admin && <p className="az-auth__footer">Don&apos;t have an account? <Link to={ROUTES.register}>Register</Link></p>}</form>
}
