import { Users, Building } from 'lucide-react'
import { useT } from '../i18n'

export default function Footer() {
  const t = useT()
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white mt-10">
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 py-5 mb-6">
        <div className="container flex flex-wrap items-center justify-center gap-8 text-sm px-5">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full">
            <Users className="w-5 h-5 text-cyan-200" />
            <span>{t('footer.users')}: <strong className="text-cyan-200">1,247</strong> {t('footer.count')}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>{t('footer.online')}: <strong className="text-green-400">89</strong> {t('footer.count')}</span>
          </div>
        </div>
      </div>

      <div className="container pt-10 pb-12 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg border border-teal-400/30">
                <span className="text-white font-black text-sm">ME</span>
              </div>
              <span className="font-bold text-lg">Medical English Hub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5 flex items-center gap-3 text-base">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 text-white" />
              </div>
              {t('footer.partners')}
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-gray-400">
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Bukhara State Medical Institute</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Samarkand State Medical University</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Tashkent Medical Academy</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer">Andijan State Medical Institute</li>
              <li className="hover:text-teal-300 transition-colors cursor-pointer col-span-2 md:col-span-1">Fergana Medical Institute of Public Health</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container text-center text-sm text-gray-500 px-5">
          <p>&copy; 2024-{new Date().getFullYear()} Medical English Hub &nbsp; <a href="https://medicalenglishhub.uz" className="text-teal-400 hover:text-teal-300 transition-colors">medicalenglishhub.uz</a></p>
        </div>
      </div>
    </footer>
  )
}
