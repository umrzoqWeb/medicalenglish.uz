import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, User, LogOut, Flame, Star, Activity } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store'

const socials = [
  { name: 'Telegram', href: 'https://t.me/Sitora21', color: 'hover:bg-blue-500', icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.324.015.092.034.303.019.468z' },
  { name: 'Facebook', href: 'https://www.facebook.com/sitora.mukhamedjanova/', color: 'hover:bg-blue-600', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'Instagram', href: 'https://www.instagram.com/setaareh_21/', color: 'hover:bg-pink-600', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mukhamedjanova-sitora-859a921a9/', color: 'hover:bg-blue-700', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Bosh sahifa' },
    { to: '/units', label: 'Mavzular' },
    { to: '/leaderboard', label: 'Foydalanuvchilar' },
    { to: '/news', label: "Yangiliklar" },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact details' },
  ]

  return (
    <header className="relative">
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-blob"/>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{animationDelay:'4s'}}/>
        </div>

        <div className="container relative py-4 md:py-5 px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/static/logo.svg" alt="Medical English Hub" className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 group-hover:scale-105 transition-all"/>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm md:text-base font-black text-white leading-tight">Medical English Hub</h1>
                <p className="text-[10px] md:text-xs font-semibold text-teal-300/80 tracking-widest">platform for medical students</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive(link.to)
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: socials + auth */}
            <div className="flex items-center gap-2">
              {/* Social icons */}
              <div className="hidden md:flex items-center gap-1.5 mr-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`w-8 h-8 bg-white/10 ${s.color} rounded-lg flex items-center justify-center transition-all hover:scale-110`}
                    title={s.name}>
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                  </a>
                ))}
              </div>

              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-white text-xs font-bold">{user?.streak || 0}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-white text-xs font-bold">{user?.points || 0}</span>
                  </div>
                  <Link to="/profile" className="w-9 h-9 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </Link>
                  <button onClick={logout} className="text-white/50 hover:text-white p-1"><LogOut className="w-4 h-4" /></button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-105 transition-all text-sm">
                  <LogIn className="w-4 h-4" /><span>Kirish</span>
                </Link>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white/80 hover:text-white">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-lg animate-slide-in">
            <div className="container px-4 py-3">
              {/* Mobile social icons */}
              <div className="flex items-center justify-center gap-3 pb-3 mb-3 border-b border-white/10">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`w-9 h-9 bg-white/10 ${s.color} rounded-lg flex items-center justify-center transition-all`}
                    title={s.name}>
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.to)
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
