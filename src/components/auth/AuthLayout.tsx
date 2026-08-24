import { Link } from 'react-router-dom'
import type { PropsWithChildren, ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'

export function AuthLayout({ children, admin = false, aside }: PropsWithChildren<{ admin?: boolean; aside?: ReactNode }>) {
  return <main className={`az-auth ${admin ? 'az-auth--admin' : ''}`}><section className="az-auth__panel"><Link to="/" className="az-logo" aria-label="AZTech home">AZ<span>Tech</span></Link><div className="az-auth__content">{children}</div></section><aside className="az-auth__aside" aria-hidden="true">{aside ?? <><ShieldCheck size={52} /><p className="az-auth__eyebrow">Global conference management</p><h2>Make every event connection count.</h2><p>Discover conferences, speakers, and opportunities with AZTech.</p></>}</aside></main>
}
