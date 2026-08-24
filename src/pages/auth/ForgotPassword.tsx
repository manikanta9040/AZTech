import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm'
import { ROUTES } from '../../constants/routes'
export default function ForgotPassword() { return <AuthLayout><header className="az-auth__heading"><p className="az-auth__eyebrow">Account recovery</p><h1>Forgot your password?</h1><p>Enter your email and we&apos;ll prepare a mock reset link.</p></header><ForgotPasswordForm /><p className="az-auth__footer"><Link to={ROUTES.login}>Back to sign in</Link></p></AuthLayout> }
