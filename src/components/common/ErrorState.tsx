import { AlertCircle } from 'lucide-react'
import { Button } from './Button'
export function ErrorState({ title = 'Something went wrong', message, onRetry }: { title?: string; message?: string; onRetry?: () => void }) { return <section className="az-state az-state--error" role="alert"><AlertCircle className="az-state__icon" size={32} aria-hidden="true" /><div><h3>{title}</h3>{message && <p className="az-body-sm">{message}</p>}</div>{onRetry && <Button variant="outline" onClick={onRetry}>Try again</Button>}</section> }
export default ErrorState
