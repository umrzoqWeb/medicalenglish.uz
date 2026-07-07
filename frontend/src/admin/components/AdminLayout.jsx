import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'

const NAV = [
  { to: '/admin-panel', label: 'Dashboard', end: true, d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin-panel/units', label: 'Mavzular', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { to: '/admin-panel/tasks', label: 'Topshiriqlar', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { to: '/admin-panel/questions', label: 'Savollar', d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/admin-panel/vocabulary', label: "Lug'at", d: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { to: '/admin-panel/idioms', label: 'Idiomalar', d: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
  { to: '/admin-panel/phrasal-verbs', label: 'Phrasal Verbs', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
  { to: '/admin-panel/users', label: 'Foydalanuvchilar', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { to: '/admin-panel/badges', label: 'Nishonlar', d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { to: '/admin-panel/quiz-results', label: 'Test natijalari', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { to: '/admin-panel/progress', label: 'Mavzular bo\u2019yicha natijalar', d: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
]

function Icon({ d }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
}

function SidebarContent({ collapsed, onCloseMobile, user, onLogout }) {
  return (
    <div className="flex flex-col h-full bg-slate-800">
      <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-700">
        <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">ME</div>
        {!collapsed && <div><p className="text-white font-semibold text-sm">Medical English</p><p className="text-slate-400 text-[11px]">Admin Panel</p></div>}
      </div>
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {NAV.map(n => (
          <NavLink key={n.to} to={n.to} end={!!n.end} onClick={onCloseMobile}
            className={({isActive}) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}`}>
            <Icon d={n.d}/>{!collapsed && <span className="truncate">{n.label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-slate-700">
        {!collapsed && <p className="px-3 mb-2 text-white text-sm font-medium truncate">{user?.first_name || user?.username}</p>}
        <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          {!collapsed && <span>Chiqish</span>}
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [col, setCol] = useState(false)
  const [mob, setMob] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }
  const closeMobile = () => setMob(false)

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className={`hidden lg:block fixed top-0 left-0 h-full z-30 transition-all duration-300 ${col ? 'w-[72px]' : 'w-64'}`}>
        <SidebarContent collapsed={col} onCloseMobile={closeMobile} user={user} onLogout={handleLogout} />
        <button onClick={() => setCol(!col)} className="absolute -right-3 top-20 w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${col ? 'rotate-180' : ''}`}><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      </aside>

      {mob && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={closeMobile}/>}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300 ${mob ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent collapsed={false} onCloseMobile={closeMobile} user={user} onLogout={handleLogout} />
      </aside>

      <div className={`transition-all duration-300 ${col ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-20 shadow-sm">
          <button onClick={() => setMob(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <h1 className="text-lg font-semibold text-slate-700">Admin Panel</h1>
        </header>
        <div className="p-4 md:p-6"><Outlet/></div>
      </div>
    </div>
  )
}
