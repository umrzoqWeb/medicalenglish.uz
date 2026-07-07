import { Link } from 'react-router-dom'
import { BookOpen, Award, Users, Zap, Sparkles, Brain, Mic, PenTool, Video, MessageSquare, ArrowRight, ClipboardList, FileText, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">

      {/* Hero cards - Mavzular & Test */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/units" className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="relative">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Mavzular</h2>
            <p className="text-white/80 text-sm mb-4">15 ta mavzu, har birida 13 ta interaktiv topshiriq. Grammatika, lug'at va ko'nikmalar.</p>
            <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
              <span>Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link to="/test" className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
          <div className="relative">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Test topshirish</h2>
            <p className="text-white/80 text-sm mb-4">300 ta savoldan 30 tasi random. 60% dan o'tsangiz sertifikat olasiz!</p>
            <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
              <span>Testni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: BookOpen, value: '15', label: 'Mavzular', gradient: 'from-blue-500 to-indigo-600' },
          { icon: Zap, value: '195', label: 'Topshiriqlar', gradient: 'from-amber-500 to-orange-600' },
          { icon: FileText, value: '300', label: 'Test savollari', gradient: 'from-purple-500 to-pink-600' },
          { icon: Users, value: '1.2K+', label: 'Foydalanuvchilar', gradient: 'from-emerald-500 to-teal-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-100 hover:scale-105 transition-transform">
            <div className={`w-11 h-11 md:w-14 md:h-14 mx-auto mb-3 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: '/vocabulary', label: 'Glossariy', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
          { to: '/idioms', label: 'Idiomalar', icon: MessageSquare, color: 'from-green-500 to-teal-500' },
          { to: '/phrasal-verbs', label: 'Phrasal Verbs', icon: Sparkles, color: 'from-orange-500 to-red-500' },
          { to: '/leaderboard', label: 'Reyting', icon: Award, color: 'from-yellow-500 to-amber-500' },
        ].map((item, i) => (
          <Link key={i} to={item.to} className="group bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shrink-0`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-gray-800 truncate block">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Mavzular</h3>
          <p className="text-gray-500 text-sm leading-relaxed">15 ta mavzu bo'yicha tuzilgan darslar. Har bir mavzuda 13 ta interaktiv topshiriq.</p>
        </div>
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">AI Baholash</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Speaking, Writing, Translation kabi topshiriqlar sun'iy intellekt yordamida baholanadi.</p>
        </div>
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-800">Sertifikat</h3>
          <p className="text-gray-500 text-sm leading-relaxed">Testdan 60% dan yuqori to'plang va QR kodli sertifikat oling.</p>
        </div>
      </div>

      {/* Task types */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-lg md:text-xl text-gray-800">Topshiriq turlari</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {[
            { name: 'Fill in the blanks', ai: false },
            { name: 'Identify tense', ai: false },
            { name: 'Matching', ai: false },
            { name: 'Verb forms', ai: false },
            { name: 'Vocabulary', ai: false },
            { name: 'Crossword', ai: false },
            { name: 'Insert words', ai: false },
            { name: 'Translation', ai: true, icon: PenTool },
            { name: 'Synonyms', ai: true, icon: Sparkles },
            { name: 'Conversation', ai: true, icon: MessageSquare },
            { name: 'Speaking', ai: true, icon: Mic },
            { name: 'Writing', ai: true, icon: PenTool },
            { name: 'Video retelling', ai: true, icon: Video },
          ].map((type, i) => (
            <div key={i} className={`p-3 md:p-4 rounded-xl text-xs md:text-sm font-medium transition-all hover:scale-105 cursor-pointer ${
              type.ai
                ? 'bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 border-2 border-purple-200 shadow-md'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-1.5">
                {type.ai && type.icon && <type.icon className="w-3.5 h-3.5" />}
                <span>{type.name}</span>
              </div>
              {type.ai && (
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full">
                  <Brain className="w-2.5 h-2.5" /> AI
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
