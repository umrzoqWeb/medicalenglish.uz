import { NavLink } from 'react-router-dom'
import {
  Home, BookOpen, MessageCircle, FileText,
  BookMarked, ClipboardList, Award, Info, Users,
  UserCircle, Phone, Sparkles, Stethoscope, Building2
} from 'lucide-react'
import { useT } from '../i18n'

export default function Sidebar() {
  const t = useT()
  const menuItems = [
    { to: '/units', icon: BookOpen, labelKey: 'side.topics', color: 'from-teal-600 to-teal-700' },
    { to: '/idioms', icon: MessageCircle, labelKey: 'side.idioms', color: 'from-emerald-500 to-teal-600' },
    { to: '/phrasal-verbs', icon: Sparkles, labelKey: 'side.phrasal', color: 'from-cyan-500 to-teal-600' },
    { to: '/vocabulary', icon: BookMarked, labelKey: 'side.glossary', color: 'from-teal-500 to-cyan-600' },
    { to: '/test', icon: ClipboardList, labelKey: 'side.test', color: 'from-teal-600 to-emerald-600' },
    { to: '/leaderboard', icon: Users, labelKey: 'side.users', color: 'from-teal-500 to-cyan-600' },
  ]

  return (
    <aside className="w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sticky top-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">{t('side.title')}</h3>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-[1.02]`
                  : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700 hover:scale-[1.01]'
                }
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="leading-snug">{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </aside>
  )
}
