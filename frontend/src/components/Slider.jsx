import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Brain, Trophy } from 'lucide-react'

const slides = [
  { title: "Tibbiyot ingliz tilini o'rganing", subtitle: "15 ta mavzu, 195 ta topshiriq bilan to'liq kurs", bg: 'from-violet-600 via-purple-600 to-indigo-700', icon: Sparkles, accent: 'from-pink-500 to-rose-500' },
  { title: 'AI bilan baholash', subtitle: "Sun'iy intellekt yordamida javoblaringiz baholanadi", bg: 'from-cyan-500 via-blue-600 to-indigo-700', icon: Brain, accent: 'from-cyan-400 to-blue-500' },
  { title: "Reytingda o'z o'rningizni toping", subtitle: "Ball yig'ing va liderlar qatoridan joy oling", bg: 'from-amber-500 via-orange-600 to-red-600', icon: Trophy, accent: 'from-yellow-400 to-amber-500' },
]

export default function Slider() {
  const [cur, setCur] = useState(0)
  useEffect(() => { const t = setInterval(() => setCur(p => (p+1) % slides.length), 5000); return () => clearInterval(t) }, [])
  const Icon = slides[cur].icon

  return (
    <div className="relative w-full overflow-hidden">
      <div className={`bg-gradient-to-r ${slides[cur].bg} transition-all duration-700`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"/>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"/>
        </div>
        <div className="container relative py-10 md:py-20 px-6 md:px-16">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            <div className="flex-1 text-white">
              <h2 className="text-xl md:text-5xl font-black mb-2 md:mb-4 leading-tight drop-shadow-lg">
                {slides[cur].title}
              </h2>
              <p className="text-sm md:text-xl text-white/90 mb-4 md:mb-8">
                {slides[cur].subtitle}
              </p>
              <Link to="/units"
                className={`inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r ${slides[cur].accent} text-white font-bold px-5 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-2xl hover:scale-105 transition-all group text-sm md:text-lg`}>
                <span>Boshlash</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <Icon className="w-24 h-24 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setCur(p => (p-1+slides.length) % slides.length)}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20">
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button onClick={() => setCur(p => (p+1) % slides.length)}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/20">
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === cur ? 'w-8 bg-white shadow-lg' : 'w-2.5 bg-white/40'}`} />
        ))}
      </div>
    </div>
  )
}
