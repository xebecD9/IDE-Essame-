import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Accueil from './pages/Accueil'
import QuizEngine from './pages/QuizEngine'
import Resultats from './pages/Resultats'
import Leaderboard from './pages/Leaderboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/quiz" element={<ProtectedRoute><QuizEngine /></ProtectedRoute>} />
        <Route path="/resultats" element={<ProtectedRoute><Resultats /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App