import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader } from './Loader'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; fullWidth?: boolean; iconOnly?: boolean; children?: ReactNode }
export function Button({ variant = 'primary', size = 'md', loading = false, fullWidth = false, iconOnly = false, className = '', disabled, children, ...props }: ButtonProps) {
  return <button className={`az-button az-button--${variant} ${size === 'md' ? '' : `az-button--${size}`} ${fullWidth ? 'az-button--full' : ''} ${iconOnly ? 'az-button--icon' : ''} ${className}`} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{loading && <Loader aria-label="Loading" />}{children}</button>
}
export default Button
