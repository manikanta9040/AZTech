import { AuthLayout } from '../../components/auth/AuthLayout'
import { RegisterForm } from '../../components/auth/RegisterForm'
export default function Register() { return <AuthLayout><header className="az-auth__heading"><p className="az-auth__eyebrow">Create your account</p><h1>Join AZTech</h1><p>Connect with the global conference community.</p></header><RegisterForm /></AuthLayout> }
