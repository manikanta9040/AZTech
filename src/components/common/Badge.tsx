import type { ReactNode } from 'react'
type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary'
export function Badge({ variant = 'neutral', children }: { variant?: BadgeVariant; children: ReactNode }) { return <span className={`az-badge az-badge--${variant}`}>{children}</span> }
export default Badge
