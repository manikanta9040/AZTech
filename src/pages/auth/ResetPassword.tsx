import { AuthLayout } from '../../components/auth/AuthLayout'
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm'
export default function ResetPassword() { return <AuthLayout><header className="az-auth__heading"><p className="az-auth__eyebrow">Account recovery</p><h1>Set a new password</h1><p>Choose a new password with at least 8 characters.</p></header><ResetPasswordForm /></AuthLayout> }
