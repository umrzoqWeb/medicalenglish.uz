import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useT } from '../i18n'

const slides = [
  { titleKey: 'slider.1.title', subKey: 'slider.1.sub' },
  { titleKey: 'slider.2.title', subKey: 'slider.2.sub' },
  { titleKey: 'slider.3.title', subKey: 'slider.3.sub' },
]

function ECGLine() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-24 opacity-20" viewBox="0 0 1200 100" preserveAspectRatio="none">
      <path d="M0,50 L200,50 L220,50 L240,20 L260,80 L280,10 L300,90 L320,50 L340,50 L600,50 L620,50 L640,20 L660,80 L680,10 L700,90 L720,50 L740,50 L1000,50 L1020,50 L1040,20 L1060,80 L1080,10 L1100,90 L1120,50 L1200,50" fill="none" stroke="white" strokeWidth="2" className="animate-ecg"/>
    </svg>
  )
}

function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-12 right-[15%] animate-float opacity-15">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="white"><rect x="15" y="5" width="10" height="30" rx="2"/><rect x="5" y="15" width="30" height="10" rx="2"/></svg>
      </div>
      <div className="absolute top-20 right-[35%] animate-float-delay opacity-10">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/></svg>
      </div>
      <div className="absolute bottom-24 right-[25%] animate-heartbeat opacity-15">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>
      <div className="absolute top-16 left-[8%] animate-float opacity-10">
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"><path d="M4.8 2.655A2 2 0 016.61 1h.78a2 2 0 011.81 1.655l.74 4.45a2 2 0 01-1.98 2.295H6.04a2 2 0 01-1.98-2.295l.74-4.45z"/><path d="M6 8.4V11a4 4 0 004 4h1a3 3 0 013 3v0a3 3 0 01-3 3h-1a6 6 0 01-6-6V8.4"/><circle cx="18" cy="15" r="2"/><path d="M18 13V9"/></svg>
      </div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-blob"/>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-blob" style={{animationDelay: '4s'}}/>
    </div>
  )
}

function MedicalVisual() {
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-dashed border-teal-400/20 rounded-full animate-spin-slow"/>
        <div className="absolute inset-4 border border-cyan-400/10 rounded-full animate-spin-slow" style={{animationDirection:'reverse',animationDuration:'25s'}}/>
        {/* Center - heartbeat monitor */}
        <div className="absolute inset-8 bg-gradient-to-br from-teal-500/15 to-cyan-500/15 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Pulse circle */}
            <div className="absolute inset-2 rounded-full border-2 border-teal-400/30 animate-heartbeat"/>
            <div className="absolute inset-5 rounded-full border border-cyan-400/20"/>
            {/* Heart icon */}
            <svg width="64" height="64" viewBox="0 0 24 24" className="animate-heartbeat" style={{filter:'drop-shadow(0 0 12px rgba(45,212,191,0.6))'}}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#2dd4bf"/>
            </svg>
          </div>
        </div>
        {/* Orbiting dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50 animate-float" style={{animationDelay:'0s'}}/>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-float" style={{animationDelay:'1s'}}/>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-float" style={{animationDelay:'2s'}}/>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 bg-teal-300 rounded-full shadow-lg shadow-teal-300/50 animate-float" style={{animationDelay:'1.5s'}}/>
        {/* Small medical cross */}
        <div className="absolute top-6 right-4 opacity-30 animate-float" style={{animationDelay:'0.5s'}}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#5eead4"><rect x="6" y="1" width="4" height="14" rx="1"/><rect x="1" y="6" width="14" height="4" rx="1"/></svg>
        </div>
        <div className="absolute bottom-8 left-6 opacity-20 animate-float" style={{animationDelay:'2.5s'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#5eead4"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
      </div>
    </div>
  )
}

export default function Slider() {
  const t = useT()
  const [cur, setCur] = useState(0)
  useEffect(() => { const t = setInterval(() => setCur(p => (p+1) % slides.length), 5000); return () => clearInterval(t) }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 transition-all duration-700">
        <FloatingIcons />
        <ECGLine />
        <div className="container relative py-12 md:py-24 px-6 md:px-16">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1 text-white max-w-2xl">
              <div key={cur} className="animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-teal-200 mb-4">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-teal-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-teal-300"></span></span>
                  Medical English Platform
                </div>
                <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-5 leading-tight">{t(slides[cur].titleKey)}</h2>
                <p className="text-base md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">{t(slides[cur].subKey)}</p>
              </div>
            </div>
            <MedicalVisual />
          </div>
        </div>
      </div>
      <button onClick={() => setCur(p => (p-1+slides.length) % slides.length)} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/10">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => setCur(p => (p+1) % slides.length)} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/10">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} className={`h-2 rounded-full transition-all duration-300 ${i === cur ? 'w-8 bg-teal-400 shadow-lg shadow-teal-400/50' : 'w-2 bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}
