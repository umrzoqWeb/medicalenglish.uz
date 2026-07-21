import { Link } from 'react-router-dom'
import { BookOpen, Award, Users, Zap, Sparkles, Brain, Mic, PenTool, Video, MessageSquare, ArrowRight, ClipboardList, FileText, ChevronRight, Stethoscope, ShieldCheck, Activity, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">

      {/* Hero cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link to="/units" className="group relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 hover:scale-[1.02] transition-all">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"/>
            <div className="absolute bottom-0 left-0 w-full h-16 opacity-20">
              <svg viewBox="0 0 400 50" className="w-full"><path d="M0,25 L60,25 L70,25 L80,10 L90,40 L100,5 L110,45 L120,25 L130,25 L400,25" fill="none" stroke="white" strokeWidth="1.5" className="animate-ecg"/></svg>
            </div>
          </div>
          <div className="relative">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Mavzular</h2>
            <p className="text-white/75 text-sm mb-4">15 ta mavzu, har birida 13 ta interaktiv topshiriq. Grammatika, lug'at va ko'nikmalar.</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-teal-200 group-hover:gap-3 transition-all">
              <span>Boshlash</span><ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link to="/test" className="group relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"/>
            <div className="absolute top-4 right-4 animate-heartbeat opacity-15">
              <Heart className="w-12 h-12" fill="white"/>
            </div>
          </div>
          <div className="relative">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Test topshirish</h2>
            <p className="text-white/75 text-sm mb-4">300 ta savoldan 30 tasi random. 60% dan o'tsangiz sertifikat olasiz!</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200 group-hover:gap-3 transition-all">
              <span>Testni boshlash</span><ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats with pulse animation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: BookOpen, value: '15', label: 'Mavzular', color: 'teal' },
          { icon: Zap, value: '195', label: 'Topshiriqlar', color: 'cyan' },
          { icon: FileText, value: '300', label: 'Test savollari', color: 'emerald' },
          { icon: Users, value: '1.2K+', label: 'Foydalanuvchilar', color: 'teal' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all group">
            <div className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-black text-gray-800">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: '/vocabulary', label: 'Glossariy', icon: BookOpen },
          { to: '/idioms', label: 'Idiomalar', icon: MessageSquare },
          { to: '/phrasal-verbs', label: 'Phrasal Verbs', icon: Sparkles },
          { to: '/leaderboard', label: 'Reyting', icon: Award },
        ].map((item, i) => (
          <Link key={i} to={item.to} className="group bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg hover:border-teal-200 transition-all flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-sm font-semibold text-gray-800 block">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Features with medical icons */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {[
          { icon: Stethoscope, title: 'Mavzular', desc: "15 ta mavzu bo'yicha tuzilgan darslar. Har bir mavzuda 13 ta interaktiv topshiriq.", gradient: 'from-teal-500 to-cyan-600' },
          { icon: Brain, title: 'AI Baholash', desc: "Speaking, Writing, Translation kabi topshiriqlar sun'iy intellekt yordamida baholanadi.", gradient: 'from-cyan-500 to-teal-600' },
          { icon: ShieldCheck, title: 'Sertifikat', desc: "Testdan 60% dan yuqori to'plang va QR kodli sertifikat oling.", gradient: 'from-emerald-500 to-teal-600' },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all group relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-teal-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/>
            <div className={`w-12 h-12 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
              <f.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Task types */}
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5 text-white" />
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
            <div key={i} className={`p-3 md:p-4 rounded-xl text-xs md:text-sm font-medium transition-all hover:scale-105 cursor-default ${
              type.ai
                ? 'bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-700 border-2 border-teal-200 shadow-sm'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}>
              <div className="flex items-center gap-1.5">
                {type.ai && type.icon && <type.icon className="w-3.5 h-3.5" />}
                <span>{type.name}</span>
              </div>
              {type.ai && (
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-1.5 py-0.5 rounded-full">
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
