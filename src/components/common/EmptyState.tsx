import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'
export function EmptyState({ title = 'Nothing found', description, icon: Icon = Inbox, action }: { title?: string; description?: string; icon?: LucideIcon; action?: ReactNode }) { return <section className="az-state"><Icon className="az-state__icon" size={32} aria-hidden="true" /><div><h3>{title}</h3>{description && <p className="az-body-sm">{description}</p>}</div>{action}</section> }
export default EmptyState
