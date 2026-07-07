import { NavLink } from 'react-router-dom'
import { 
  Home, BookOpen, MessageCircle, FileText, 
  BookMarked, ClipboardList, Award, Info, Users, 
  UserCircle, Phone, Sparkles
} from 'lucide-react'

export default function Sidebar() {
  const menuItems = [
    { to: '/', icon: Home, label: 'Bosh sahifa', color: 'from-indigo-500 to-blue-600' },
    { to: '/units', icon: BookOpen, label: 'Mavzular', color: 'from-blue-500 to-indigo-500' },
    { to: '/idioms', icon: MessageCircle, label: 'Useful medical idioms', color: 'from-green-500 to-teal-500' },
    { to: '/phrasal-verbs', icon: Sparkles, label: 'Medicine related phrasal verbs', color: 'from-orange-500 to-red-500' },
    { to: '/vocabulary', icon: BookMarked, label: 'Glossariy', color: 'from-cyan-500 to-blue-500' },
    { to: '/test', icon: ClipboardList, label: 'Test', color: 'from-violet-500 to-purple-500' },
    { to: '/test', icon: Award, label: 'Imtixon (Sertifikat)', color: 'from-amber-500 to-orange-500' },
    { to: '/about', icon: Info, label: 'Platforma haqida', color: 'from-slate-500 to-gray-600' },
    { to: '/leaderboard', icon: Users, label: 'Foydalanuvchilar', color: 'from-rose-500 to-pink-500' },
    { to: '/author', icon: UserCircle, label: 'Muallif haqida', color: 'from-indigo-500 to-blue-500' },
    { to: '/contact', icon: Phone, label: "Bog'lanish", color: 'from-emerald-500 to-green-500' },
  ]
  
  return (
    <aside className="w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sticky top-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Kurs tarkibi</h3>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-1.5">
          {menuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive 
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-[1.02]` 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:scale-[1.01]'
                }
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Decorative gradient */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </aside>
  )
}
