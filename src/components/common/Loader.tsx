import type { HTMLAttributes } from 'react'
export function Loader({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) { return <span role="status" className={`az-loader ${className}`} {...props}><span className="sr-only">Loading</span></span> }
export function PageLoader() { return <div className="az-page-loader"><Loader className="az-loader--page" /></div> }
export function Skeleton({ height = '1rem', width = '100%' }: { height?: string; width?: string }) { return <span className="az-skeleton" style={{ height, width }} aria-hidden="true" /> }
export default Loader
