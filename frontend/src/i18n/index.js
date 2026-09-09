import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Interfeys tarjimalari (EN/UZ). Kalit bo'yicha { en, uz }.
export const strings = {
  // --- Navbar (yuqori menyu) ---
  'nav.home': { en: 'Home', uz: 'Bosh sahifa' },
  'nav.news': { en: 'News', uz: 'Yangiliklar' },
  'nav.about': { en: 'About', uz: 'About' },
  'nav.contact': { en: 'Contact details', uz: 'Contact details' },
  'auth.login': { en: 'Log in', uz: 'Kirish' },
  'auth.register': { en: 'Sign up', uz: "Ro'yxatdan o'tish" },

  // --- Sidebar (chap menyu) ---
  'side.title': { en: 'Course content', uz: 'Kurs tarkibi' },
  'side.topics': { en: 'Topics', uz: 'Mavzular' },
  'side.idioms': { en: 'Useful medical idioms', uz: 'Foydali tibbiy idiomlar' },
  'side.phrasal': { en: 'Medicine related phrasal verbs', uz: "Tibbiyotga oid frazali fe'llar" },
  'side.glossary': { en: 'Glossary', uz: 'Glossariy' },
  'side.test': { en: 'Test', uz: 'Test' },
  'side.users': { en: 'Users', uz: 'Foydalanuvchilar' },

  // --- Footer ---
  'footer.users': { en: 'Users', uz: 'Foydalanuvchilar' },
  'footer.online': { en: 'Online', uz: 'Online' },
  'footer.count': { en: '', uz: 'ta' },
  'footer.desc': {
    en: 'An English learning platform for medical students. Modern and interactive teaching methods.',
    uz: "Tibbiyot talabalari uchun ingliz tili o'rganish platformasi. Zamonaviy va interaktiv ta'lim usullari.",
  },
  'footer.partners': { en: 'Partners', uz: 'Hamkorlar' },
  'brand.tagline': { en: 'platform for medical students', uz: 'platform for medical students' },

  // --- Umumiy (common) ---
  'common.search': { en: 'Search...', uz: 'Qidirish...' },
  'common.count': { en: '', uz: 'ta' },
  'common.notFound': { en: 'Nothing found', uz: 'Hech narsa topilmadi' },
  'common.prev': { en: 'Previous', uz: 'Oldingi' },
  'common.next': { en: 'Next', uz: 'Keyingi' },
  'common.tasks': { en: 'tasks', uz: 'topshiriq' },

  // --- Units (Mavzular) sahifasi ---
  'units.title': { en: 'Topics', uz: 'Mavzular' },
  'units.subtitle': { en: '15 topics, 13 tasks each', uz: '15 ta mavzu, har birida 13 ta topshiriq' },
  'units.lockText': { en: 'To access the topics,', uz: 'Mavzularga kirish uchun' },
  'auth.loginLink': { en: 'log in', uz: 'tizimga kiring' },

  // --- Vocabulary / Idioms / Phrasal (umumiy komponent) ---
  'voc.glossary.title': { en: 'Glossary', uz: 'Glossariy' },
  'voc.glossary.sub': { en: 'Medical English glossary', uz: "Tibbiy ingliz tili lug'ati" },
  'voc.idioms.title': { en: 'Medical Idioms', uz: 'Medical Idioms' },
  'voc.idioms.sub': { en: 'Medical idioms and expressions', uz: 'Tibbiyotga oid idiomalar' },
  'voc.phrasal.title': { en: 'Phrasal Verbs', uz: 'Phrasal Verbs' },
  'voc.phrasal.sub': { en: 'Medicine-related phrasal verbs', uz: 'Tibbiyotga oid phrasal verblar' },

  // --- Common (qo'shimcha) ---
  'common.loading': { en: 'Please wait...', uz: 'Kutilmoqda...' },
  'common.error': { en: 'An error occurred', uz: 'Xatolik yuz berdi' },

  // --- Login / Register ---
  'auth.loginTitle': { en: 'Sign in', uz: 'Tizimga kirish' },
  'auth.loginSub': { en: 'Sign in to your account', uz: 'Hisobingizga kiring' },
  'auth.username': { en: 'Username', uz: 'Login' },
  'auth.password': { en: 'Password', uz: 'Parol' },
  'auth.welcome': { en: 'Welcome!', uz: 'Xush kelibsiz!' },
  'auth.badCreds': { en: 'Wrong username or password', uz: "Login yoki parol noto'g'ri" },
  'auth.noAccount': { en: "Don't have an account?", uz: "Hisobingiz yo'qmi?" },
  'auth.haveAccount': { en: 'Already have an account?', uz: 'Hisobingiz bormi?' },
  'auth.registerLink': { en: 'Sign up', uz: "Ro'yxatdan o'ting" },
  'auth.registerTitle': { en: 'Sign up', uz: "Ro'yxatdan o'tish" },
  'auth.registerSub': { en: 'Create a new account', uz: 'Yangi hisob yarating' },
  'auth.firstName': { en: 'First name', uz: 'Ism' },
  'auth.lastName': { en: 'Last name', uz: 'Familiya' },
  'auth.pwHint': { en: 'At least 6 characters', uz: 'Kamida 6 ta belgi' },
  'auth.pwConfirm': { en: 'Confirm password', uz: 'Parolni tasdiqlang' },
  'auth.pwRetype': { en: 'Re-enter password', uz: 'Parolni qayta yozing' },
  'auth.pwMismatch': { en: 'Passwords do not match', uz: 'Parollar mos kelmadi' },
  'auth.pwShort': { en: 'Password must be at least 6 characters', uz: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" },
  'auth.regSuccess': { en: 'Registered! Now log in.', uz: "Ro'yxatdan o'tdingiz! Endi kiring." },

  // --- Dashboard ---
  'dash.hello': { en: 'Hi', uz: 'Salom' },
  'dash.subtitle': { en: "Let's keep learning today", uz: "Bugun ham o'rganishni davom ettiramiz" },
  'dash.level': { en: 'Level', uz: 'Daraja' },
  'dash.nextA': { en: '', uz: 'Keyingi darajagacha ' },
  'dash.nextB': { en: ' XP to next level', uz: ' XP' },
  'dash.totalPoints': { en: 'Total points', uz: 'Jami ballar' },
  'dash.days': { en: 'days', uz: 'kun' },
  'dash.streakA': { en: 'Current streak (best: ', uz: 'Joriy streak (eng yuqori: ' },
  'dash.streakB': { en: ')', uz: ')' },
  'dash.usersAmong': { en: 'users total', uz: 'foydalanuvchi ichida' },
  'dash.progressByUnit': { en: 'Progress by topic', uz: "Mavzular bo'yicha progress" },
  'dash.viewAll': { en: 'View all', uz: "Barchasini ko'rish" },
  'dash.stats': { en: 'Statistics', uz: 'Statistika' },
  'dash.completedUnits': { en: 'Completed topics', uz: 'Tugatilgan mavzular' },
  'dash.completedTasks': { en: 'Completed tasks', uz: 'Bajarilgan topshiriqlar' },
  'dash.avgScore': { en: 'Average score', uz: "O'rtacha ball" },
  'dash.recentBadges': { en: 'Recent achievements', uz: "So'nggi yutuqlar" },
  'dash.noBadges': { en: 'No achievements yet', uz: "Hali yutuqlar yo'q" },
  'dash.doTasks': { en: 'Complete some tasks!', uz: 'Topshiriqlarni bajaring!' },
  'dash.keepLearning': { en: 'Keep learning', uz: "O'rganishni davom eting" },
  'dash.dontLose': { en: "Don't lose your streak!", uz: "Streak ni yo'qotmang!" },
  'dash.continue': { en: 'Continue', uz: 'Davom etish' },
  'dash.recentActivity': { en: 'Recent activity', uz: "So'nggi faollik" },
  'dash.score': { en: 'Score', uz: 'Ball' },
  'dash.time': { en: 'Time', uz: 'Vaqt' },
  'common.task': { en: 'Task', uz: 'Topshiriq' },

  // --- Leaderboard ---
  'lead.subtitle': { en: 'Top-scoring students', uz: "Eng yuqori ball to'plagan talabalar" },
  'lead.testLabel': { en: 'Test', uz: 'Test' },
  'lead.you': { en: '(You)', uz: '(Siz)' },
  'lead.testScore': { en: 'test score', uz: 'test bali' },
  'lead.noUsers': { en: 'No users yet', uz: "Hali foydalanuvchilar yo'q" },

  // --- Home ---
  'home.card1.title': { en: 'Topics', uz: 'Mavzular' },
  'home.card1.desc': { en: '15 topics, 13 interactive tasks each. Grammar, vocabulary and skills.', uz: "15 ta mavzu, har birida 13 ta interaktiv topshiriq. Grammatika, lug'at va ko'nikmalar." },
  'home.start': { en: 'Start', uz: 'Boshlash' },
  'home.card2.title': { en: 'Take the test', uz: 'Test topshirish' },
  'home.card2.desc': { en: '30 random questions out of 300. Pass 60% to get a certificate!', uz: "300 ta savoldan 30 tasi random. 60% dan o'tsangiz sertifikat olasiz!" },
  'home.startTest': { en: 'Start the test', uz: 'Testni boshlash' },
  'home.stat.topics': { en: 'Topics', uz: 'Mavzular' },
  'home.stat.tasks': { en: 'Tasks', uz: 'Topshiriqlar' },
  'home.stat.questions': { en: 'Test questions', uz: 'Test savollari' },
  'home.stat.users': { en: 'Users', uz: 'Foydalanuvchilar' },
  'home.link.glossary': { en: 'Glossary', uz: 'Glossariy' },
  'home.link.idioms': { en: 'Idioms', uz: 'Idiomalar' },
  'home.link.rating': { en: 'Leaderboard', uz: 'Reyting' },
  'home.feat1.title': { en: 'Topics', uz: 'Mavzular' },
  'home.feat1.desc': { en: 'Lessons organized into 15 topics. Each topic has 13 interactive tasks.', uz: "15 ta mavzu bo'yicha tuzilgan darslar. Har bir mavzuda 13 ta interaktiv topshiriq." },
  'home.feat2.title': { en: 'AI Assessment', uz: 'AI Baholash' },
  'home.feat2.desc': { en: 'Tasks like Speaking, Writing and Translation are graded with AI.', uz: "Speaking, Writing, Translation kabi topshiriqlar sun'iy intellekt yordamida baholanadi." },
  'home.feat3.title': { en: 'Certificate', uz: 'Sertifikat' },
  'home.feat3.desc': { en: 'Score above 60% on the test and get a certificate with a QR code.', uz: "Testdan 60% dan yuqori to'plang va QR kodli sertifikat oling." },
  'home.taskTypes': { en: 'Task types', uz: 'Topshiriq turlari' },

  // --- News ---
  'news.title': { en: 'News & announcements', uz: "Yangiliklar va e'lonlar" },
  'news.subtitle': { en: 'Platform news and important announcements', uz: "Platforma yangiliklari va muhim e'lonlar" },
  'news.important': { en: 'Important', uz: 'Muhim' },
  'news.all': { en: 'All news', uz: 'Barcha yangiliklar' },
  'news.1.title': { en: 'The platform has officially launched!', uz: 'Platforma rasman ishga tushirildi!' },
  'news.1.excerpt': { en: 'The English for Medical Students platform is open to all students.', uz: 'English for Medical Students platformasi barcha talabalar uchun ochiq.' },
  'news.2.title': { en: 'AI assessment system added', uz: "AI baholash tizimi qo'shildi" },
  'news.2.excerpt': { en: 'AI now grades speaking, writing and translation tasks.', uz: 'Endi speaking, writing va translation topshiriqlarni AI baholaydi.' },
  'news.3.title': { en: 'New topics added', uz: "Yangi mavzular qo'shildi" },
  'news.3.excerpt': { en: '5 new topics and 65 new tasks were added.', uz: "5 ta yangi mavzu va 65 ta yangi topshiriq qo'shildi." },
  'news.4.title': { en: 'Mobile version in the works', uz: 'Mobil versiya tayyorlanmoqda' },
  'news.4.excerpt': { en: 'Android and iOS apps are coming soon.', uz: 'Tez orada Android va iOS ilovalari chiqariladi.' },

  // --- Common (yana) ---
  'common.save': { en: 'Save', uz: 'Saqlash' },
  'common.saved': { en: 'Saved!', uz: 'Saqlandi!' },
  'common.points': { en: 'pts', uz: 'ball' },
  'common.pointsLabel': { en: 'Points', uz: 'Ball' },

  // --- UnitDetail ---
  'unit.notFound': { en: 'Topic not found', uz: 'Mavzu topilmadi' },
  'unit.back': { en: 'Back to topics', uz: 'Mavzularga qaytish' },
  'unit.tasksHeading': { en: 'Tasks', uz: 'Topshiriqlar' },
  'unit.redo': { en: 'Redo', uz: 'Qayta bajarish' },
  'unit.loginToDo': { en: 'Log in to complete the tasks', uz: 'Topshiriqlarni bajarish uchun tizimga kiring' },
  'unit.reading': { en: 'Reading', uz: "O'qish materiali" },
  'unit.openNewTab': { en: 'Open in new tab', uz: 'Yangi oynada ochish' },
  'unit.download': { en: 'Download', uz: 'Yuklab olish' },

  // --- VerifyCertificate ---
  'cert.notFound': { en: 'Certificate not found', uz: 'Sertifikat topilmadi' },
  'cert.verifyError': { en: 'Verification error', uz: 'Tekshirish xatosi' },
  'cert.verified': { en: 'Certificate verified!', uz: 'Sertifikat tasdiqlandi!' },
  'cert.name': { en: 'Name', uz: 'Ism' },
  'cert.score': { en: 'Score', uz: 'Ball' },
  'cert.date': { en: 'Date', uz: 'Sana' },
  'cert.id': { en: 'Certificate ID', uz: 'Sertifikat ID' },
  'cert.downloadPdf': { en: 'Download PDF', uz: 'PDF yuklash' },

  // --- Author ---
  'author.title': { en: 'About the author', uz: 'Muallif haqida' },
  'author.sub': { en: 'Platform author and academic supervisor', uz: 'Platforma muallifi va ilmiy rahbar' },
  'author.role': { en: 'Lecturer at Bukhara State Medical Institute', uz: "Buxoro davlat tibbiyot instituti o'qituvchisi" },
  'author.research': { en: 'Academic Activity', uz: 'Ilmiy faoliyat' },
  'author.r1': { en: 'Research on Medical English methodology', uz: "Tibbiy ingliz tili metodikasi bo'yicha tadqiqotlar" },
  'author.r2': { en: '10+ scientific articles and theses', uz: '10+ ilmiy maqola va tezislar' },
  'author.r3': { en: 'Participation in international conferences', uz: 'Xalqaro konferensiyalarda ishtirok' },
  'author.r4': { en: 'Author of the "English for Medical Students" textbook', uz: '"English for Medical Students" o\'quv qo\'llanma muallifi' },
  'author.awards': { en: 'Achievements', uz: 'Yutuqlar' },
  'author.a1': { en: 'IELTS certificate (C1)', uz: 'IELTS sertifikati (C1)' },
  'author.a2': { en: '"Teacher of the Year" award', uz: '"Yilning eng yaxshi o\'qituvchisi" mukofoti' },
  'author.a3': { en: 'Grant for innovative educational technologies', uz: "Innovatsion ta'lim texnologiyalari bo'yicha grant" },
  'author.approval': { en: 'Approval', uz: 'Tasdiqlash' },
  'author.approvalText': { en: 'This platform is approved by the Academic Council of Bukhara State Medical Institute.', uz: 'Ushbu platforma Buxoro davlat tibbiyot instituti Ilmiy kengashi tomonidan tasdiqlangan.' },
  'author.protocol': { en: 'Protocol No. 11, 30.03.2025', uz: 'Bayonnoma № 11, 30.03.2025' },

  // --- Profile ---
  'profile.dayStreak': { en: 'day streak', uz: 'kun streak' },
  'profile.nextA': { en: '', uz: 'Keyingi levelga ' },
  'profile.nextB': { en: ' points to next level', uz: ' ball qoldi' },
  'profile.completed': { en: 'Completed', uz: 'Bajarilgan' },
  'profile.overallProgress': { en: 'Overall progress', uz: 'Umumiy progress' },
  'profile.editInfo': { en: 'Edit information', uz: "Ma'lumotlarni tahrirlash" },
  'profile.saving': { en: 'Saving...', uz: 'Saqlanmoqda...' },

  // --- QuizPage ---
  'quiz.finish': { en: 'Finish', uz: 'Tugatish' },
  'quiz.result': { en: 'Result', uz: 'Natija' },
  'quiz.correct': { en: 'correct', uz: "to'g'ri" },
  'quiz.grade': { en: 'Grade', uz: 'Baho' },
  'quiz.getCert': { en: 'Get certificate', uz: 'Sertifikat olish' },
  'quiz.toHome': { en: 'To home', uz: 'Bosh sahifaga' },
  'quiz.title': { en: 'Exam (Certificate)', uz: 'Imtihon (Sertifikat)' },
  'quiz.introA': { en: '', uz: '300 ta savoldan ' },
  'quiz.introB': { en: ' random questions out of 300 are selected. Pass 60% to get a certificate!', uz: " tasi random tanlanadi. 60% dan o'tsangiz sertifikat olasiz!" },
  'quiz.history': { en: 'Results history', uz: 'Natijalar tarixi' },
  'quiz.errorMsg': { en: 'An error occurred', uz: 'Xato yuz berdi' },

  // --- TaskPage ---
  'task.notFound': { en: 'Task not found', uz: 'Topshiriq topilmadi' },
  'task.noSpeech': { en: 'No speech detected. Please speak.', uz: 'Ovoz eshitilmadi. Iltimos, gapiring.' },
  'task.micDenied': { en: 'Microphone access was denied.', uz: 'Mikrofondan foydalanishga ruxsat berilmadi.' },
  'task.recError': { en: 'Recording error: ', uz: 'Ovoz yozishda xatolik: ' },
  'task.recStopped': { en: 'Recording stopped', uz: "Ovoz yozish to'xtatildi" },
  'task.congrats': { en: 'Congratulations!', uz: 'Tabriklaymiz!' },
  'task.back': { en: 'Back', uz: 'Orqaga' },
  'task.passed': { en: 'Completed successfully!', uz: 'Muvaffaqiyatli bajarildi!' },
  'task.tryAgain': { en: 'Try again', uz: "Qayta urinib ko'ring" },
  'task.retry': { en: 'Retry', uz: 'Qayta' },
  'task.phAnswer': { en: 'Write your answer...', uz: 'Javobingizni yozing...' },
  'task.enText': { en: 'English text:', uz: 'Inglizcha matn:' },
  'task.phTranslate': { en: 'Write the Uzbek translation...', uz: "O'zbekcha tarjimani yozing..." },
  'task.word': { en: 'Word:', uz: "So'z:" },
  'task.phSynonyms': { en: 'Write English synonyms (comma-separated)...', uz: 'Inglizcha sinonimlarni yozing (vergul bilan)...' },
  'task.topic': { en: 'Topic:', uz: 'Mavzu:' },
  'task.speakAbout': { en: 'Talk about: ', uz: 'Gapiring: ' },
  'task.phSpeaking': { en: 'Your speech appears here...', uz: "Gapirayotganingiz shu yerda ko'rinadi..." },
  'task.phManual': { en: 'Or type the text manually...', uz: "Yoki matnni qo'lda yozing..." },
  'task.words': { en: 'words', uz: "so'z" },
  'task.micHint': { en: '💡 Press the microphone button and speak in English. The browser converts it to text automatically.', uz: '💡 Mikrofon tugmasini bosing va ingliz tilida gapiring. Brauzer avtomatik matnga aylantiradi.' },
  'task.taskLabel': { en: 'Task:', uz: 'Topshiriq:' },
  'task.phWrite': { en: 'Write in English...', uz: 'Ingliz tilida yozing...' },
  'task.videoTopic': { en: 'Video topic:', uz: 'Video mavzusi:' },
  'task.phRetell': { en: 'Retell in English...', uz: 'Ingliz tilida qayta hikoya qiling...' },
  'task.phAnswerEn': { en: 'Answer in English...', uz: 'Ingliz tilida javob yozing...' },
  'task.startRec': { en: 'Start recording', uz: 'Ovoz yozishni boshlash' },
  'task.stop': { en: 'Stop', uz: "To'xtatish" },
  'task.recording': { en: 'Recording... Speak in English', uz: 'Yozilmoqda... Ingliz tilida gapiring' },
  'task.checking': { en: 'Checking...', uz: 'Tekshirilmoqda...' },
  'task.submit': { en: 'Submit', uz: 'Yuborish' },

  // --- Slider ---
  'slider.1.title': { en: 'Learn Medical English', uz: "Tibbiyot ingliz tilini o'rganing" },
  'slider.1.sub': { en: 'A professional course with 15 topics and 195 tasks', uz: '15 ta mavzu, 195 ta topshiriq bilan professional kurs' },
  'slider.2.title': { en: 'AI-powered assessment', uz: 'AI bilan baholash' },
  'slider.2.sub': { en: 'Your answers are graded in real time by AI', uz: "Sun'iy intellekt yordamida javoblaringiz real-time baholanadi" },
  'slider.3.title': { en: 'Get a certificate', uz: 'Sertifikat oling' },
  'slider.3.sub': { en: 'Score above 60% on the test and get a certificate with a QR code', uz: "Testdan 60% dan yuqori to'plang va QR kodli sertifikat oling" },
}

// Til holati (localStorage'da saqlanadi).
export const useLang = create(
  persist(
    (set, get) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === 'uz' ? 'en' : 'uz' }),
    }),
    { name: 'me_lang' }
  )
)

// --- Shrift o'lchami (accessibility) ---
function applyFontScale(scale) {
  try { document.documentElement.style.fontSize = (scale || 100) + '%' } catch (e) {}
}
export const useFontScale = create(
  persist(
    (set) => ({
      scale: 100,
      setScale: (scale) => { applyFontScale(scale); set({ scale }) },
    }),
    {
      name: 'me_fontscale',
      onRehydrateStorage: () => (state) => { applyFontScale(state ? state.scale : 100) },
    }
  )
)

// Tarjima hook'i: const t = useT(); t('nav.home')
export function useT() {
  const lang = useLang((s) => s.lang)
  return (key) => {
    const e = strings[key]
    if (!e) return key
    return e[lang] ?? e.en ?? key
  }
}
