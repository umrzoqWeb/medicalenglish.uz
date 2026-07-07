import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Header from './Header'
import { useAuthStore } from '../store'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Slider from './Slider'

export default function Layout() {
  const { user, isAuthenticated, _hydrated } = useAuthStore()
  const nav = useNavigate()
  useEffect(() => {
    if (_hydrated && isAuthenticated && user?.is_staff) nav('/admin-panel', { replace: true })
  }, [_hydrated, isAuthenticated, user])
  const location = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => { setMobileMenu(false) }, [location.pathname])

  const noSidebarPages = ['/login', '/register']
  const showSidebar = !noSidebarPages.includes(location.pathname)
  const showSlider = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Mobile: menu button bar */}
      {showSidebar && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2.5">
          <button onClick={() => setMobileMenu(true)}
            className="flex items-center gap-2 text-gray-700 font-medium text-sm">
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
        </div>
      )}

      {/* Slider - desktop only */}
      {showSlider && <div className="hidden md:block shadow-2xl"><Slider /></div>}

      {/* Mobile sidebar overlay */}
      {mobileMenu && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
          <div className="lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 overflow-y-auto bg-white shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-gray-800">Menu</span>
              <button onClick={() => setMobileMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-2">
              <Sidebar />
            </div>
          </div>
        </>
      )}

      <div className="h-4 md:h-10"></div>

      <div className="flex-1 container mb-16 px-4">
        <div className="flex gap-8">
          {showSidebar && (
            <div className="hidden lg:block">
              <Sidebar />
            </div>
          )}
          <main className={`flex-1 min-w-0 ${showSidebar ? '' : 'max-w-2xl mx-auto'}`}>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
