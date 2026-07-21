import { BookOpen, Brain, Globe, Users, Stethoscope, Activity, MessageSquare, ShieldCheck, GraduationCap, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-blob"/>
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{animationDelay:'4s'}}/>
          <svg className="absolute bottom-0 left-0 w-full h-16 opacity-15" viewBox="0 0 800 50" preserveAspectRatio="none">
            <path d="M0,25 L120,25 L140,25 L155,8 L170,42 L185,5 L200,45 L215,25 L400,25 L420,25 L435,8 L450,42 L465,5 L480,45 L495,25 L800,25" fill="none" stroke="white" strokeWidth="1.5" className="animate-ecg"/>
          </svg>
        </div>
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium text-teal-200 mb-4">
            <Stethoscope className="w-3.5 h-3.5"/>
            Medical English Hub
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Welcome to Medical English Hub</h1>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            A comprehensive platform for medical students and healthcare professionals to develop English-language skills for academic study, clinical practice, and professional communication.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
            <GraduationCap className="w-6 h-6 text-white"/>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              The Medical English Hub is a comprehensive platform designed to help medical students and healthcare professionals develop the English-language skills required for academic study, clinical practice, international academic mobility, and professional communication. Whether you are a medical student, teacher, researcher, or healthcare professional, the platform provides essential resources and interactive tools to improve your Medical English proficiency and professional communication competence.
            </p>
          </div>
        </div>
      </div>

      {/* What we offer */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white"/>
          </div>
          <h2 className="text-xl font-bold text-gray-800">What We Offer</h2>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          Our platform offers a wide range of materials on key areas of Medical English, including medical terminology, human anatomy and body systems, symptoms and diseases, diagnostic procedures, treatment methods, healthcare institutions, and doctor-patient communication. It also provides practical guidance on taking a patient's medical history, describing symptoms, explaining diagnoses, giving recommendations, discussing treatment options, and communicating effectively in different clinical situations.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Activity, label: 'Medical Terminology' },
            { icon: Heart, label: 'Anatomy & Body Systems' },
            { icon: Stethoscope, label: 'Diagnostics & Treatment' },
            { icon: MessageSquare, label: 'Doctor-Patient Communication' },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100 text-center group hover:shadow-md transition-all">
              <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 text-white"/>
              </div>
              <span className="text-xs font-semibold text-teal-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Communication & Ethics */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md mb-4">
            <Globe className="w-5 h-5 text-white"/>
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-3">Intercultural Communication</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            The platform emphasizes linguopragmatic, ethical, and intercultural aspects of professional communication. Learners develop the ability to ask sensitive questions, express empathy, clarify information, give advice politely, explain risks, reassure patients, and use appropriate language according to the communicative situation. It also helps students communicate with patients and healthcare professionals from different cultural, social, and linguistic backgrounds.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md mb-4">
            <Users className="w-5 h-5 text-white"/>
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-3">Interactive Activities</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enhance your professional communication competence through a variety of interactive activities, such as reading medical texts, answering comprehension questions, watching relevant educational videos, completing listening exercises, matching medical terms with definitions, analysing clinical cases, participating in role-plays and simulations, and engaging in self-study modules designed for realistic academic and clinical contexts.
          </p>
        </div>
      </div>

      {/* AI Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-teal-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white">
        <div className="absolute top-4 right-4 animate-float opacity-10">
          <Brain className="w-24 h-24"/>
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 rounded-full px-3 py-1 text-xs font-medium text-teal-300 mb-4">
            <Brain className="w-3.5 h-3.5"/> AI-Powered Learning
          </div>
          <h2 className="text-xl font-bold mb-4">Artificial Intelligence Integration</h2>
          <p className="text-white/75 text-sm leading-relaxed mb-5">
            The platform includes AI-supported tasks that enable learners to practise Medical English in a more personalised and interactive way. Artificial intelligence can generate simulated doctor-patient dialogues, provide immediate feedback on vocabulary, grammar, pronunciation, politeness strategies, and the appropriateness of responses, and create clinical scenarios based on learners' proficiency levels. AI also helps students reformulate unclear or culturally inappropriate expressions and suggest more empathetic and professionally suitable responses.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Doctor-patient dialogues', 'Instant feedback', 'Clinical scenarios', 'History taking practice', 'Informed consent', 'Cultural awareness'].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2.5 text-xs font-medium text-teal-200 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0"/>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 md:p-8 border border-teal-100 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Get Started Today</h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto mb-5">
          Designed for medical learners and professionals at different levels, the Medical English Hub is a valuable tool for improving Medical English proficiency, developing linguopragmatic and intercultural competence, and preparing users for effective communication in international academic and clinical environments. Join us today to strengthen your professional English skills and become a more confident communicator in the global healthcare community.
        </p>
        <a href="/units" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-all">
          <BookOpen className="w-5 h-5"/>
          Explore Topics
        </a>
      </div>
    </div>
  )
}
