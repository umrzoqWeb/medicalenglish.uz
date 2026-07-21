import { Mail, Phone, MapPin, GraduationCap, Globe, Award } from 'lucide-react'

const bgUrl = '/static/bstu_bg.jpg'
const photoUrl = '/static/sitora.jpg'

const experiences = [
  { icon: GraduationCap, text: 'Professional Development Programme, NILE Institute, Norwich, England' },
  { icon: Globe, text: 'Faculty Enrichment Program (FEP) Alumni - Missouri State University, USA' },
  { icon: Award, text: 'University Representative at an International Conference - Hacı Bayram Veli University, Ankara, Turkey' },
  { icon: Globe, text: 'University Representative at an International Conference - Canadian University Dubai, UAE' },
]

export default function Contact() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero with background */}
      <div className="relative overflow-hidden rounded-2xl h-64 md:h-80">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${bgUrl})`}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"/>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-4xl font-black">Contact Details</h1>
          <p className="text-white/70 mt-2">Bukhara State Technical University</p>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="md:flex">
          {/* Photo */}
          <div className="md:w-72 shrink-0">
            <img src={photoUrl} alt="Sitora Mukhamedjanova" className="w-full h-72 md:h-full object-cover"/>
          </div>
          {/* Info */}
          <div className="p-6 md:p-8 flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Sitora Mukhamedjanova</h2>
            <p className="text-teal-600 font-semibold text-sm mb-4">PhD, Associate Professor</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0 mt-0.5"/>
                <span className="text-gray-600 text-sm">Bukhara State Technical University, 15 Murtazaev Street, Bukhara, 200100, Uzbekistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0"/>
                <a href="tel:+998914090021" className="text-gray-600 text-sm hover:text-teal-600 transition-colors">+998 91 409 00 21</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-500 shrink-0"/>
                <a href="mailto:sitoramukhamedjanova@gmail.com" className="text-gray-600 text-sm hover:text-teal-600 transition-colors">sitoramukhamedjanova@gmail.com</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-500"/>
                International Professional Development & Academic Experience
              </h3>
              <div className="space-y-2.5">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex items-start gap-3 bg-teal-50/50 rounded-xl p-3 border border-teal-100/50">
                    <exp.icon className="w-4 h-4 text-teal-600 shrink-0 mt-0.5"/>
                    <span className="text-gray-700 text-sm leading-relaxed">{exp.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
