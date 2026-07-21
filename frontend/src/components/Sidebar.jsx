import { NavLink } from 'react-router-dom'
import { 
  Home, BookOpen, MessageCircle, FileText, 
  BookMarked, ClipboardList, Award, Info, Users, 
  UserCircle, Phone, Sparkles, Stethoscope
} from 'lucide-react'

export default function Sidebar() {
  const menuItems = [
    { to: '/', icon: Home, label: 'Bosh sahifa', color: 'from-teal-500 to-cyan-600' },
    { to: '/units', icon: BookOpen, label: 'Mavzular', color: 'from-teal-600 to-teal-700' },
    { to: '/idioms', icon: MessageCircle, label: 'Useful medical idioms', color: 'from-emerald-500 to-teal-600' },
    { to: '/phrasal-verbs', icon: Sparkles, label: 'Medicine related phrasal verbs', color: 'from-cyan-500 to-teal-600' },
    { to: '/vocabulary', icon: BookMarked, label: 'Glossariy', color: 'from-teal-500 to-cyan-600' },
    { to: '/test', icon: ClipboardList, label: 'Test', color: 'from-teal-600 to-emerald-600' },
    { to: '/leaderboard', icon: Users, label: 'Foydalanuvchilar', color: 'from-teal-500 to-cyan-600' },
    { to: '/about', icon: Info, label: 'About', color: 'from-slate-500 to-gray-600' },
    { to: '/contact', icon: Phone, label: 'Contact details', color: 'from-emerald-500 to-teal-600' },
  ]
  
  return (
    <aside className="w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sticky top-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Kurs tarkibi</h3>
        </div>
        
        <nav className="space-y-1.5">
          {menuItems.map(item => (
            <NavLink
              key={item.label}
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
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </aside>
  )
}
