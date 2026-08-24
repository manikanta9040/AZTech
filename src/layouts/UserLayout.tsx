import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/layout/UserNavbar'
import UserSidebar from '../components/layout/UserSidebar'
export function UserLayout() { const [open, setOpen] = useState(false); useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }; addEventListener('keydown', close); return () => removeEventListener('keydown', close) }, []); return <div className="az-user-layout"><UserSidebar open={open} onClose={() => setOpen(false)} /><div className="az-user-layout__main"><UserNavbar onMenuOpen={() => setOpen(true)} /><main className="az-user-content"><Outlet /></main></div></div> }
