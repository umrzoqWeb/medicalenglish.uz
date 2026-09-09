import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Units from './pages/Units'
import UnitDetail from './pages/UnitDetail'
import TaskPage from './pages/TaskPage'
import Vocabulary from './pages/Vocabulary'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Author from './pages/Author'
import Contact from './pages/Contact'
import News from './pages/News'
import QuizPage from './pages/QuizPage'
import VerifyCertificate from './pages/VerifyCertificate'
import AdminLayout from './admin/components/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminUnits from './admin/pages/AdminUnits'
import AdminTasks from './admin/pages/AdminTasks'
import AdminQuestions from './admin/pages/AdminQuestions'
import AdminVocabulary from './admin/pages/AdminVocabulary'
import AdminIdioms from './admin/pages/AdminIdioms'
import AdminPhrasalVerbs from './admin/pages/AdminPhrasalVerbs'
import AdminUsers from './admin/pages/AdminUsers'
import AdminBadges from './admin/pages/AdminBadges'
import AdminQuizResults from './admin/pages/AdminQuizResults'
import AdminProgress from './admin/pages/AdminProgress'
import AdminStructure from "./admin/pages/AdminStructure"
import AdminStudents from "./admin/pages/AdminStudents"

function ProtectedRoute({ children }) {
  const { isAuthenticated, user, _hydrated } = useAuthStore()
  if (!_hydrated) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div></div>
  if (!isAuthenticated) return <Navigate to="/login" />
  if (user?.is_staff) return <Navigate to="/admin-panel" />
  return children
}

function AdminRoute({ children }) {
  const { isAuthenticated, user, _hydrated } = useAuthStore()
  if (!_hydrated) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div></div>
  if (!isAuthenticated) return <Navigate to="/login" />
  if (!user?.is_staff) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="units" element={<Units />} />
        <Route path="units/:id" element={<ProtectedRoute><UnitDetail /></ProtectedRoute>} />
        <Route path="units/:unitId/tasks/:taskId" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
        <Route path="vocabulary" element={<Vocabulary />} />
        <Route path="idioms" element={<Vocabulary />} />
        <Route path="phrasal-verbs" element={<Vocabulary />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="about" element={<About />} />
        <Route path="author" element={<Author />} />
        <Route path="contact" element={<Contact />} />
        <Route path="news" element={<News />} />
        <Route path="task/:id" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
        <Route path="test" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="verify/:certId" element={<VerifyCertificate />} />
      </Route>
      <Route path="/admin-panel" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="units" element={<AdminUnits />} />
        <Route path="tasks" element={<AdminTasks />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="vocabulary" element={<AdminVocabulary />} />
        <Route path="idioms" element={<AdminIdioms />} />
        <Route path="phrasal-verbs" element={<AdminPhrasalVerbs />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="badges" element={<AdminBadges />} />
        <Route path="quiz-results" element={<AdminQuizResults />} />
        <Route path="progress" element={<AdminProgress />} />
        <Route path="structure" element={<AdminStructure />} />
        <Route path="structure/:uniId" element={<AdminStudents />} />
      </Route>
    </Routes>
  )
}
